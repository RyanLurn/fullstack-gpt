import { revalidatePath } from "next/cache";
import { APIError } from "better-auth/api";
import * as z from "zod";
import { auth } from "@/features/auth";
import { profileUpdateSchema } from "@/features/auth/validators/manage-account";

async function updateProfile(_initialState: unknown, formData: FormData) {
  const rawFields = Object.fromEntries(formData.entries());
  const result = profileUpdateSchema.safeParse(rawFields);

  if (!result.success) {
    const errorTree = z.treeifyError(result.error);
    return errorTree;
  }

  try {
    await auth.api.updateUser({
      body: {
        ...result.data
      }
    });

    revalidatePath("/admin");
  } catch (error) {
    if (error instanceof APIError) {
      return { errors: [error.message], properties: {} };
    } else {
      console.error("Unexpected error during update profile:", error);
      return { errors: ["Something went wrong"], properties: {} };
    }
  }
}

export { updateProfile };

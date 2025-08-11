"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import * as z from "zod";
import { auth } from "@/features/auth";
import { profileUpdateSchema } from "@/features/auth/validators/manage-account";

async function updateProfile(_initialState: unknown, formData: FormData) {
  console.log("Form data:");
  console.dir(formData, { depth: null, colors: true });
  const rawFields = Object.fromEntries(formData.entries());
  console.log("Raw fields:");
  console.dir(rawFields, { depth: null, colors: true });
  const result = profileUpdateSchema.safeParse(rawFields);
  console.log("Result:");
  console.dir(result, { depth: null, colors: true });

  if (!result.success) {
    const errorTree = z.treeifyError(result.error);
    console.log("Error tree:");
    console.dir(errorTree, { depth: null, colors: true });
    return errorTree;
  }

  try {
    console.log("Updating user:");
    console.dir(result.data, { depth: null, colors: true });
    await auth.api.updateUser({
      body: {
        ...result.data
      },
      headers: await headers()
    });
    console.log("User updated successfully");

    revalidatePath("/admin");
    console.log("Path revalidated");
  } catch (error) {
    if (error instanceof APIError) {
      console.log("Better Auth API error:");
      console.dir(error, { depth: null, colors: true });
      return { errors: [error.message], properties: {} };
    } else {
      console.error("Unexpected error during update profile:", error);
      return { errors: ["Something went wrong"], properties: {} };
    }
  }
}

export { updateProfile };

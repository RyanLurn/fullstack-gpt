"use server";

import { headers } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { APIError } from "better-auth/api";
import * as z from "zod";
import { auth } from "@/features/auth";
import { profileUpdateSchema } from "@/features/auth/validators/manage-account";
import { appLogger } from "@/lib/logger";

async function updateProfile(_initialState: unknown, formData: FormData) {
  const redirectUrl = formData.get("redirectUrl") as string;
  const rawFields = Object.fromEntries(formData.entries());
  const result = profileUpdateSchema.safeParse(rawFields);

  if (!result.success) {
    const errorTree = z.treeifyError(result.error);
    appLogger.info(
      { errorTree, rawFields },
      "Update profile validation failed."
    );
    return errorTree;
  }

  try {
    await auth.api.updateUser({
      body: {
        ...result.data
      },
      headers: await headers()
    });
  } catch (error) {
    if (error instanceof APIError) {
      return { errors: [error.message], properties: {} };
    } else {
      appLogger.error({ error }, "Unexpected error during update profile.");
      return { errors: ["Something went wrong"], properties: {} };
    }
  }

  redirect(
    redirectUrl || "/admin?userProfile=open&tab=profile",
    RedirectType.replace
  );
}

export { updateProfile };

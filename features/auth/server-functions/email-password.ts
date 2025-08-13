"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";
import * as z from "zod";
import { auth } from "@/features/auth";
import {
  emailPasswordSignInSchema,
  emailPasswordSignUpSchema
} from "@/features/auth/validators/email-password";
import { appLogger } from "@/lib/logger";

async function signUpEmailPassword(_initialState: unknown, formData: FormData) {
  const rawFields = Object.fromEntries(formData.entries());
  const result = emailPasswordSignUpSchema.safeParse(rawFields);

  if (!result.success) {
    const errorTree = z.treeifyError(result.error);
    appLogger.info({ errorTree, rawFields }, "Sign-up validation failed.");
    return errorTree;
  }

  try {
    await auth.api.signUpEmail({
      body: {
        ...result.data
      }
    });
  } catch (error) {
    if (error instanceof APIError) {
      return { errors: [error.message], properties: {} };
    } else {
      appLogger.error(
        { email: result.data.email, error },
        "Unexpected error during sign-up."
      );
      return { errors: ["Something went wrong"], properties: {} };
    }
  }

  redirect("/admin");
}

async function signInEmailPassword(_initialState: unknown, formData: FormData) {
  const rawFields = Object.fromEntries(formData.entries());
  const result = emailPasswordSignInSchema.safeParse(rawFields);

  if (!result.success) {
    const errorTree = z.treeifyError(result.error);
    appLogger.info({ errorTree, rawFields }, "Sign-in validation failed.");
    return errorTree;
  }

  try {
    await auth.api.signInEmail({
      body: {
        ...result.data
      },
      headers: await headers()
    });
  } catch (error) {
    if (error instanceof APIError) {
      return { errors: [error.message], properties: {} };
    } else {
      appLogger.error(
        { email: result.data.email, error },
        "Unexpected error during sign-in."
      );
      return { errors: ["Something went wrong"], properties: {} };
    }
  }

  redirect("/admin");
}

export { signUpEmailPassword, signInEmailPassword };

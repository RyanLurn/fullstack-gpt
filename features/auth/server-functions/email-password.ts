"use server";

import { redirect } from "next/navigation";
import * as z from "zod";
import { auth } from "@/features/auth";
import { emailPasswordSignUpSchema } from "@/features/auth/validators/email-password";

async function signUpEmailPassword(formData: FormData) {
  const result = emailPasswordSignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!result.success) {
    const errorTree = z.treeifyError(result.error);
    console.log(errorTree);
    return errorTree;
  }

  await auth.api.signUpEmail({
    body: {
      ...result.data
    }
  });

  redirect("/admin");
}

export { signUpEmailPassword };

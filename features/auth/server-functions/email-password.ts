"use server";

import { redirect } from "next/navigation";
import * as z from "zod";
import { auth } from "@/features/auth";
import { emailPasswordSignUpSchema } from "@/features/auth/validators/email-password";

async function signUpEmailPassword(_initialState: unknown, formData: FormData) {
  const rawFields = Object.fromEntries(formData.entries());
  const result = emailPasswordSignUpSchema.safeParse(rawFields);

  if (!result.success) {
    const errorTree = z.treeifyError(result.error);
    console.log("Error tree:", JSON.stringify(errorTree));
    return errorTree;
  }

  const data = await auth.api.signUpEmail({
    body: {
      ...result.data
    }
  });
  console.log("User signed up with data:", JSON.stringify(data));

  redirect("/admin");
}

export { signUpEmailPassword };

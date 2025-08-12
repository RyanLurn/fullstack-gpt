"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { FormAlert } from "@/features/auth/components/form/alert";
import { EmailField } from "@/features/auth/components/form/fields/email";
import { NameField } from "@/features/auth/components/form/fields/name";
import { PasswordField } from "@/features/auth/components/form/fields/password";
import { signUpEmailPassword } from "@/features/auth/server-functions/email-password";

function SignUpForm() {
  const [state, formAction, isPending] = useActionState(
    signUpEmailPassword,
    undefined
  );

  return (
    <form action={formAction} className="w-full max-w-sm" noValidate>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Welcome, let's create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            {state?.errors && (
              <FormAlert
                title="Sign up failed"
                description={state.errors.join(". ")}
              />
            )}
            <NameField
              errors={state?.properties?.name?.errors}
              isDisabled={isPending}
            />
            <EmailField
              errors={state?.properties?.email?.errors}
              isDisabled={isPending}
            />
            <PasswordField
              errors={state?.properties?.password?.errors}
              isDisabled={isPending}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-y-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing up..." : "Sign up"}
          </Button>
          <div className="flex w-full items-center justify-center gap-x-2">
            <span>Already have an account?</span>
            <Link href="/sign-in" className="underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}

export { SignUpForm };

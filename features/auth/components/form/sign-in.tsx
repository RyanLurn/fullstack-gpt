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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormAlert } from "@/features/auth/components/form/alert";
import { EmailField } from "@/features/auth/components/form/fields/email";
import { PasswordField } from "@/features/auth/components/form/fields/password";
import { signInEmailPassword } from "@/features/auth/server-functions/email-password";

function SignInForm() {
  const [state, formAction, isPending] = useActionState(
    signInEmailPassword,
    undefined
  );

  return (
    <form action={formAction} className="w-full max-w-sm" noValidate>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Welcome back</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            {state?.errors && (
              <FormAlert
                title="Sign in failed"
                description={state.errors.join(". ")}
              />
            )}
            <EmailField errors={state?.properties?.email?.errors} />
            <PasswordField errors={state?.properties?.password?.errors} />
            <div className="flex items-center gap-3">
              <Checkbox name="rememberMe" id="rememberMe" defaultChecked />
              <Label htmlFor="rememberMe">Remember me</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-y-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing you in..." : "Sign in"}
          </Button>
          <div className="flex w-full items-center justify-center gap-x-2">
            <span>Don't have an account?</span>
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}

export { SignInForm };

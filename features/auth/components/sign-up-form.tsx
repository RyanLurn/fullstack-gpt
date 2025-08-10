"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormAlert } from "@/features/auth/components/form-alert";
import { EmailField } from "@/features/auth/components/form-fields/email";
import { PasswordField } from "@/features/auth/components/form-fields/password";
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
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                id="name"
                type="text"
                placeholder="Your name"
                required
              />
              {state?.properties?.name?.errors && (
                <FormAlert
                  title="Invalid name"
                  description={state.properties.name.errors.join(". ")}
                />
              )}
            </div>
            <EmailField errors={state?.properties?.email?.errors} />
            <PasswordField errors={state?.properties?.password?.errors} />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-y-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing up..." : "Sign up"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export { SignUpForm };

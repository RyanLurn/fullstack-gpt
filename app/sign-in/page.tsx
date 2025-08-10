import { SignInForm } from "@/features/auth/components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <SignInForm />
    </div>
  );
}

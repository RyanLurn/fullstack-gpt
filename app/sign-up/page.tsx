import { SignUpForm } from "@/features/auth/components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <SignUpForm />
    </div>
  );
}

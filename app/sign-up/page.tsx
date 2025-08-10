import { SignUpForm } from "@/features/auth/components/form/sign-up";

export default function SignUpPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <SignUpForm />
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormAlert } from "@/features/auth/components/form/alert";

function PasswordField({
  errors,
  isDisabled
}: {
  errors: string[] | undefined;
  isDisabled: boolean;
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <Label htmlFor="password">Password</Label>
      <Input
        name="password"
        id="password"
        type="password"
        required
        disabled={isDisabled}
      />
      {errors && (
        <FormAlert title="Invalid password" description={errors.join(". ")} />
      )}
    </div>
  );
}

export { PasswordField };

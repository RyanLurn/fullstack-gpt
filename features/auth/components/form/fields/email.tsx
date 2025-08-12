import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormAlert } from "@/features/auth/components/form/alert";

function EmailField({
  errors,
  isDisabled
}: {
  errors: string[] | undefined;
  isDisabled: boolean;
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        name="email"
        id="email"
        type="email"
        placeholder="example@gmail.com"
        required
        disabled={isDisabled}
      />
      {errors && (
        <FormAlert title="Invalid email" description={errors.join(". ")} />
      )}
    </div>
  );
}

export { EmailField };

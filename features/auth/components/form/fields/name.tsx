import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormAlert } from "@/features/auth/components/form/alert";

function NameField({ errors }: { errors: string[] | undefined }) {
  return (
    <div className="flex flex-col gap-y-2">
      <Label htmlFor="name">Name</Label>
      <Input
        name="name"
        id="name"
        type="text"
        placeholder="Your name"
        required
      />
      {errors && (
        <FormAlert title="Invalid name" description={errors.join(". ")} />
      )}
    </div>
  );
}

export { NameField };

import { useActionState } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { FormAlert } from "@/features/auth/components/form/alert";
import { NameField } from "@/features/auth/components/form/fields/name";
import { updateProfile } from "@/features/auth/server-functions/manage-account";

function UpdateProfileForm({ handleCancel }: { handleCancel: () => void }) {
  const [state, formAction, isPending] = useActionState(
    updateProfile,
    undefined
  );

  return (
    <form action={formAction} className="w-full" noValidate>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Update profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            {state?.errors && (
              <FormAlert
                title="Update profile failed"
                description={state.errors.join(". ")}
              />
            )}
            <NameField errors={state?.properties?.name?.errors} />
          </div>
        </CardContent>
        <CardFooter className="flex gap-x-2">
          <Button
            variant="secondary"
            disabled={isPending}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2Icon className="animate-spin" /> : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export { UpdateProfileForm };

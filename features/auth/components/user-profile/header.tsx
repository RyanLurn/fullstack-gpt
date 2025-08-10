import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

function UserProfileHeader() {
  return (
    <>
      <DialogTitle className="sr-only">Account</DialogTitle>
      <DialogDescription className="sr-only">
        Manage your account information.
      </DialogDescription>
    </>
  );
}

export { UserProfileHeader };

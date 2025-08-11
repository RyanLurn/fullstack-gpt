import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UpdateProfileForm } from "@/features/auth/components/form/update-profile";
import { UserAvatar } from "@/features/auth/components/user-avatar";
import type { UserType } from "@/features/auth/lib/types";

function ProfileDetails({ name, image }: Pick<UserType, "name" | "image">) {
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);

  function cancelUpdateProfile() {
    setIsUpdateProfileOpen(false);
  }

  return (
    <div className="flex w-full items-center gap-x-4">
      <h2 className="w-1/3 font-semibold">Profile</h2>
      <div className="flex w-2/3 items-center justify-between">
        {isUpdateProfileOpen ? (
          <UpdateProfileForm handleCancel={cancelUpdateProfile} />
        ) : (
          <>
            <div className="flex items-center gap-x-2">
              <UserAvatar name={name} image={image} />
              <p className="font-semibold">{name}</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => setIsUpdateProfileOpen(true)}
            >
              Update profile
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export { ProfileDetails };

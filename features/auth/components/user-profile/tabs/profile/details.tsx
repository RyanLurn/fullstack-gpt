import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UpdateProfileForm } from "@/features/auth/components/form/update-profile";
import { UserAvatar } from "@/features/auth/components/user-avatar";
import type { UserType } from "@/features/auth/lib/types";
import { useUrlState } from "@/hooks/use-url-state";

function ProfileDetails({ name, image }: Pick<UserType, "name" | "image">) {
  const { searchParams, constructUrlState } = useUrlState();

  const isUpdateProfileOpen = searchParams.get("updateProfile") === "open";

  return (
    <div className="flex h-12 w-full items-center gap-x-4">
      <h2 className="w-1/3 font-semibold">Profile</h2>
      <div className="flex w-2/3 items-center justify-between">
        {isUpdateProfileOpen ? (
          <UpdateProfileForm
            parentUrl={constructUrlState({
              searchParamsToSet: {
                updateProfile: undefined
              },
              swap: false
            })}
          />
        ) : (
          <>
            <div className="flex items-center gap-x-2">
              <UserAvatar name={name} image={image} />
              <p className="font-semibold">{name}</p>
            </div>
            <Button variant="ghost" asChild>
              <Link
                href={constructUrlState({
                  searchParamsToSet: {
                    updateProfile: "open"
                  },
                  swap: false
                })}
                replace
              >
                Update profile
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export { ProfileDetails };

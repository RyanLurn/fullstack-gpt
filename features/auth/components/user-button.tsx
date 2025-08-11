"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/features/auth/components/user-avatar";
import { UserProfile } from "@/features/auth/components/user-profile";
import { authClient } from "@/features/auth/lib/client";
import type { UserType } from "@/features/auth/lib/types";
import { useUrlState } from "@/hooks/use-url-state";

function UserButton({
  isUserProfileOpen,
  name,
  image
}: {
  isUserProfileOpen: boolean;
} & Pick<UserType, "name" | "image">) {
  const [userProfileOpen, setUserProfileOpen] = useState(isUserProfileOpen);
  const { router, constructUrlState, setUrlState } = useUrlState();

  function handleUserProfileOpenChange(open: boolean) {
    setUserProfileOpen(open);
    if (!open) {
      setUrlState({
        searchParamsToSet: {
          userProfile: undefined,
          tab: undefined
        },
        swap: false
      });
    }
  }

  async function signOut() {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
          }
        }
      });
    } catch (error) {
      console.error("Failed to sign out:", error);
      toast.error("Failed to sign out");
    }
  }

  return (
    <Dialog open={userProfileOpen} onOpenChange={handleUserProfileOpenChange}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar name={name} image={image} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          onCloseAutoFocus={e => e.preventDefault()}
        >
          <DropdownMenuItem onClick={() => void signOut()}>
            Sign out
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem asChild>
              <Link
                href={constructUrlState({
                  searchParamsToSet: {
                    userProfile: "open",
                    tab: "profile"
                  },
                  swap: false
                })}
                replace
              >
                Manage account
              </Link>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <UserProfile name={name} image={image} />
    </Dialog>
  );
}

export { UserButton };

"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
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

function UserButton({
  isUserProfileOpen,
  name,
  image
}: {
  isUserProfileOpen: boolean;
} & Pick<UserType, "name" | "image">) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

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
    <Dialog defaultOpen={isUserProfileOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar name={name} image={image} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => void signOut()}>
            Sign out
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem asChild>
              <Link
                href={
                  pathname +
                  "?" +
                  createQueryString("userProfile", "open") +
                  "&" +
                  createQueryString("tab", "profile")
                }
                replace
              >
                Manage account
              </Link>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <UserProfile />
    </Dialog>
  );
}

export { UserButton };

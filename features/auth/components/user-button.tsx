"use client";

import { useRouter } from "next/navigation";
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

function UserButton({ name, image }: Pick<UserType, "name" | "image">) {
  const router = useRouter();

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
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar name={name} image={image} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => void signOut()}>
            Sign out
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem>Manage account</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <UserProfile />
    </Dialog>
  );
}

export { UserButton };

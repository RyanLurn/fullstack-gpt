"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/features/auth/components/user-avatar";
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar name={name} image={image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => void signOut()}>
          Sign out
        </DropdownMenuItem>
        <DropdownMenuItem disabled>Settings</DropdownMenuItem>{" "}
        {/* Placeholder */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserButton };

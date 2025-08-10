"use client";

import { useRouter } from "next/navigation";
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
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        }
      }
    });
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

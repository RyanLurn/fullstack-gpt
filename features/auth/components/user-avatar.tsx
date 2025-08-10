import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserType } from "@/features/auth/lib/types";

function UserAvatar({ name, image }: Pick<UserType, "name" | "image">) {
  return (
    <Avatar>
      <AvatarImage src={image ?? undefined} />
      <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}

export { UserAvatar };

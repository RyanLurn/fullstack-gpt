import { Separator } from "@/components/ui/separator";
import { ProfileDetails } from "@/features/auth/components/user-profile/tabs/profile/details";
import type { UserType } from "@/features/auth/lib/types";

function ProfileTab({ name, image }: Pick<UserType, "name" | "image">) {
  return (
    <>
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Profile details
      </h1>
      <Separator className="my-4" />
      <ProfileDetails name={name} image={image} />
    </>
  );
}

export { ProfileTab };

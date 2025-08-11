import { Separator } from "@/components/ui/separator";
import { ProfileDetails } from "@/features/auth/components/user-profile/tabs/profile/details";
import { ProfileEmail } from "@/features/auth/components/user-profile/tabs/profile/email";
import type { UserType } from "@/features/auth/lib/types";

function ProfileTab({
  name,
  image,
  email,
  emailVerified
}: Pick<UserType, "name" | "image" | "email" | "emailVerified">) {
  return (
    <>
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Profile details
      </h1>
      <Separator className="my-4" />
      <ProfileDetails name={name} image={image} />
      <Separator className="my-4" />
      <ProfileEmail email={email} emailVerified={emailVerified} />
      <Separator className="my-4" />
    </>
  );
}

export { ProfileTab };

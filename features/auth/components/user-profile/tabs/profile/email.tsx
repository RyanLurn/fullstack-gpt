// Display info only
// Interaction with email will be handled in the future
import { BadgeAlert, BadgeCheck, Ellipsis } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { UserType } from "@/features/auth/lib/types";
import { cn } from "@/lib/utils";

function ProfileEmail({
  email,
  emailVerified
}: Pick<UserType, "email" | "emailVerified">) {
  return (
    <div className="flex h-12 w-full items-center gap-x-4">
      <h2 className="w-1/3 font-semibold">Email address</h2>
      <div className="flex w-2/3 items-center justify-between">
        <div className="flex items-center gap-x-2">
          <p className="font-semibold">{email}</p>
          <Badge
            variant={emailVerified ? "secondary" : "destructive"}
            className={cn(
              emailVerified && "bg-blue-500 text-white dark:bg-blue-600"
            )}
          >
            {emailVerified ? (
              <>
                <BadgeCheck /> Verified
              </>
            ) : (
              <>
                <BadgeAlert /> Not verified
              </>
            )}
          </Badge>
        </div>
        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </div>
    </div>
  );
}

export { ProfileEmail };

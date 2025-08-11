// Display info only
// Interaction with email will be handled in the future
import { BadgeAlert, BadgeCheck, Ellipsis } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TabItemShell } from "@/features/auth/components/user-profile/tabs/item-shell";
import type { UserType } from "@/features/auth/lib/types";
import { cn } from "@/lib/utils";

function ProfileEmail({
  email,
  emailVerified
}: Pick<UserType, "email" | "emailVerified">) {
  return (
    <TabItemShell itemName="Email address">
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
    </TabItemShell>
  );
}

export { ProfileEmail };

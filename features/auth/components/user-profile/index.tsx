import { useSearchParams } from "next/navigation";
import { DialogContent } from "@/components/ui/dialog";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProfileHeader } from "@/features/auth/components/user-profile/header";
import { UserProfileSidebar } from "@/features/auth/components/user-profile/sidebar";
import { PreferencesTab } from "@/features/auth/components/user-profile/tabs/preferences";
import { ProfileTab } from "@/features/auth/components/user-profile/tabs/profile";
import type { UserType } from "@/features/auth/lib/types";

function UserProfile({
  name,
  image,
  email,
  emailVerified
}: Pick<UserType, "name" | "image" | "email" | "emailVerified">) {
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "profile";

  return (
    <DialogContent
      className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]"
      onOpenAutoFocus={e => e.preventDefault()}
    >
      <UserProfileHeader />
      <SidebarProvider className="items-start">
        <UserProfileSidebar />
        <main className="flex h-[480px] flex-1 flex-col overflow-hidden p-4">
          {activeTab === "profile" && (
            <ProfileTab
              name={name}
              image={image}
              email={email}
              emailVerified={emailVerified}
            />
          )}
          {activeTab === "preferences" && <PreferencesTab />}
        </main>
      </SidebarProvider>
    </DialogContent>
  );
}

export { UserProfile };

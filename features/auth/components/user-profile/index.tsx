import { useSearchParams } from "next/navigation";
import { DialogContent } from "@/components/ui/dialog";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProfileHeader } from "@/features/auth/components/user-profile/header";
import { UserProfileSidebar } from "@/features/auth/components/user-profile/sidebar";
import { ProfileTab } from "@/features/auth/components/user-profile/tabs/profile";
import type { UserType } from "@/features/auth/lib/types";
import { capitalizeFirstLetter } from "@/lib/utils";

function UserProfile({ name, image }: Pick<UserType, "name" | "image">) {
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
          {activeTab === "profile" ? (
            <ProfileTab name={name} image={image} />
          ) : (
            <>
              <h1 className="m-4 scroll-m-20 text-xl font-semibold tracking-tight">
                {capitalizeFirstLetter(activeTab)}
              </h1>
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video max-w-3xl rounded-xl bg-muted/50"
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </SidebarProvider>
    </DialogContent>
  );
}

export { UserProfile };

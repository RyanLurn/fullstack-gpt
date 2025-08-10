import { DialogContent } from "@/components/ui/dialog";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProfileHeader } from "@/features/auth/components/user-profile/header";
import { UserProfileSidebar } from "@/features/auth/components/user-profile/sidebar";

function UserProfile() {
  return (
    <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
      <UserProfileHeader />
      <SidebarProvider className="items-start">
        <UserProfileSidebar />
      </SidebarProvider>
      <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="aspect-video max-w-3xl rounded-xl bg-muted/50"
            />
          ))}
        </div>
      </main>
    </DialogContent>
  );
}

export { UserProfile };

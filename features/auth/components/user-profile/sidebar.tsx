import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { CircleUserRound, Paintbrush } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

function UserProfileSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "profile";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleTabChange = (tab: string) => {
    router.replace(pathname + "?" + createQueryString("tab", tab));
  };

  return (
    <Sidebar collapsible="none" className="hidden md:flex">
      <SidebarHeader className="ml-2 text-2xl font-bold">Account</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleTabChange("profile")}
                  isActive={activeTab === "profile"}
                >
                  <CircleUserRound />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleTabChange("preferences")}
                  isActive={activeTab === "preferences"}
                >
                  <Paintbrush />
                  <span>Preferences</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export { UserProfileSidebar };

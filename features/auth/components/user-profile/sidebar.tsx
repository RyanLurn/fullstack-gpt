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
  return (
    <Sidebar collapsible="none" className="hidden md:flex">
      <SidebarHeader className="ml-2 text-xl font-bold">Account</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <CircleUserRound />
                  <span>Profile</span>
                </SidebarMenuButton>
                <SidebarMenuButton>
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

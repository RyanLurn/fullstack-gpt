import Link from "next/link";
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
import { useUrlState } from "@/hooks/use-url-state";

function UserProfileSidebar() {
  const { searchParams, constructUrlState } = useUrlState();

  const activeTab = searchParams.get("tab") || "profile";

  return (
    <Sidebar collapsible="none" className="hidden md:flex">
      <SidebarHeader className="ml-2 text-2xl font-bold">Account</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === "profile"} asChild>
                  <Link
                    href={constructUrlState({
                      searchParamsToSet: {
                        tab: "profile"
                      },
                      swap: false
                    })}
                    replace
                  >
                    <CircleUserRound />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "preferences"}
                  asChild
                >
                  <Link
                    href={constructUrlState({
                      searchParamsToSet: {
                        tab: "preferences"
                      },
                      swap: false
                    })}
                    replace
                  >
                    <Paintbrush />
                    <span>Preferences</span>
                  </Link>
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

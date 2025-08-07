import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import { NavSecondary } from "./NavSecondary";
import { NavActivity } from "./NavActivity";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Lifecycle",
      url: "/sprint",
      icon: IconListDetails,
    },
    {
      title: "Timeline",
      url: "/timeline",
      icon: IconChartBar,
    },
  ],
  navSecondary: [
    {
      title: "Dashboard",
      icon: IconDashboard,
    },
    {
      title: "Lifecycle",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      icon: IconFolder,
    },
    {
      title: "Team",
      icon: IconUsers,
    },
  ],
  navActivity: [
    {
      title: "Dashboard",
      icon: IconDashboard,
    },
    {
      title: "Lifecycle",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      icon: IconFolder,
    },
    {
      title: "Team",
      icon: IconUsers,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base font-semibold">Acme Inc.</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} />
                <NavActivity items={data.navActivity} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
"use client"

import * as React from "react"
import { useState } from 'react';
import { 
  Layout,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/shared/ui/sidebar';
import { useBoardStore } from '@/shared/stores/useBoardStore';
import { CreateBoardDialog } from '../../../shared/components/CreateBoardDialog';
import { WorkspaceSwitcher } from './workspace-switcher';
import { NavMain } from './nav-main';
import { NavBoards } from './nav-boards';
import { NavUser } from './nav-user';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  const { boards, currentUser, workspaces, currentWorkspace } = useBoardStore();

  const navMain = [
    {
      title: "Dashboard",
      url: "/",
      icon: Layout,
      isActive: true,
    },
  ];

  const userData = currentUser ? {
    name: currentUser.name,
    email: currentUser.email,
    avatar: currentUser.avatar,
  } : {
    name: "Guest",
    email: "guest@example.com",
    avatar: "",
  };

  // Get current workspace boards
  const currentWorkspaceData = Object.values(workspaces).find(w => w.id === currentWorkspace);
  const workspaceBoards = currentWorkspaceData 
    ? boards.filter(board => board.workspaceId === currentWorkspace)
    : [];

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <WorkspaceSwitcher workspaces={Object.values(workspaces)} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={navMain} />
          <NavBoards boards={workspaceBoards} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={userData} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <CreateBoardDialog 
        open={isCreateBoardOpen} 
        onOpenChange={setIsCreateBoardOpen} 
      />
    </>
  );
}

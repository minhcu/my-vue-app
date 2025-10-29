import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Kanban, ChevronDown, ChevronRight } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shared/ui/sidebar';
import type { Board } from '@/shared/lib/types';

interface NavBoardsProps {
  boards: Board[];
}

export function NavBoards({ boards }: NavBoardsProps) {
  const [isBoardsExpanded, setIsBoardsExpanded] = useState(true);
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Boards</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => setIsBoardsExpanded(!isBoardsExpanded)}
            className="justify-start"
          >
            {isBoardsExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <Kanban className="w-4 h-4" />
            <span>All Boards</span>
          </SidebarMenuButton>
          {isBoardsExpanded && (
            <SidebarMenuSub>
              {boards.map((board) => (
                <SidebarMenuSubItem key={board.id}>
                  <SidebarMenuSubButton 
                    asChild 
                    isActive={location.pathname === `/board/${board.id}`}
                  >
                    <Link to={`/board/${board.id}`}>
                      <span>{board.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
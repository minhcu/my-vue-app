import { Outlet } from 'react-router';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar } from './Sidebar';
import { Header } from './Header';

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-hidden">
              <Outlet />
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
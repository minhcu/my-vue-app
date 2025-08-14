import { AppSidebar } from "@/components/app/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function DefaultLayout(
    {
        children,
    }: {
        children: React.ReactNode
    }
) {
    return (
        <div className="default-layout">
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
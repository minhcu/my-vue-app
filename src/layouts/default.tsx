import { AppHeader } from "@/components/app/AppHeader";
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
                    <AppHeader />
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="px-4 lg:px-6">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
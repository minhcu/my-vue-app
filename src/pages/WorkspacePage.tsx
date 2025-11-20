import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { useBoardStore } from "@/shared/stores/useBoardStore";
import { CreateBoardDialog } from "@/shared/components/CreateBoardDialog";
import { WorkspaceFilter } from "@/features/workspace/ui/workspace-filter";
import { WorkspaceDisplay } from "@/features/workspace/ui/workspace-display";
import type { SortOption, ViewMode } from "@/features/workspace/shared/types";

export function WorkspacePage() {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { boards, workspaces } = useBoardStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("recent");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);

    // Get current workspace
    const currentWorkspace = Object.values(workspaces).find(
        (w) => w.id === workspaceId
    );
    // Get boards for this workspace
    const workspaceBoards = boards.filter(
        (board) => board.workspaceId === workspaceId
    );

    // Filter and sort boards
    const filteredAndSortedBoards = useMemo(() => {
        const filtered = workspaceBoards.filter(
            (board) =>
                board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                board.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
        );

        switch (sortBy) {
            case "az":
                return filtered.sort((a, b) => a.title.localeCompare(b.title));
            case "za":
                return filtered.sort((a, b) => b.title.localeCompare(a.title));
            case "recent":
                return filtered.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                );
            case "oldest":
                return filtered.sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                );
            default:
                return filtered;
        }
    }, [workspaceBoards, searchQuery, sortBy]);

    if (!currentWorkspace) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Workspace not found
                    </h2>
                    <p className="text-gray-600">
                        The workspace you're looking for doesn't exist.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    {currentWorkspace.name}
                </h1>
                {currentWorkspace.description && (
                    <p className="text-muted-foreground">
                        {currentWorkspace.description}
                    </p>
                )}
                <p className="text-sm text-muted-foreground">
                    {workspaceBoards.length} board
                    {workspaceBoards.length !== 1 ? "s" : ""} total
                </p>
            </div>

            <WorkspaceFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />

            <WorkspaceDisplay
                searchQuery={searchQuery}
                filteredAndSortedBoards={filteredAndSortedBoards}
                viewMode={viewMode}
                setIsCreateBoardOpen={setIsCreateBoardOpen}
            />

            {/* Create Board Dialog */}
            <CreateBoardDialog
                open={isCreateBoardOpen}
                onOpenChange={setIsCreateBoardOpen}
                workspaceId={workspaceId}
            />
        </div>
    );
}

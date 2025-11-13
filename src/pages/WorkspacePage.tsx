import { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { Search, Filter, Grid, List, ArrowUpAZ, ArrowDownAZ, Clock, Calendar, Plus, Kanban } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Card, CardContent } from '@/shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useBoardStore } from '@/shared/stores/useBoardStore';
import { BoardCard } from '@/features/dashboard/ui/boad-card';
import { CreateBoardDialog } from '@/shared/components/CreateBoardDialog';

type SortOption = 'az' | 'za' | 'recent' | 'oldest';
type ViewMode = 'grid' | 'list';

export function WorkspacePage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { boards, workspaces } = useBoardStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);

  // Get current workspace
  const currentWorkspace = Object.values(workspaces).find(w => w.id === workspaceId);
  
  // Get boards for this workspace
  const workspaceBoards = boards.filter(board => board.workspaceId === workspaceId);

  // Filter and sort boards
  const filteredAndSortedBoards = useMemo(() => {
    let filtered = workspaceBoards.filter(board =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      board.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sortBy) {
      case 'az':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'za':
        return filtered.sort((a, b) => b.title.localeCompare(a.title));
      case 'recent':
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      default:
        return filtered;
    }
  }, [workspaceBoards, searchQuery, sortBy]);

  const getSortLabel = () => {
    switch (sortBy) {
      case 'az': return 'A-Z';
      case 'za': return 'Z-A';
      case 'recent': return 'Most Recent';
      case 'oldest': return 'Least Recent';
      default: return 'Sort';
    }
  };

  if (!currentWorkspace) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Workspace not found</h2>
          <p className="text-gray-600">The workspace you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{currentWorkspace.name}</h1>
        {currentWorkspace.description && (
          <p className="text-muted-foreground">{currentWorkspace.description}</p>
        )}
        <p className="text-sm text-muted-foreground">
          {workspaceBoards.length} board{workspaceBoards.length !== 1 ? 's' : ''} total
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search boards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Sort: {getSortLabel()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setSortBy('az')}>
                <ArrowUpAZ className="w-4 h-4 mr-2" />
                A-Z
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('za')}>
                <ArrowDownAZ className="w-4 h-4 mr-2" />
                Z-A
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('recent')}>
                <Clock className="w-4 h-4 mr-2" />
                Most Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('oldest')}>
                <Calendar className="w-4 h-4 mr-2" />
                Least Recent
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <Button
            size="sm"
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            onClick={() => setViewMode('grid')}
            className="h-8 w-8 p-0"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            onClick={() => setViewMode('list')}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results Info */}
      {searchQuery && (
        <div className="text-sm text-muted-foreground">
          {filteredAndSortedBoards.length} result{filteredAndSortedBoards.length !== 1 ? 's' : ''} for "{searchQuery}"
        </div>
      )}

      {/* Boards Grid/List */}
      {filteredAndSortedBoards.length === 0 && !searchQuery ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No boards in this workspace</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first board to get started with this workspace.
            </p>
            <Button onClick={() => setIsCreateBoardOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Board
            </Button>
          </CardContent>
        </Card>
      ) : searchQuery && filteredAndSortedBoards.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No boards found</h3>
            <p className="text-muted-foreground text-center">
              No boards match "{searchQuery}". Try adjusting your search terms.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "space-y-4"
        }>
          {/* Existing Boards */}
          {filteredAndSortedBoards.map((board) => (
            viewMode === 'grid' ? (
              <BoardCard key={board.id} board={board} />
            ) : (
              <Card key={board.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Kanban className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{board.title}</h3>
                        {board.description && (
                          <p className="text-sm text-muted-foreground">{board.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>{board.listIds.length} lists</span>
                          <span>{board.members.length} members</span>
                          <span>Created {new Date(board.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          ))}

          {/* Add New Board Card - Only show when not searching */}
          {!searchQuery && (
            viewMode === 'grid' ? (
              <Card 
                className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer"
                onClick={() => setIsCreateBoardOpen(true)}
              >
                <CardContent className="flex flex-col items-center justify-center h-full p-6 min-h-[180px]">
                  <Plus className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-gray-500 text-center font-medium">Create new board</p>
                </CardContent>
              </Card>
            ) : (
              <Card 
                className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer"
                onClick={() => setIsCreateBoardOpen(true)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-500">Create new board</h3>
                      <p className="text-sm text-muted-foreground">Add a new board to this workspace</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}

      {/* Create Board Dialog */}
      <CreateBoardDialog 
        open={isCreateBoardOpen} 
        onOpenChange={setIsCreateBoardOpen}
        workspaceId={workspaceId}
      />
    </div>
  );
}
import { useState } from 'react';
import { Link } from 'react-router';
import { Plus, Kanban, Users } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { useBoardStore } from '@/shared/stores/useBoardStore';
import { CreateBoardDialog } from '@/shared/components/CreateBoardDialog';
import { CreateWorkspaceDialog } from '@/shared/components/CreateWorkspaceDialog';

export default function DashBoardPage() {
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);
  const [selectedWorkspaceForBoard, setSelectedWorkspaceForBoard] = useState<string | null>(null);
  const { boards, workspaces } = useBoardStore();

  // Get all workspaces as array
  const allWorkspaces = Object.values(workspaces);
  
  // Get boards for each workspace
  const getWorkspaceBoards = (workspaceId: string) => 
    boards.filter(board => board.workspaceId === workspaceId);

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your workspaces and boards
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsCreateWorkspaceOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Workspace
          </Button>
        </div>
      </div>

      {allWorkspaces.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">No workspaces yet</h3>
            <p className="text-muted-foreground">Create your first workspace to get started</p>
          </div>
          <Button onClick={() => setIsCreateWorkspaceOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Workspace
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {allWorkspaces.map((workspace) => {
            const workspaceBoards = getWorkspaceBoards(workspace.id);
            
            return (
              <div key={workspace.id} className="space-y-4">
                {/* Workspace Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Kanban className="w-4 h-4 text-white" />
                      </div>
                      {workspace.name}
                    </h3>
                    {workspace.description && (
                      <p className="text-sm text-muted-foreground">{workspace.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {workspaceBoards.length} board{workspaceBoards.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedWorkspaceForBoard(workspace.id);
                      setIsCreateBoardOpen(true);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Board
                  </Button>
                </div>

                {/* Boards Grid */}
                {workspaceBoards.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Kanban className="h-8 w-8 text-muted-foreground mb-2" />
                      <h4 className="text-sm font-medium mb-1">No boards in this workspace</h4>
                      <p className="text-xs text-muted-foreground text-center mb-3">
                        Create your first board to start organizing your projects
                      </p>
                      <Button 
                        size="sm" 
                        onClick={() => {
                          setSelectedWorkspaceForBoard(workspace.id);
                          setIsCreateBoardOpen(true);
                        }}
                      >
                        <Plus className="mr-2 h-3 w-3" />
                        Create Board
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {workspaceBoards.map((board) => (
                      <Card key={board.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <Link to={`/board/${board.id}`}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Kanban className="h-4 w-4" />
                              {board.title}
                            </CardTitle>
                            {board.description && (
                              <CardDescription className="text-sm">{board.description}</CardDescription>
                            )}
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{board.listIds.length} lists</span>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{board.members.length}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <CreateBoardDialog 
        open={isCreateBoardOpen} 
        onOpenChange={(open) => {
          setIsCreateBoardOpen(open);
          if (!open) setSelectedWorkspaceForBoard(null);
        }}
        workspaceId={selectedWorkspaceForBoard}
      />
      <CreateWorkspaceDialog 
        open={isCreateWorkspaceOpen} 
        onOpenChange={setIsCreateWorkspaceOpen} 
      />
    </div>
  );
}

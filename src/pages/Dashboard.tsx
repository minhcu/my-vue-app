import { useState } from 'react';
import { Link } from 'react-router';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { useBoardStore } from '@/shared/stores/useBoardStore';
import { CreateBoardDialog } from '../shared/components/CreateBoardDialog';

export function Dashboard() {
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  const { boards, users } = useBoardStore();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your boards and projects</p>
        </div>
        <Button onClick={() => setIsCreateBoardOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Board
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {boards.map((board) => {
          const boardMembers = board.members.map(memberId => users[memberId]).filter(Boolean);
          
          return (
            <Link key={board.id} to={`/board/${board.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{board.title}</CardTitle>
                  {board.description && (
                    <CardDescription>{board.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center -space-x-2">
                      {boardMembers.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="w-6 h-6 border-2 border-white">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="text-xs">
                            {member.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {boardMembers.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                          +{boardMembers.length - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {board.listIds.length} lists
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}

        {/* Create Board Card */}
        <Card 
          className="h-full border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer"
          onClick={() => setIsCreateBoardOpen(true)}
        >
          <CardContent className="flex flex-col items-center justify-center h-full p-6">
            <Plus className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-gray-500 text-center">Create a new board</p>
          </CardContent>
        </Card>
      </div>

      <CreateBoardDialog 
        open={isCreateBoardOpen} 
        onOpenChange={setIsCreateBoardOpen} 
      />
    </div>
  );
}
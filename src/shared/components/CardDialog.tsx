import { useState } from 'react';
import { Trash2, MessageCircle } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Separator } from '@/shared/ui/separator';
import { useBoardStore } from '@/shared/stores/useBoardStore';
import type { Card as CardType } from '@/shared/lib/types';

interface CardDialogProps {
  card: CardType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CardDialog({ card, open, onOpenChange }: CardDialogProps) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [newComment, setNewComment] = useState('');
  
  const { 
    users, 
    comments, 
    updateCard, 
    deleteCard, 
    assignUserToCard,
    unassignUserFromCard,
    addComment,
    currentUser
  } = useBoardStore();
  
  const assignedUsers = card.assignedUsers.map(userId => users[userId]).filter(Boolean);
  const availableUsers = Object.values(users).filter(user => 
    !card.assignedUsers.includes(user.id)
  );
  
  const cardComments = Object.values(comments)
    .filter(comment => comment.cardId === card.id)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const handleSave = () => {
    updateCard(card.id, {
      title: title.trim() || card.title,
      description: description.trim()
    });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this card? This action cannot be undone.')) {
      deleteCard(card.id);
      onOpenChange(false);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && currentUser) {
      addComment(card.id, newComment.trim());
      setNewComment('');
    }
  };

  const handleAssignUser = (userId: string) => {
    assignUserToCard(card.id, userId);
  };

  const handleUnassignUser = (userId: string) => {
    unassignUserFromCard(card.id, userId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Card Details</DialogTitle>
          <DialogDescription className="sr-only">
            Edit card details, assign users, and manage comments
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Card Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSave}
              className="text-lg font-medium"
            />
          </div>

          {/* Card Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleSave}
              placeholder="Add a description..."
              className="w-full p-3 border rounded-md min-h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Assigned Users */}
          <div className="space-y-3">
            <Label>Assigned Users</Label>
            {assignedUsers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {assignedUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0 hover:bg-red-100"
                      onClick={() => handleUnassignUser(user.id)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {availableUsers.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Available users:</p>
                <div className="flex flex-wrap gap-2">
                  {availableUsers.map((user) => (
                    <Button
                      key={user.id}
                      size="sm"
                      variant="outline"
                      onClick={() => handleAssignUser(user.id)}
                      className="flex items-center gap-2"
                    >
                      <Avatar className="w-4 h-4">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {user.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Comments */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Comments
            </Label>
            
            {/* Add Comment */}
            <div className="flex gap-2">
              <Avatar className="w-8 h-8">
                {currentUser && (
                  <>
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>
                      {currentUser.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              <div className="flex-1 space-y-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                />
                {newComment && (
                  <Button size="sm" onClick={handleAddComment}>
                    Add Comment
                  </Button>
                )}
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-3">
              {cardComments.map((comment) => {
                const commentUser = users[comment.userId];
                return (
                  <div key={comment.id} className="flex gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={commentUser?.avatar} alt={commentUser?.name} />
                      <AvatarFallback className="text-xs">
                        {commentUser?.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{commentUser?.name}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Card
            </Button>
            
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
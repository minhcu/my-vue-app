export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  members: string[];
  boardIds: string[];
}

export interface Board {
  id: string;
  title: string;
  description: string;
  workspaceId: string;
  createdAt: Date;
  members: string[];
  listIds: string[];
}

export interface List {
  id: string;
  title: string;
  boardId: string;
  order: number;
  cardIds: string[];
}

export interface Card {
  id: string;
  title: string;
  description: string;
  listId: string;
  order: number;
  createdAt: Date;
  assignedUsers: string[];
}

export interface Comment {
  id: string;
  cardId: string;
  userId: string;
  content: string;
  createdAt: Date;
}
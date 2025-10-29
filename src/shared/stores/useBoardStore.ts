import { create } from 'zustand';
import type { Board, List, Card, User, Comment } from '../lib/types';

interface BoardStore {
  // State
  boards: Board[];
  lists: Record<string, List>;
  cards: Record<string, Card>;
  users: Record<string, User>;
  comments: Record<string, Comment>;
  currentUser: User | null;

  // Actions
  setCurrentUser: (user: User) => void;
  
  // Board actions
  createBoard: (title: string, description?: string) => string;
  updateBoard: (boardId: string, updates: Partial<Board>) => void;
  deleteBoard: (boardId: string) => void;
  addMemberToBoard: (boardId: string, userId: string) => void;
  
  // List actions
  createList: (boardId: string, title: string) => string;
  updateList: (listId: string, updates: Partial<List>) => void;
  deleteList: (listId: string) => void;
  moveList: (listId: string, newOrder: number) => void;
  
  // Card actions
  createCard: (listId: string, title: string, description?: string) => string;
  updateCard: (cardId: string, updates: Partial<Card>) => void;
  deleteCard: (cardId: string) => void;
  moveCard: (cardId: string, targetListId: string, newOrder: number) => void;
  assignUserToCard: (cardId: string, userId: string) => void;
  unassignUserFromCard: (cardId: string, userId: string) => void;
  
  // Comment actions
  addComment: (cardId: string, content: string) => void;
  deleteComment: (commentId: string) => void;
}

// Mock data
const mockUsers: Record<string, User> = {
  'user-1': {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  },
  'user-2': {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6b1f4d?w=32&h=32&fit=crop&crop=face'
  },
  'user-3': {
    id: 'user-3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
  }
};

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useBoardStore = create<BoardStore>((set, get) => ({
  // Initial state
  boards: [
    {
      id: 'board-1',
      title: 'Project Alpha',
      description: 'Main project board',
      createdAt: new Date(),
      members: ['user-1', 'user-2'],
      listIds: ['list-1', 'list-2', 'list-3']
    },
    {
      id: 'board-2', 
      title: 'Marketing Campaign',
      description: 'Q4 Marketing initiatives',
      createdAt: new Date(),
      members: ['user-2', 'user-3'],
      listIds: ['list-4']
    }
  ],
  
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'To Do',
      boardId: 'board-1',
      order: 0,
      cardIds: ['card-1', 'card-2']
    },
    'list-2': {
      id: 'list-2',
      title: 'In Progress',
      boardId: 'board-1',
      order: 1,
      cardIds: ['card-3']
    },
    'list-3': {
      id: 'list-3',
      title: 'Done',
      boardId: 'board-1',
      order: 2,
      cardIds: ['card-4']
    },
    'list-4': {
      id: 'list-4',
      title: 'Ideas',
      boardId: 'board-2',
      order: 0,
      cardIds: ['card-5']
    }
  },
  
  cards: {
    'card-1': {
      id: 'card-1',
      title: 'Setup project repository',
      description: 'Initialize the project with proper folder structure',
      listId: 'list-1',
      order: 0,
      createdAt: new Date(),
      assignedUsers: ['user-1']
    },
    'card-2': {
      id: 'card-2',
      title: 'Design system components',
      description: 'Create reusable UI components',
      listId: 'list-1',
      order: 1,
      createdAt: new Date(),
      assignedUsers: ['user-2']
    },
    'card-3': {
      id: 'card-3',
      title: 'Implement authentication',
      description: 'Add user login and registration',
      listId: 'list-2',
      order: 0,
      createdAt: new Date(),
      assignedUsers: ['user-1', 'user-2']
    },
    'card-4': {
      id: 'card-4',
      title: 'Project planning',
      description: 'Define project scope and timeline',
      listId: 'list-3',
      order: 0,
      createdAt: new Date(),
      assignedUsers: ['user-1']
    },
    'card-5': {
      id: 'card-5',
      title: 'Social media strategy',
      description: 'Plan social media content calendar',
      listId: 'list-4',
      order: 0,
      createdAt: new Date(),
      assignedUsers: ['user-3']
    }
  },
  
  users: mockUsers,
  comments: {},
  currentUser: mockUsers['user-1'],

  // Actions
  setCurrentUser: (user) => set({ currentUser: user }),
  
  // Board actions
  createBoard: (title, description = '') => {
    const id = generateId();
    const newBoard: Board = {
      id,
      title,
      description,
      createdAt: new Date(),
      members: [get().currentUser?.id || 'user-1'],
      listIds: []
    };
    
    set((state) => ({
      boards: [...state.boards, newBoard]
    }));
    
    return id;
  },
  
  updateBoard: (boardId, updates) => {
    set((state) => ({
      boards: state.boards.map(board => 
        board.id === boardId ? { ...board, ...updates } : board
      )
    }));
  },
  
  deleteBoard: (boardId) => {
    set((state) => {
      const board = state.boards.find(b => b.id === boardId);
      if (!board) return state;
      
      // Delete all lists and cards in this board
      const listsToDelete = board.listIds;
      const cardsToDelete: string[] = [];
      
      listsToDelete.forEach(listId => {
        const list = state.lists[listId];
        if (list) {
          cardsToDelete.push(...list.cardIds);
        }
      });
      
      const newLists = { ...state.lists };
      const newCards = { ...state.cards };
      
      listsToDelete.forEach(listId => delete newLists[listId]);
      cardsToDelete.forEach(cardId => delete newCards[cardId]);
      
      return {
        boards: state.boards.filter(board => board.id !== boardId),
        lists: newLists,
        cards: newCards
      };
    });
  },
  
  addMemberToBoard: (boardId, userId) => {
    set((state) => ({
      boards: state.boards.map(board =>
        board.id === boardId && !board.members.includes(userId)
          ? { ...board, members: [...board.members, userId] }
          : board
      )
    }));
  },
  
  // List actions
  createList: (boardId, title) => {
    const id = generateId();
    const board = get().boards.find(b => b.id === boardId);
    const order = board ? board.listIds.length : 0;
    
    const newList: List = {
      id,
      title,
      boardId,
      order,
      cardIds: []
    };
    
    set((state) => ({
      lists: { ...state.lists, [id]: newList },
      boards: state.boards.map(board =>
        board.id === boardId
          ? { ...board, listIds: [...board.listIds, id] }
          : board
      )
    }));
    
    return id;
  },
  
  updateList: (listId, updates) => {
    set((state) => ({
      lists: {
        ...state.lists,
        [listId]: { ...state.lists[listId], ...updates }
      }
    }));
  },
  
  deleteList: (listId) => {
    set((state) => {
      const list = state.lists[listId];
      if (!list) return state;
      
      const newLists = { ...state.lists };
      const newCards = { ...state.cards };
      
      // Delete all cards in this list
      list.cardIds.forEach(cardId => delete newCards[cardId]);
      delete newLists[listId];
      
      return {
        lists: newLists,
        cards: newCards,
        boards: state.boards.map(board =>
          board.id === list.boardId
            ? { ...board, listIds: board.listIds.filter(id => id !== listId) }
            : board
        )
      };
    });
  },
  
  moveList: (listId, newOrder) => {
    set((state) => ({
      lists: {
        ...state.lists,
        [listId]: { ...state.lists[listId], order: newOrder }
      }
    }));
  },
  
  // Card actions
  createCard: (listId, title, description = '') => {
    const id = generateId();
    const list = get().lists[listId];
    const order = list ? list.cardIds.length : 0;
    
    const newCard: Card = {
      id,
      title,
      description,
      listId,
      order,
      createdAt: new Date(),
      assignedUsers: []
    };
    
    set((state) => ({
      cards: { ...state.cards, [id]: newCard },
      lists: {
        ...state.lists,
        [listId]: {
          ...state.lists[listId],
          cardIds: [...state.lists[listId].cardIds, id]
        }
      }
    }));
    
    return id;
  },
  
  updateCard: (cardId, updates) => {
    set((state) => ({
      cards: {
        ...state.cards,
        [cardId]: { ...state.cards[cardId], ...updates }
      }
    }));
  },
  
  deleteCard: (cardId) => {
    set((state) => {
      const card = state.cards[cardId];
      if (!card) return state;
      
      const newCards = { ...state.cards };
      delete newCards[cardId];
      
      return {
        cards: newCards,
        lists: {
          ...state.lists,
          [card.listId]: {
            ...state.lists[card.listId],
            cardIds: state.lists[card.listId].cardIds.filter(id => id !== cardId)
          }
        }
      };
    });
  },
  
  moveCard: (cardId, targetListId, newOrder) => {
    set((state) => {
      const card = state.cards[cardId];
      if (!card) return state;
      
      const sourceList = state.lists[card.listId];
      const targetList = state.lists[targetListId];
      
      if (!sourceList || !targetList) return state;
      
      // Remove from source list
      const newSourceCardIds = sourceList.cardIds.filter(id => id !== cardId);
      
      // Add to target list at specific position
      const newTargetCardIds = [...targetList.cardIds];
      newTargetCardIds.splice(newOrder, 0, cardId);
      
      return {
        cards: {
          ...state.cards,
          [cardId]: { ...card, listId: targetListId, order: newOrder }
        },
        lists: {
          ...state.lists,
          [card.listId]: { ...sourceList, cardIds: newSourceCardIds },
          [targetListId]: { ...targetList, cardIds: newTargetCardIds }
        }
      };
    });
  },
  
  assignUserToCard: (cardId, userId) => {
    set((state) => ({
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          assignedUsers: [
            ...state.cards[cardId].assignedUsers.filter(id => id !== userId),
            userId
          ]
        }
      }
    }));
  },
  
  unassignUserFromCard: (cardId, userId) => {
    set((state) => ({
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          assignedUsers: state.cards[cardId].assignedUsers.filter(id => id !== userId)
        }
      }
    }));
  },
  
  // Comment actions
  addComment: (cardId, content) => {
    const id = generateId();
    const currentUser = get().currentUser;
    if (!currentUser) return;
    
    const newComment: Comment = {
      id,
      cardId,
      userId: currentUser.id,
      content,
      createdAt: new Date()
    };
    
    set((state) => ({
      comments: { ...state.comments, [id]: newComment }
    }));
  },
  
  deleteComment: (commentId) => {
    set((state) => {
      const newComments = { ...state.comments };
      delete newComments[commentId];
      return { comments: newComments };
    });
  }
}));
type Task = {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    assignee: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

type Story = {
    id: string;
    title: string;
    description: string;
    tasks: Task[];
    status: 'todo' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}   

type Sprint = {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    stories: Story[];
    status: 'planning' | 'active' | 'completed';
    createdAt: Date;
    updatedAt: Date;
}

export const SPRINTS_MOCK: Sprint[] = [
    {
        id: 'sprint-1',
        title: 'Sprint 1',
        description: 'Initial sprint for the project',
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-10-14'),
        stories: [
            {
                id: 'story-1',
                title: 'User Authentication',
                description: 'Implement user login and registration',
                tasks: [
                    {
                        id: 'task-1',
                        title: 'Create login page',
                        description: 'Design and implement the login page UI',
                        status: 'todo',
                        priority: 'high',
                        assignee: { id: 'user-1', name: 'Alice' },
                        tags: ['ui', 'frontend'],
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 'task-2',
                        title: 'Implement authentication logic',
                        description: 'Set up backend authentication endpoints',
                        status: 'in-progress',
                        priority: 'medium',
                        assignee: { id: 'user-2', name: 'Bob' },
                        tags: ['backend', 'api'],
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ],
                status: 'in-progress',
                priority: 'high',
                tags: ['authentication'],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'sprint-2',
        title: 'Sprint 2',
        description: 'Focus on user dashboard features',
        startDate: new Date('2023-10-15'),
        endDate: new Date('2023-10-28'),
        stories: [
            {
                id: 'story-2',
                title: 'Dashboard Overview',
                description: 'Create the main dashboard layout',
                tasks: [
                    {
                        id: 'task-3',
                        title: 'Design dashboard UI',
                        description: 'Create wireframes and mockups for the dashboard',
                        status: 'todo',
                        priority: 'low',
                        assignee: { id: 'user-3', name: 'Charlie' },
                        tags: ['ui', 'design'],
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ],
                status: 'todo',
                priority: 'medium',
                tags: ['dashboard'],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        status: 'planning',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

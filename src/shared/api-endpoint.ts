export const API_ENDPOINT = {
    app: {
        healthCheck: '/health-check/liveness',
        status: '/status',
    },
    auth: {
        login: '/auth/login',
        register: '/auth/register',
    },
    user: {
        all: '/users',
    },
    userStory: {
        list: '/user-stories',
        create: '/user-stories',
        get: '/user-stories/:id',
        update: '/user-stories/:id',
        delete: '/user-stories/:id',
    },
    sprint: {
        list: '/sprints',
        create: '/sprints',
        get: '/sprints/:id',
        update: '/sprints/:id',
        delete: '/sprints/:id',
    },
}
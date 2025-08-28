import { API_ENDPOINT } from "./api-endpoint";
import { FetchFactory } from "./fetch-factory";

const API_SERVICE = new FetchFactory(import.meta.env.VITE_API_BASE_URL || "http://localhost:3000")

export interface Sprint {
    createdAt: string;
    endDate: string;
    goal: string;
    id: string;
    isActive: boolean;
    name: string;
    startDate: string;
    status: string | null;
    updatedAt: string;
    stories: Story[];
}

export interface Story {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    point: number;
    sprintId: string;
}

export interface SprintFormData {
    name: string;
    goal?: string;
    startDate?: string;
    endDate?: string;
}

const $api = {
    app: {
        healthCheck: async (): Promise<string> => {
            const response = await API_SERVICE.get({ url: API_ENDPOINT.app.healthCheck });

            return response.data;
        },
        status: async () => {
            const response = await API_SERVICE.get({ url: API_ENDPOINT.app.status });

            return response.data;
        },
    },
    auth: {
        login: async (data: any) => {
            const response = await API_SERVICE.post({ url: API_ENDPOINT.auth.login, data });

            return response
        },
        register: async (data: any) => {
            const response = await API_SERVICE.post({ url: API_ENDPOINT.auth.register, data });

            return response
        },
    },
    user: {
        all: async () => {
            const response = await API_SERVICE.get({ url: API_ENDPOINT.user.all });

            return response
        },
    },
    userStory: {
        getStories: async (): Promise<Story[]> => {
            const response = await API_SERVICE.get({ url: API_ENDPOINT.userStory.list });

            return response.data
        },
        createStory: async (data: any) => {
            const response = await API_SERVICE.post({ url: API_ENDPOINT.userStory.create, data });

            return response
        },
        getStory: async (id: string) => {
            const url = API_ENDPOINT.userStory.get.replace(':id', id);
            const response = await API_SERVICE.get({ url });

            return response
        },
        updateStory: async (id: string, data: any) => {
            const url = API_ENDPOINT.userStory.update.replace(':id', id);
            const response = await API_SERVICE.put({ url, data });

            return response
        },
        deleteStory: async (id: string) => {
            const url = API_ENDPOINT.userStory.delete.replace(':id', id);
            const response = await API_SERVICE.delete({ url });

            return response
        }
    },
    sprint: {
        getSprints: async (): Promise<Sprint[]> => {
            const response = await API_SERVICE.get({ url: API_ENDPOINT.sprint.list });

            return response.data
        },
        createSprint: async (data: SprintFormData) => {
            const response = await API_SERVICE.post({ url: API_ENDPOINT.sprint.create, data });

            return response
        },
        getSprint: async (id: string) => {
            const url = API_ENDPOINT.sprint.get.replace(':id', id);
            const response = await API_SERVICE.get({ url });

            return response
        },
        updateSprint: async (id: string, data: any) => {
            const url = API_ENDPOINT.sprint.update.replace(':id', id);
            const response = await API_SERVICE.put({ url, data });

            return response
        },
        deleteSprint: async (id: string) => {
            const url = API_ENDPOINT.sprint.delete.replace(':id', id);
            const response = await API_SERVICE.delete({ url });

            return response
        }
    }
}

export default $api
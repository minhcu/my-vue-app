import axios, { type AxiosResponse } from 'axios';
interface fetchConfig {
    url: string;
}

interface postConfig {
    url: string;
    data?: any;
}

interface uploadConfig {
    url: string;
    data: FormData;
}

export class FetchFactory {
    private instance
    private renewRequest: Promise<AxiosResponse> | null = null;

    constructor(baseUrl: string, timeout?: number) {
        this.instance = axios.create({
            baseURL: baseUrl,
            timeout,
            // no retry?
        })

        this.instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => console.error('Request failed before reaching server:', error)
        );

        this.instance.interceptors.response.use(
            (response) => response,
            async (error: AxiosResponse) => {
                if (error.status === 401) {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (refreshToken && !this.renewRequest) {
                        try {
                            this.renewRequest = this.post({
                                url: '/auth/renew',
                                data: { token: refreshToken }
                            })
                            const response = await this.renewRequest;
                            this.renewRequest = null;

                            const { accessToken } = response.data;
                            localStorage.setItem('accessToken', accessToken);

                            return axios.request(error.config);

                        } catch (error) {
                            console.error('Error refreshing token:', error);
                            return Promise.reject(error);
                        }
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    private configToAxiosRequest(config: {
        url: string;
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
        headers?: {
            [key: string]: string;
        };
        data?: postConfig['data'] | uploadConfig['data']
    }): Promise<AxiosResponse> {
        return this.instance.request({
            url: config.url,
            method: config.method,
            data: config.data,
        });
    }

    get(config: fetchConfig) {
        return this.configToAxiosRequest({
            url: config.url,
            method: 'GET',
        });
    }

    post(config: postConfig) {
        const headers = {
            'Content-Type': 'application/json',
        };

        return this.configToAxiosRequest({
            url: config.url,
            method: 'POST',
            data: config.data,
            headers,
        });
    }

    upload(config: uploadConfig) {
        return this.configToAxiosRequest({
            url: config.url,
            method: 'POST',
            data: config.data,
        });
    }

    put(config: postConfig) {
        return this.configToAxiosRequest({
            url: config.url,
            method: 'PUT',
            data: config.data,
        });
    }

    delete(config: fetchConfig) {
        return this.configToAxiosRequest({
            url: config.url,
            method: 'DELETE',
        });
    }

    patch(config: postConfig) {
        return this.configToAxiosRequest({
            url: config.url,
            method: 'PATCH',
            data: config.data,
        });
    }
}
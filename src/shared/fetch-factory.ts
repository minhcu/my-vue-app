import axios, { type AxiosRequestConfig } from 'axios';
export class FetchFactory {
    private instance
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
            (error) => error
        );
    }

    get(url: string, params?: any) {
        return this.instance.get(url, { params });
    }

    post(url: string, data?: any, config?: AxiosRequestConfig) {
        const headers = {
            'Content-Type': 'application/json',
        };

        return this.instance.post(url, data, {
            ...config,
            headers,
        });
    }

    upload(url: string, data: FormData, config?: AxiosRequestConfig) {
        return this.instance.post(url, data, config);
    }

    put(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.instance.put(url, data, config);
    }

    delete(url: string, config?: AxiosRequestConfig) {
        return this.instance.delete(url, config);
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.instance.patch(url, data, config);
    }
}
import {
    ACCESS_TOKEN_EXPIRY,
    API_BASE_URL,
    REFRESH_TOKEN_EXPIRY
} from '@/config';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';

export interface IMeta {
    limit: number;
    page: number;
    size: number;
}

let axiosInstance: AxiosInstance | null = null;

const createAxiosInstance = (baseUrl: string): AxiosInstance => {
    if (axiosInstance) return axiosInstance;

    axiosInstance = axios.create({
        baseURL: baseUrl
    });

    // Request Interceptor: Add Authorization Header
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = Cookies.get('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as AxiosRequestConfig & {
                _retry?: boolean;
            };

            console.log('Amra dekhi:', error.response?.status);
            console.log('Amra dekhi r o:', originalRequest._retry);

            if (error.response?.status === 401 && !originalRequest._retry) {
                console.log('if er vitor');
                originalRequest._retry = true;
                try {
                    const rtoken = Cookies.get('rtoken');
                    const response = await axios.get(
                        `${API_BASE_URL}/authroute/refreshtoken`,
                        {
                            headers: {
                                Authorization: `Bearer ${rtoken}`
                            },
                            withCredentials: true
                        }
                    );

                    const { access_token, refresh_token } = response.data;
                    if (typeof window !== 'undefined') {
                        Cookies.set('token', access_token, {
                            expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRY),
                            path: '/'
                        });
                        Cookies.set('rtoken', refresh_token, {
                            expires: new Date(
                                Date.now() + REFRESH_TOKEN_EXPIRY
                            ),
                            path: '/'
                        });
                    }

                    originalRequest.headers = {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${access_token}`
                    };
                    return axios(originalRequest);
                } catch (err) {
                    /* if (typeof window !== 'undefined') {
                        localStorage.removeItem('accessToken');
                        redirect('/login');
                    } */
                    console.log(err);
                }
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
        {
            url: string;
            method: AxiosRequestConfig['method'];
            data?: AxiosRequestConfig['data'];
            meta?: IMeta;
            params?: AxiosRequestConfig['params'];
            ContentType?: string;
        },
        unknown,
        unknown
    > =>
    async ({ url, method, data, params }) => {
        try {
            const axiosInstance = createAxiosInstance(baseUrl);
            const result = await axiosInstance({
                url,
                method,
                data,
                params
            });

            return { data: result.data };
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message
                }
            };
        }
    };

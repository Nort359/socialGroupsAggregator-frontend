import axios from 'axios';
import {IAuthResponse} from "../interfaces/response/IAuthResponse";

export const API_URL = 'http://localhost:5000/api';

const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
    if (config && config.headers) {
        config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    }

    return config;
});

instance.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && error.config?._isRetry) {
            originalRequest._isRetry = true;

            try {
                const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
                    withCredentials: true,
                });
                const { accessToken } = response.data || {};

                localStorage.setItem('token', accessToken);

                return instance.request(originalRequest);
            } catch (error) {
                console.error(error);
            }
        }

        throw error;
    }
);

export default instance;

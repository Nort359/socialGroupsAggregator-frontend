import instance from '../utils';
import { AxiosResponse } from 'axios';
import { IAuthResponse } from '../interfaces/response/IAuthResponse';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return instance.post<IAuthResponse>('/login', { email, password });
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return instance.post<IAuthResponse>('/registration', { email, password });
    }

    static async logout(): Promise<void> {
        return instance.delete('/logout');
    }
}

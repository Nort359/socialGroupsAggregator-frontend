import instance from '../utils';
import { AxiosResponse } from 'axios';
import { IUser } from '../interfaces/IUser';

export default class UserService {
    static async fetchUsers(email: string, password: string): Promise<AxiosResponse<IUser[]>> {
        return instance.get<IUser[]>('/users');
    }
}

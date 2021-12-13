import instance from '../utils';
import { AxiosResponse } from 'axios';
import { IGroup } from '../interfaces/IGroup';

export default class GroupService {
    static async add(name: string, user: string): Promise<AxiosResponse<IGroup>> {
        return instance.post<IGroup>('/group', { name, user });
    }

    static async update(id: string, name: string): Promise<AxiosResponse<IGroup>> {
        return instance.patch<IGroup>('/group', { id, name });
    }

    static async delete(id: string): Promise<AxiosResponse<void>> {
        return instance.delete(`/group/${id}`);
    }

    static async getAllUser(user: string): Promise<AxiosResponse<IGroup[]>> {
        return instance.get<IGroup[]>(`/group/${user}`);
    }
}

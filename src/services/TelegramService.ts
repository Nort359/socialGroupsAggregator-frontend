import instance from '../utils';
import { AxiosResponse } from 'axios';
import { ITelegramData } from '../interfaces/telegram';

export default class TelegramService {
    static prefix = '/telegram';

    static async get(user: string): Promise<AxiosResponse<ITelegramData>> {
        return instance.get<ITelegramData>(`${TelegramService.prefix}/${user}`);
    }

    static async send(chats: string[], message: string): Promise<AxiosResponse<void>> {
        return instance.post(`${TelegramService.prefix}/sendMessage`, { chats, message });
    }
}

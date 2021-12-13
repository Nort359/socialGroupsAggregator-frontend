import { ITelegramUser } from './ITelegramUser';
import { ITelegramChat } from './ITelegramChat';

export interface ITelegramData extends ITelegramUser {
    chats: ITelegramChat[];
}

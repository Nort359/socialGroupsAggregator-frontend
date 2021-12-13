import ChatStatuses from '../../enums/ChatStatuses';

export interface ITelegramChat {
    id: string;
    title: string;
    type: string;
    status: ChatStatuses;
}

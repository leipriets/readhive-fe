import { CurrentUserInterface } from "./currentUser.interface"
import { NotificationMessagePart } from "./notifMessagePart.interface";

interface NotifListData {
    id: number;
    receiver: CurrentUserInterface;
    sender: CurrentUserInterface;
    type: string;
    title: string | null;
    channel: string;
    message_parts: NotificationMessagePart[];
    data: any;
    actors: any;
    is_read: boolean;
    is_seen: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface NotificationListResponseInterface {
    count: number;
    data: NotifListData[];
}
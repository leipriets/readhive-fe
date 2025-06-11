import { CurrentUserInterface } from "./currentUser.interface"
import { NotifListData } from "./notifList.interface";
import { NotificationMessagePart } from "./notifMessagePart.interface";


export interface NotificationListResponseInterface {
    count: number;
    data: NotifListData[];
}
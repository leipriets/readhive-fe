import { NotificationListResponseInterface } from "../../../library/data/types/notificationListResponse.interface";

export interface NotificationStateInterface {
  isLoading: boolean;
  error: string | null;
  data: NotificationListResponseInterface;
}

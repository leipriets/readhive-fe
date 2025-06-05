import { NotifCountResponseInterface } from "../../components/header/types/notifCountResponse.interface";

export interface NotificationCountStateInterface {
  isLoading: boolean;
  error: string | null;
  data: NotifCountResponseInterface;
}

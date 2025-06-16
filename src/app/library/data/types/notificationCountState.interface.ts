import { NotifCountResponseInterface } from "../../components/searchProfile/types/notifCountResponse.interface";

export interface NotificationCountStateInterface {
  isLoading: boolean;
  error: string | null;
  data: NotifCountResponseInterface;
}

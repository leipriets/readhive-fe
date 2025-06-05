import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { NotificationListResponseInterface } from "../../../library/data/types/notificationListResponse.interface";


export const notificationActions = createActionGroup({
    source: 'notification',
    events: {
        'Get notifications': emptyProps(),
        'Get notifications success': props<{data: NotificationListResponseInterface}>(),
        'Get notifications failure': emptyProps(),

        'Clear notifications': emptyProps(),
        'Clear notifications success': props<{data: any, message: string}>(),
        'Clear notifications failure': emptyProps(),
    }
});
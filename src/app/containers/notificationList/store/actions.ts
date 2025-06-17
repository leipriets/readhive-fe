import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { NotificationListResponseInterface } from "../../../library/data/types/notificationListResponse.interface";


export const notificationActions = createActionGroup({
    source: 'notification',
    events: {
        'Get notifications': props<{ limit: number, offset: number }>(),
        'Get notifications success': props<{data: NotificationListResponseInterface}>(),
        'Get notifications failure': emptyProps(),

        'Get notifications load more': props<{ limit: number, offset: number }>(),
        'Get notifications load more success': props<{data: NotificationListResponseInterface}>(),
        'Get notifications load more failure': emptyProps(),

        'Clear notifications': emptyProps(),
        'Clear notifications success': props<{data: any, message: string}>(),
        'Clear notifications failure': emptyProps(),
    }
});
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { NotifCountResponseInterface } from "../../searchProfile/types/notifCountResponse.interface";

export const notificationCountActions = createActionGroup({
    source: 'notification',
    events: {
        'Get notification count': emptyProps(),
        'Get notification count success': props<{data: NotifCountResponseInterface}>(),
        'Get notification count failure': emptyProps(),

        'reset notification count': emptyProps(),
        'reset notification count success': props<{data: NotifCountResponseInterface}>(),
        'reset notification count failure': emptyProps(),
    }
});
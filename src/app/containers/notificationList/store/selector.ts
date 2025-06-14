import {createSelector} from '@ngrx/store';
import {NotificationStateInterface} from '../types/notificationState.interface';

// Get the entire state 
export const selectActionData = (state: any): NotificationStateInterface =>
  state.actionData;

// Get the HTML content inside state
export const selectNotifActionData = createSelector(
  selectActionData,
  (notifData) => notifData.actionData ?? ''
);

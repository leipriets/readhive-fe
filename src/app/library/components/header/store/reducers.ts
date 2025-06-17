import {
  routerNavigatedAction,
  routerNavigationAction,
} from '@ngrx/router-store';
import {createFeature, createReducer, on} from '@ngrx/store';
import {NotificationCountStateInterface} from '../../../data/types/notificationCountState.interface';
import {notificationCountActions} from './actions';

const initialState: NotificationCountStateInterface = {
  isLoading: false,
  error: null,
  data: {
    count: 0
  },
};

const notificationCountFeature = createFeature({
  name: 'notificationCount',
  reducer: createReducer(
    initialState,
    on(notificationCountActions.getNotificationCount, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(
      notificationCountActions.getNotificationCountSuccess,
      (state, action) => ({
        ...state,
        isLoading: false,
        data: action.data,
      })
    ),
    on(notificationCountActions.getNotificationCountFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(notificationCountActions.resetNotificationCount, (state) => ({
      ...state,
      data: {
        count: 0,
      },
    }))
  ),
});

export const {
  name: notificationCountFeatureKey,
  reducer: notificationCountReducer,
  selectIsLoading,
  selectError,
  selectData: selectNotifData,
} = notificationCountFeature;

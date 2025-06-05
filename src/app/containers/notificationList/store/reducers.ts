import {routerNavigationAction} from '@ngrx/router-store'
import {createFeature, createReducer, on} from '@ngrx/store'

import { notificationActions } from './actions'
import { NotificationStateInterface } from '../types/notificationState.interface'

const initialState: NotificationStateInterface = {
  isLoading: false,
  error: null,
  data: {
    count: 0,
    data: []
  },
}

const notificationFeature = createFeature({
  name: 'user notification',
  reducer: createReducer(
    initialState,
    on(notificationActions.getNotifications, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(notificationActions.getNotificationsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.data,
    })),
    on(notificationActions.getNotificationsFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(notificationActions.clearNotifications, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(notificationActions.clearNotificationsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
    })),
    on(notificationActions.clearNotificationsFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
  ),
})

export const {
  name: notificationFeatureKey,
  reducer: notificationReducer,
  selectIsLoading,
  selectError,
  selectData: selectNotifData,
} = notificationFeature

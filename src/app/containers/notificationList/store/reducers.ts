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
  actionData: []
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
      data: {
        count: action.data.count,
        data: [...state.data.data, ...action.data.data]
      },
      actionData: action.data.data         
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
    on(routerNavigationAction, () => initialState)
  ),
})

export const {
  name: notificationFeatureKey,
  reducer: notificationReducer,
  selectIsLoading,
  selectError,
  selectData: selectNotifData,
  selectActionData
} = notificationFeature

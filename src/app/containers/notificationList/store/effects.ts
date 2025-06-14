import {EventEmitter, inject, ViewChild} from '@angular/core';
import {act, Actions, createEffect, ofType} from '@ngrx/effects';
import {notificationActions} from './actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';

import {Router} from '@angular/router';
import { NotificationService } from '../../../library/data/services/notification.service';
import { NotificationListResponseInterface } from '../../../library/data/types/notificationListResponse.interface';

export const getUserNotificationsEffect = createEffect(
  (
    actions$ = inject(Actions),
    notifService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(notificationActions.getNotifications),
      switchMap(({limit, offset}) => {
        return notifService.getUserNotifications(limit, offset).pipe(
          map((response: NotificationListResponseInterface) => {
            return notificationActions.getNotificationsSuccess({data: response})
          }),
          catchError(() => {
            return of(notificationActions.getNotificationsFailure())
          })
        )
      })
    )
  },
  {functional: true}
)

export const clearUserNotifications = createEffect(
  (
    actions$ = inject(Actions),
    notifService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(notificationActions.clearNotifications),
      switchMap(() => {
        return notifService.clearUserNotifications().pipe(
          map((response) => {
            return notificationActions.clearNotificationsSuccess({data: response?.data, message: response?.message})
          }),
          catchError(() => {
            return of(notificationActions.clearNotificationsFailure())
          })
        )
      })
    )
  },
  {functional: true}
)


import {EventEmitter, inject, ViewChild} from '@angular/core';
import {act, Actions, createEffect, ofType} from '@ngrx/effects';
import {notificationCountActions} from './actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';

import {Router} from '@angular/router';
import { NotificationService } from '../../../data/services/notification.service';
import { NotifCountResponseInterface } from '../types/notifCountResponse.interface';
import { notificationActions } from '../../../../containers/notificationList/store/actions';
import { Store } from '@ngrx/store';

export const getNotificationCountEffect = createEffect(
  (
    actions$ = inject(Actions),
    notifService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(notificationCountActions.getNotificationCount),
      switchMap(() => {
        return notifService.getNotificationBadge().pipe(
          map((response) => {
            console.log('notification count -> ', response);
            return notificationCountActions.getNotificationCountSuccess({data: response})
          }),
          catchError(() => {
            return of(notificationCountActions.getNotificationCountFailure())
          })
        )
      })
    )
  },
  {functional: true}
)


export const clearNotificationsEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(notificationActions.clearNotifications),
      tap(() => {
        store.dispatch(notificationCountActions.resetNotificationCount());
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

// export const clearNotificationsEffect = createEffect()

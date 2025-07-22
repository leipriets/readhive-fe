import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {feedActions} from './actions';
import {catchError, delay, map, of, switchMap, tap, timeout} from 'rxjs';
import {FeedService} from '../services/feed.service';
import {GetFeedResponseInterface} from '../../../data/types/getFeedResponse.interface';
import {NzNotificationService} from 'ng-zorro-antd/notification';

export const getFeedEffect = createEffect(
  (
    actions$ = inject(Actions),
    feedService = inject(FeedService),
    nzNotificationService = inject(NzNotificationService)
  ) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({url}) => {
        return feedService.getFeed(url).pipe(
          timeout(60 * 1000),
          map((response: GetFeedResponseInterface) => {
            const isLastPage = response.articles.length === 0;
            return feedActions.getFeedSuccess({feed: response, isLastPage});
          }),
          catchError((error) => {
            console.error('Request timed out or failed:', error);

            const errorNotifMsg = 'Our free-tier cloud server temporarily paused due to inactivity. Please wait a moment while we reconnect—this usually takes about a minute.';

            nzNotificationService.error('Server Error.', errorNotifMsg, {
              nzDuration: 10000,
            });
            
            return of(feedActions.getFeedFailure());
          })
        );
      })
    );
  },
  {functional: true}
);

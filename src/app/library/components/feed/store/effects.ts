import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { feedActions } from './actions';
import { catchError, delay, map, of, switchMap, tap } from 'rxjs';
import { FeedService } from '../services/feed.service';
import { GetFeedResponseInterface } from '../../../data/types/getFeedResponse.interface';

export const getFeedEffect = createEffect(
  (
    actions$ = inject(Actions),
    feedService = inject(FeedService),
  ) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({url}) => {
        return feedService.getFeed(url).pipe(
          delay(100),
          map((response: GetFeedResponseInterface) => {
            const isLastPage = response.articles.length === 0;
            return feedActions.getFeedSuccess({feed: response, isLastPage});
          }),
          catchError(() => {
            return of(feedActions.getFeedFailure());
          } )
        );
      })
    );
  },
  {functional: true}
);

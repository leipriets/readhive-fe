import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { followUserActions } from './actions';
import {catchError, map, of, switchMap} from 'rxjs';
import { ArticleInterface } from '../../../data/types/article.interface';
import { FollowButtonService } from '../services/followButton.service';
import { ProfileInterface } from '../../../data/types/profile.interface';

export const followUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    followButtonService = inject(FollowButtonService)
  ) => {
    return actions$.pipe(
      ofType(followUserActions.followUser),
      switchMap(({isFollowing, username}) => {
        const profile$ = isFollowing
          ? followButtonService.unFollowUser(username)
          : followButtonService.followUser(username);

        return profile$.pipe(
          map((profile: ProfileInterface) => {
            return followUserActions.followUserSuccess({profile});
          }),
          catchError(() => {
            return of(followUserActions.followUserFailure());
          })
        );
      })
    );
  },
  {functional: true}
);

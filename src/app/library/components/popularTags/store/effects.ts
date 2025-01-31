import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { popularTagActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { PopularTagService } from '../../../data/services/popularTag.service';
import { PopularTagType } from '../../../data/types/popularTag.type';

export const getPopularTagsEffect = createEffect(
  (
    actions$ = inject(Actions),
    popularTagsService = inject(PopularTagService),
  ) => {
    return actions$.pipe(
      ofType(popularTagActions.getPopularTags),
      switchMap(() => {
        return popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return popularTagActions.getPopularTagsSuccess({popularTags});
          }),
          catchError(() => {
            return of(popularTagActions.getPopularTagsFailure());
          })
        );
      })
    );
  },
  {functional: true}
);

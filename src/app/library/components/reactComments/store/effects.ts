import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { reactCommentsActions } from "./actions";
import { LikeCommentsInterface } from "../../../data/types/likeComments.interface";
import { ReactCommentService } from "../services/reactComment.service";
import { commentsActions } from "../../comments/store/actions";
import { Store } from "@ngrx/store";
import { LikeCommentsResponseInterface } from "../../../data/types/likeCommentsResponse.interface";


export const likeCommentEffect = createEffect(
  (actions$ = inject(Actions), reactCommentsService = inject(ReactCommentService)) => {
    return actions$.pipe(
      ofType(reactCommentsActions.likeComment),
      switchMap(({request}) => {
        const likeComment$ = reactCommentsService.likeComment(request);

        return likeComment$.pipe(
          map((response: LikeCommentsResponseInterface) => {
            // console.log('react comments data liked', response);
            return reactCommentsActions.likeCommentSuccess({data: response});
          }),
          catchError(() => {
            return of(reactCommentsActions.likeCommentFailure());
          })
        );
      })
    );
  },
  {functional: true}
);

export const dislikeCommentEffect = createEffect(
    (actions$ = inject(Actions), reactCommentsService = inject(ReactCommentService)) => {
      return actions$.pipe(
        ofType(reactCommentsActions.dislikeComment),
        switchMap(({request}) => {
          const dislikeComment$ = reactCommentsService.dislikeComment(request);
  
          return dislikeComment$.pipe(
            map((response: LikeCommentsResponseInterface) => {
            // console.log('react comments data disliked', response);

              return reactCommentsActions.dislikeCommentSuccess({data: response});
            }),
            catchError(() => {
              return of(reactCommentsActions.dislikeCommentFailure());
            })
          );
        })
      );
    },
    {functional: true}
  );

import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {commentsActions} from './actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {CommentsService} from '../services/comments.service';
import {LikeCommentsInterface} from '../../../data/types/likeComments.interface';
import {CommentsInterface} from '../../../data/types/comments.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {EditCommentRequestInterface} from '../types/editCommentRequest.interface';

export const getCommentsEffect = createEffect(
  (actions$ = inject(Actions), commentsService = inject(CommentsService)) => {
    return actions$.pipe(
      ofType(commentsActions.getComment),
      switchMap(({articleId, slug}) => {
        return commentsService.getComments(articleId, slug).pipe(
          map((response) => {
            return commentsActions.getCommentSuccess({data: response});
          }),
          catchError(() => {
            return of(commentsActions.likeCommentFailure());
          })
        );
      })
    );
  },
  {functional: true}
);

export const commentEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentsService)) => {
    return actions$.pipe(
      ofType(commentsActions.commentArticle),
      switchMap(({request}) => {
        return commentService.commentArticle(request).pipe(
          map((comment: CommentsInterface) => {
            const commentSuccess = commentsActions.commentArticleSuccess({
              comment,
            });
            return commentSuccess;
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              commentsActions.commentArticleFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const updateCommentEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentsService)) => {
    return actions$.pipe(
      ofType(commentsActions.updateCommentArticle),
      switchMap(({request}) => {
        return commentService.updateComment(request).pipe(
          map((comment: CommentsInterface) => {
            const commentSuccess = commentsActions.updateCommentArticleSuccess({
              comment,
            });
            return commentSuccess;
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              commentsActions.commentArticleFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const deleteCommentEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentsService)) => {
    return actions$.pipe(
      ofType(commentsActions.deleteComment),
      switchMap(({commentId, slug}) => {
        return commentService.deleteComment(commentId, slug).pipe(
          map((comment: CommentsInterface) => {
            const deleteCommentSuccess = commentsActions.deleteCommentSuccess({
              comment
            });
            return deleteCommentSuccess;
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              commentsActions.deleteCommentFailure()
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const reloadAfterCommentEffect = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(commentsActions.commentArticleSuccess, commentsActions.deleteCommentSuccess),
      tap(({comment}) => {
        store.dispatch(
          commentsActions.getComment({
            articleId: comment.article_id,
            slug: comment.slug,
          })
        );
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);
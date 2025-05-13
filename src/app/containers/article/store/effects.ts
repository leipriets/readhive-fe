import {EventEmitter, inject, ViewChild} from '@angular/core';
import {act, Actions, createEffect, ofType} from '@ngrx/effects';
import {articleActions} from './actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';

import {Router} from '@angular/router';
import {ArticleService} from '../../../library/data/services/article.service';
import {ArticleInterface} from '../../../library/data/types/article.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {DrawerComponent} from '../../../library/components/drawer/drawer.component';
import {DrawerService} from '../../../library/components/drawer/services/drawerService.service';
import {Store} from '@ngrx/store';
import {drawerActions} from '../../../library/components/drawer/store/actions';
import {NzModalService} from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export const getArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticleService)) => {
    return actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap(({slug}) => {
        return articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return articleActions.getArticleSuccess({article});
          }),
          catchError(() => {
            return of(articleActions.getArticleFailure());
          })
        );
      })
    );
  },
  {functional: true}
);

export const createArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticleService)) => {
    return actions$.pipe(
      ofType(articleActions.createArticle),
      switchMap(({request}) => {
        return articleService.createArticle(request).pipe(
          map((article: ArticleInterface) => {
            return articleActions.createArticleSuccess({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              articleActions.createArticleFailure({
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

export const redirectAfterCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(articleActions.createArticleSuccess),
      tap(({article}) => {
        router.navigate(['/articles', article.slug]);
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const updateArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticleService)) => {
    return actions$.pipe(
      ofType(articleActions.updateArticle),
      switchMap(({request, slug}) => {
        return articleService.updateArticle(slug, request).pipe(
          map((article: ArticleInterface) => {
            return articleActions.updateArticleSuccess({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              articleActions.updateArticleFailure({
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

export const redirectAfterUpdateEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(articleActions.updateArticleSuccess),
      tap(({article}) => {
        store.dispatch(drawerActions.toggleDrawerClose());
        store.dispatch(articleActions.getArticle({slug: article.slug}));
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const deleteArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticleService)) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticle),
      switchMap(({slug}) => {
        return articleService.deleteArticle(slug).pipe(
          map(() => {
            return articleActions.deleteArticleSuccess();
          }),
          catchError(() => {
            return of(articleActions.deleteArticleFailure());
          })
        );
      })
    );
  },
  {functional: true}
);

export const showSuccessModalAfterDeleteEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    modalService = inject(NzModalService)
  ) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticleSuccess),
      tap(() => {
        const modal = modalService.success({
          nzTitle: 'Article was successfully deleted!',
        });

        setTimeout(() => {
          modal.destroy();
          router.navigateByUrl('/');
        }, 2000);

      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);


export const showErrorNotifArticleEffect = createEffect(
  (actions$ = inject(Actions), notification = inject(NzNotificationService)) => {
    return actions$.pipe(
      ofType(articleActions.createArticleFailure),
      tap(({errors}) => {

        const errorKey = Object.keys(errors)[1];
        // const errorMessage: string = errors[errorKey][0];


        console.log(errorKey);

        notification.error(
          'Error Article',
          '',
          { nzDuration: 0 }
        );
      })
    );
  },
  {functional: true, dispatch: false}
);
import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";

import { PersistenceService } from "../../../library/data/services/persitence.service";
import { AuthService } from "../../../library/data/services/auth.service";
import { authActions } from "./actions";
import { CurrentUserInterface } from "../../../library/data/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const token = persistenceService.get('BVaccessToken');

        if (!token) {
          return of(authActions.getCurrentUserFailure);
        }
        return authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            console.log('currentUser',currentUser);
            return authActions.getCurrentUserSuccess({currentUser});
          }),
          catchError((err) => {
            return of(authActions.getCurrentUserFailure());
            console.log(err);
          })
        );
      })
    );
  },
  {functional: true}
);

export const registerEffect = createEffect(
    (
      actions$ = inject(Actions),
      authService = inject(AuthService),
      persistenceService = inject(PersistenceService)
    ) => {
      return actions$.pipe(
        ofType(authActions.register),
        switchMap(({request}) => {
          return authService.register(request).pipe(
            map((currentUser: CurrentUserInterface) => {
              persistenceService.set('BVaccessToken', currentUser.token);
              return authActions.registerSuccess({currentUser});
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                authActions.registerFailure({
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


  export const redirectAfterRegisterEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
      return actions$.pipe(
        ofType(authActions.registerSuccess),
        tap(() => {
          router.navigateByUrl('/');
        })
      );
    },
    {functional: true, dispatch: false}
  );


  export const loginEffect = createEffect(
    (
      actions$ = inject(Actions),
      authService = inject(AuthService),
      persistenceService = inject(PersistenceService)
    ) => {
      return actions$.pipe(
        ofType(authActions.login),
        switchMap(({request}) => {
          return authService.login(request).pipe(
            map((currentUser: CurrentUserInterface) => {
              persistenceService.set('BVaccessToken', currentUser.token);
              return authActions.loginSuccess({currentUser});
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                authActions.loginFailure({
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

  export const redirectAfterLoginEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
      return actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(() => {
          router.navigateByUrl('/');
        })
      );
    },
    {functional: true, dispatch: false}
  );

  export const logoutEffect = createEffect(
    (
      actions$ = inject(Actions),
      router = inject(Router),
      persistenceService = inject(PersistenceService)
    ) => {
      return actions$.pipe(
        ofType(authActions.logout),
        tap(() => {
          persistenceService.set('BVaccessToken', '');
          router.navigateByUrl('/articles');
        })
      )
    },
    {
      functional: true,
      dispatch: false
    }
  )
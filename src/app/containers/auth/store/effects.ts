import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";

import { PersistenceService } from "../../../library/data/services/persitence.service";
import { AuthService } from "../../../library/data/services/auth.service";
import { authActions } from "./actions";
import { CurrentUserInterface } from "../../../library/data/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";

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
            return authActions.getCurrentUserSuccess({currentUser});
          }),
          catchError((err) => {
            if (err?.status == 401) {
              localStorage.removeItem('BVaccessToken');
            }
            
            return of(authActions.getCurrentUserFailure());
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
              console.log(currentUser);
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

  export const updateCurrentUserEffect = createEffect(
    (
      actions$ = inject(Actions),
      authService = inject(AuthService),
    ) => {
      return actions$.pipe(
        ofType(authActions.updateCurrentUser),
        switchMap(({currentUserRequest, filename}) => {
          return authService.updateCurrentUser(currentUserRequest, filename).pipe(
            map((currentUser: CurrentUserInterface) => {
              return authActions.updateCurrentUserSuccess({currentUser});
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(authActions.updateCurrentUserFailure({errors: errorResponse.error.errors}));
            })
          );
        })
      );
    },
    {functional: true}
  );

  
  export const notifUpdateCurrentUser = createEffect(
    (
      actions$ = inject(Actions),
      messageService = inject(NzMessageService),
    ) => {
      return actions$.pipe(
        ofType(authActions.updateCurrentUserSuccess),
        tap(() => {
          return messageService.success("Profile updated successfully.");
        })
      )
    },
    {
      functional: true,
      dispatch: false
    }
  )

  export const logoutEffect = createEffect(
    (
      actions$ = inject(Actions),
      router = inject(Router),
      persistenceService = inject(PersistenceService),
      authService = inject(AuthService)
    ) => {
      return actions$.pipe(
        ofType(authActions.logout),
        tap(() => {
          authService.logout().subscribe();
          persistenceService.set('BVaccessToken', '');
          router.navigateByUrl('/global-feed');
        })
      )
    },
    {
      functional: true,
      dispatch: false
    }
  )
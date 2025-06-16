import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CurrentUserInterface } from "../../../library/data/types/currentUser.interface";
import { BackendErrorInterface } from "../../../library/data/types/backendError.interface";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";
import { CurrentUserRequestInterface } from "../../../library/data/types/currentUserRequest.interface";

export const authActions = createActionGroup({
    source: 'auth',
    events: {
      Register: props<{request: RegisterRequestInterface}>(),
      'Register success': props<{currentUser: CurrentUserInterface}>(),
      'Register failure': props<{errors: BackendErrorInterface}>(),
  
      Login: props<{request: LoginRequestInterface}>(),
      'Login success': props<{currentUser: CurrentUserInterface}>(), 
      'Login failure': props<{errors: BackendErrorInterface}>(),
  
      'Get current user': emptyProps(),
      'Get current user success': props<{currentUser: CurrentUserInterface}>(),
      'Get current user failure': emptyProps(),
  
      'Update current user': props<{currentUserRequest: CurrentUserRequestInterface, filename?: string}>(),
      'Update current user success': props<{currentUser: CurrentUserInterface}>(),
      'Update current user failure': props<{errors: BackendErrorInterface}>(),
  
      Logout: emptyProps(),
    },
  });
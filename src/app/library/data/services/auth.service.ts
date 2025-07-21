import {HttpClient} from '@angular/common/http';
import {AuthResponseInterface} from '../types/authResponse.interface';
import {CurrentUserInterface} from '../types/currentUser.interface';
import {map, Observable, catchError} from 'rxjs';
import {environment} from '../../../../environments/environment.development';
import {Injectable} from '@angular/core';
import {RegisterRequestInterface} from '../../../containers/auth/types/registerRequest.interface';
import {LoginRequestInterface} from '../../../containers/auth/types/loginRequest.interface';
import {CurrentUserRequestInterface} from '../types/currentUserRequest.interface';
import {IValidateFieldResponse} from '../../../containers/auth/types/validateFieldResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user';
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  logout(): Observable<{message: string}> {
    const url = environment.apiUrl + '/user/logout';
    return this.http.post<{message: string}>(url, []);
  }

  updateCurrentUser(
    currentUserRequest: CurrentUserRequestInterface,
    filename?: string
  ): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user-update';

    const userData = new FormData();
    userData.append('username', currentUserRequest.user.username);
    userData.append('bio', currentUserRequest.user.bio);
    userData.append('email', currentUserRequest.user.email);
    if (currentUserRequest.user.image) {
      userData.append('image', currentUserRequest.user.image, filename);
    }

    return this.http
      .post<AuthResponseInterface>(url, userData)
      .pipe(map(this.getUser));
  }

  validateUsername(username: string): Observable<IValidateFieldResponse> {
    const url = environment.apiUrl + '/user/validate-username';
    return this.http.get<IValidateFieldResponse>(url, {
      params: {
        username,
      },
    });
  }

  validateEmail(email: string): Observable<IValidateFieldResponse> {
    const url = environment.apiUrl + '/user/validate-email';
    return this.http.get<IValidateFieldResponse>(url, {
      params: {
        email,
      },
    });
  }
}

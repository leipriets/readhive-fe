import { HttpClient } from "@angular/common/http";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { CurrentUserInterface } from "../types/currentUser.interface";
import { map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { Injectable } from "@angular/core";
import { RegisterRequestInterface } from "../../../containers/auth/types/registerRequest.interface";
import { LoginRequestInterface } from "../../../containers/auth/types/loginRequest.interface";

@Injectable({
    providedIn: 'root',
  })
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user';
    return this.http
      .get<AuthResponseInterface>(url)
      .pipe(map(this.getUser));
  
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

}
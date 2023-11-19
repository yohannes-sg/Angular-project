import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export type SIGNIN_REQUEST = { "email": string, "password": string }
export type SIGNIN_RESPONSE = { "success": boolean, "data": string }
export type SIGNUP_REQUEST = { "fullname": string, "email": string, "password": string }
export type SIGNUP_RESPONSE = { "success": boolean, "data": { _id: string, fullname: string, email: string, password: string } }

export type JWT =
  {
    "_id": string,
    "fullname": string,
    "email": string
    "jwt": string
  }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #apiUrl = 'http://localhost:3000';
  #notification = inject(ToastrService)
  state_signal = signal({ _id: '', fullname: '', email: '', jwt: '' })
  #loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  #http = inject(HttpClient)

  login(credentials: SIGNIN_REQUEST): Observable<SIGNIN_RESPONSE> {
    return this.#http.post<SIGNIN_RESPONSE>(`${this.#apiUrl}/users/signin`, credentials).pipe(
      catchError((error: HttpErrorResponse) => {
        this.#notification.error(' please try again')
        return throwError(error);
      })
    );
  }

  signup(userInfo: SIGNUP_REQUEST): Observable<SIGNUP_RESPONSE> {
    return this.#http.post<SIGNUP_RESPONSE>(`${this.#apiUrl}/users/signup`, userInfo).pipe(
      catchError((error: HttpErrorResponse) => {
        this.#notification.error('there is an account with this email please try other email')
        return throwError(error);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.state_signal().jwt);
    this.#loggedIn.next(false);
  }

  getToken() {
    return localStorage.getItem(this.state_signal().jwt);
  }

  isLoggedIn() {
    return this.state_signal().jwt ? true : false;
  }

 hasToken() {
    return !!localStorage.getItem(this.state_signal().jwt);
  }
}

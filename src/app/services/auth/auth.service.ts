import { Injectable } from '@angular/core';
import {
  getItem,
  getRefreshToken, LSK_IS_LOGGED,
  setIsAdmin,
  setItem,
  setRefreshToken,
  setToken
} from '../../utils/local-storage-utils';
import {endPoint, KEY_X_AUTH_TOKEN, KEY_X_REFRESH_TOKEN, REFRESH_TOKEN_API} from '../../constants/api-constants';
import {RouteConstants} from '../../constants/route-constants';
import {Router} from '@angular/router';
import {HttpService} from '../network/http/http.service';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean>;

  constructor(private router: Router,private http: HttpClient,private httpService: HttpService) {
    this.loggedIn = new BehaviorSubject<boolean>(
      !!localStorage.getItem(LSK_IS_LOGGED)
    );
  }

  setLoggedInVal() {
    if (localStorage.getItem(LSK_IS_LOGGED) === 'true') {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}token/`, { email, password }).pipe(
      tap((response: any) => {
        this.setMainToken(response.access, response.refresh);
        this.setIsLoggedValue(); // Mark as logged in
        this.router.navigate([RouteConstants.PROFILE]); // Redirect after login
      }),
      catchError((error) => {
        return throwError(error.error?.message || 'Login failed');
      })
    );
  }

  setIsLoggedValue() {
    setItem(LSK_IS_LOGGED, 'true')
  }
  private apiUrl = 'http://bank.mcceducare.com/api/';

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup/`, userData);
  }
  isLoggedIn() {
    return !!getItem(LSK_IS_LOGGED);
  }

  logOut() {
    localStorage.clear();
    this.router.navigate([RouteConstants.LOGIN], { replaceUrl: true });
  }

  setMainToken(token: any, refreshToken: any) {
    setToken(token);
    setRefreshToken(refreshToken);
  }


  clearStorage() {
    localStorage.clear();
  }

  clearSessionStorage() {
    sessionStorage.clear();
  }

  refreshToken() {
    const refresh = getRefreshToken();
    if (!refresh) {
      this.logOut();
      return throwError('No refresh token available');
    }

    return this.http.post(`${this.apiUrl}token/refresh/`, { refresh }).pipe(
      tap((response: any) => {
        this.onTokenChange(response.access, refresh);
      }),
      catchError(() => {
        this.logOut();
        return throwError('Session expired, please log in again');
      })
    );
  }


  onTokenChange(token: any, refreshToken: any,) {
    this.setMainToken(token, refreshToken)
  }
}

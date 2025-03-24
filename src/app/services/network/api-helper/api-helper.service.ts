import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/'; // ← Update with your API URL
  private tokenKey = 'access_token';
  private userSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.tokenKey);
    this.userSubject = new BehaviorSubject<any>(token);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token/`, { email, password })
      .pipe(tap(response => {
        localStorage.setItem(this.tokenKey, response.access);
        // Optionally store refresh token if needed
        this.userSubject.next(response.access);
      }));
  }

  signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup/`, data);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserObservable(): Observable<any> {
    return this.userSubject.asObservable();
  }
  refreshToken(): Observable<any> {
    const refresh = localStorage.getItem('refresh_token'); // Retrieve refresh token

    if (!refresh) {
      this.logout(); // Logout user if no refresh token is found
      return new Observable(observer => observer.error('No refresh token available'));
    }

    return this.http.post<any>(`${this.apiUrl}token/refresh/`, { refresh }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.access); // Update access token
        this.userSubject.next(response.access);
      })
    );


  }


  getProfile(): Observable<any> {
    const token = this.getToken(); // Retrieve token from localStorage

    if (!token) {
      throw new Error('No access token found'); // Prevent unauthorized request
    }

    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return this.http.get<any>(`${this.apiUrl}profile/`, { headers });
  }

  transferMoney(data: any): Observable<any> {
    const token = this.getToken(); // Retrieve token from localStorage

    if (!token) {
      throw new Error('No access token found'); // Prevent unauthorized request
    }

    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return this.http.post(`${this.apiUrl}transfer/`, data, { headers });
  }

  getTransactions(): Observable<any> {
    const token = this.getToken(); // Retrieve token from localStorage

    if (!token) {
      throw new Error('No access token found'); // Prevent unauthorized request
    }

    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.get<any>(`${this.apiUrl}transactions/`, { headers });
  }

}

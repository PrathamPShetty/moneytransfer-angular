import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://89.233.104.140:7500/api/'; // ← Update with your API URL
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

  // To refresh balance or get profile details
  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile/`);
  }
}

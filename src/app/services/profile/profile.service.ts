import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://127.0.0.1:8000/api/profile/';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateProfile(updatedData: any): Observable<any> {
    return this.http.patch(this.apiUrl, updatedData);
  }
}

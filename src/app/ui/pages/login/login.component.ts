import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    MatProgressSpinner,
    MatLabel
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';

    this.http.post('http://bank.mcceducare.com/api/token/', {
      email: this.email,
      password: this.password
    }).subscribe(
      (response: any) => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        this.router.navigate(['/profile']);  // Redirect after successful login
      },
      (error) => {
        this.errorMessage = 'Invalid email or password';
        this.loading = false;
      }
    );
  }
  onForgotPassword() {
    // Navigate to forgot password page or trigger reset logic
    this.router.navigate(['/forgot-password']);
  }

}

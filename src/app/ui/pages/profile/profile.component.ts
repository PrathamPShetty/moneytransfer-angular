import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-profile',
    imports: [
        MatCard,
        MatIcon,
        MatCardContent,
        CurrencyPipe,
        MatIconButton,
        MatCardModule,
        MatIconModule,
        MatButton,
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user = {
    name: 'John Doe',
    phone: '+91 9876543210',
    walletId: '12345678',
    balance: 100000,
    profilePic: ''
  };
  showBalance = false;
  constructor(private router: Router) {}
  toggleBalance() {
    this.showBalance = !this.showBalance;
  }

  uploadProfilePicture(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.profilePic = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  navigateTo(page: string): void {
    this.router.navigate([`/${page}`]);
  }

  openSetPinDialog() {
    console.log('Opening Set PIN Dialog');
  }
}

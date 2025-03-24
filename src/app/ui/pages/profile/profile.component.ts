import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {ProfileService} from '../../../services/profile/profile.service';
import {AuthService} from '../../../services/network/api-helper/api-helper.service';

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

  user: any = {
    name: '',
    phone: '',
    walletId: '',
    balance: 0,
    profilePic: ''
  };

  showBalance = false;
  constructor(private router: Router,private authService: AuthService) {}
  ngOnInit(): void {
    this.fetchProfile();
  }
  toggleBalance() {
    this.showBalance = !this.showBalance;
  }

  fetchProfile(): void {
    this.authService.getProfile().subscribe(
      (data) => {
        this.user = data.data;
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }

  navigateTo(page: string): void {
    this.router.navigate([`/${page}`]);
  }

  openSetPinDialog() {
    console.log('Opening Set PIN Dialog');
  }
}

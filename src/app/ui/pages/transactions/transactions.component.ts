import { Component, OnInit } from '@angular/core';

import {DatePipe, NgClass, TitleCasePipe} from '@angular/common';
import {AuthService} from '../../../services/network/api-helper/api-helper.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  imports: [
    TitleCasePipe,
    NgClass,
    DatePipe
  ],
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  userWallet: string = ''; // Replace with actual user wallet ID from authentication

  constructor( private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.authService.getTransactions().subscribe(
      (data: { data: any[]; }) => {
        this.transactions = data.data; // Assuming formatted_response() wraps data in a "data" key
      },
      (error: any) => {
        console.error('Error fetching transactions', error);
      }
    );
  }
}

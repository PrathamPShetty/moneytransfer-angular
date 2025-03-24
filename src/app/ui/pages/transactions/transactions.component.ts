import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {DatePipe, DecimalPipe, NgClass, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [

    NgClass,

    DatePipe,
    TitleCasePipe
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  transactions: any[] = [];
  userWallet: string = '12345678'; // Dummy logged-in user wallet ID

  constructor() {}

  ngOnInit(): void {
    this.loadDummyTransactions();
  }

  loadDummyTransactions(): void {
    this.transactions = [
      {
        sender_wallet: '12345678',
        receiver_wallet: '87654321',
        amount: 2500,
        timestamp: '2025-03-16T14:30:00',
        status: 'success'
      },
      {
        sender_wallet: '87654321',
        receiver_wallet: '12345678',
        amount: 5000,
        timestamp: '2025-03-15T10:15:00',
        status: 'success'
      },
      {
        sender_wallet: '12345678',
        receiver_wallet: '56781234',
        amount: 1200,
        timestamp: '2025-03-14T08:45:00',
        status: 'failed'
      },
      {
        sender_wallet: '99998888',
        receiver_wallet: '12345678',
        amount: 3000,
        timestamp: '2025-03-13T19:10:00',
        status: 'success'
      },
      {
        sender_wallet: '12345678',
        receiver_wallet: '44445555',
        amount: 800,
        timestamp: '2025-03-12T12:00:00',
        status: 'success'
      }
    ];
  }
}

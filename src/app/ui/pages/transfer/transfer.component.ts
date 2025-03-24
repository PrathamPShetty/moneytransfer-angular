import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DatePipe} from '@angular/common';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-transfer',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    MatLabel,
    MatError,
    DatePipe
  ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent {
  balance: number = 5000;
  recipientId: string = '';
  amount: number = 0;
  pin: string = '';
  transactionSuccess: boolean = false;
  todayDate: Date = new Date();
  screenshotDataUrl: string | null = null;
  @ViewChild('screenshotTarget', { static: false }) screenshotTarget!: ElementRef;


  constructor(private snackBar: MatSnackBar) {}

  transferMoney() {
    if (!/^\d{8}$/.test(this.recipientId)) {
      this.snackBar.open("Invalid Wallet ID. It must be exactly 8 digits.", "Close", { duration: 3000 });
      return;
    }

    if (!/^\d{4}$/.test(this.pin)) {
      this.snackBar.open("Invalid PIN. It must be exactly 4 digits.", "Close", { duration: 3000 });
      return;
    }

    this.snackBar.open(`₹${this.amount} transferred to Wallet ID: ${this.recipientId}`, "Close", { duration: 3000 });

    this.transactionSuccess = true;
    this.captureScreenshot()// Give some time for UI to render
  }

  captureScreenshot() {
    setTimeout(() => {
      html2canvas(this.screenshotTarget.nativeElement).then(canvas => {
        this.screenshotDataUrl = canvas.toDataURL('image/png');
      });
    }, 500);
  }

  shareScreenshot(option: string) {
    if (!this.screenshotDataUrl) return;

    if (option === 'email') {
      window.location.href = `mailto:?subject=Transaction Receipt&body=See the attached screenshot.&attachment=${this.screenshotDataUrl}`;
    } else if (option === 'whatsapp') {
      const whatsappUrl = `https://api.whatsapp.com/send?text=Transaction successful! See receipt: ${this.screenshotDataUrl}`;
      window.open(whatsappUrl, '_blank');
    }
  }

  closeOverlay() {
    this.transactionSuccess = false;
  }
}

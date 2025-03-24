import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  openSnack(message: string, actionText = 'OK', duration = 5000) {
    this.snackbar.open(message, actionText, {
      duration: duration
    })
  }
}

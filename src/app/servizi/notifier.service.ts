import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from '../notifier/notifier.component';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(
    message: string,
    action: string,
    messageType: 'error' | 'success'
  ) {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: message,
        action: action,
        type: messageType,
      },
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: messageType,
    });
  }
}

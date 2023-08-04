import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  MatSnackBarHorizontalPosition: MatSnackBarHorizontalPosition = 'center';
  matSnachBarVerticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(
    message: string,
    timeout: number,
    callback: any = null
  ): void {
    this.snackBar
      .open(message, '', {
        horizontalPosition: this.MatSnackBarHorizontalPosition,
        verticalPosition: this.matSnachBarVerticalPosition,
        panelClass: ['snackbar'],
        duration: timeout,
      })
      .afterDismissed()
      .subscribe(() => {
        callback();
      });
  }
}

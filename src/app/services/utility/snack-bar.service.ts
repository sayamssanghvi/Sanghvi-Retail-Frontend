import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { LanguagePipe } from 'src/app/pipes/language.pipe';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  MatSnackBarHorizontalPosition: MatSnackBarHorizontalPosition = 'center';
  matSnachBarVerticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private language: LanguagePipe) {}

  public openSnackBar(
    message: string,
    timeout: number,
    callback: any = null
  ): void {
    message = this.language.transform(message);
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

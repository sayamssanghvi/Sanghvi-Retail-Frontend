import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormConstants } from './../../shared/constants/formconstants';
import { Actions } from 'src/app/shared/constants/actions';
import { SnackBarService } from 'src/app/services/utility/snack-bar.service';
import { Messages } from 'src/app/shared/constants/messages';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css'],
})
export class DiscountComponent implements OnInit {
  //Global Variables
  public formConstants: FormConstants = new FormConstants();
  public actions: Actions = new Actions();
  public discount: number = 0;
  public reason: string = '';
  public messages: Messages = new Messages();
  constructor(
    public dialogRef: MatDialogRef<DiscountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBarService: SnackBarService,
  ) {}

  ngOnInit(): void {}

  onConfirm(): void {
    if (this.reason == '') {
      this.snackBarService.openSnackBar(this.messages.ENETR_A_REASON, 1000);
      return;
    }

    this.dialogRef.close({
      action: this.actions.CONFIRM,
      discount: this.discount,
      reason: this.reason,
    });
  }
}

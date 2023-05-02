import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions } from 'src/app/shared/constants/actions';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  public actions:Actions=new Actions();
  constructor(
    public dialogRef:MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {
    }

  ngOnInit(): void {
  }

  onConfirm():void{
    this.dialogRef.close({action:this.actions.CONFIRM});
  }

  onCancel():void{
    this.dialogRef.close({action:this.actions.CANCEL});
  }
}

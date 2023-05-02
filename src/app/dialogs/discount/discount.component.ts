import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormConstants } from './../../shared/constants/formconstants';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {

  //Global Variables
  public formConstants: FormConstants = new FormConstants();

  constructor(public dialogRef:MatDialogRef<DiscountComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}

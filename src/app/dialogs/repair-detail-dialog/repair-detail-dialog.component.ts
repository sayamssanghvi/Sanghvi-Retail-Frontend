import { RepairMachineStatus } from './../../shared/constants/repairMachineStatus';
import { FormConstants } from './../../shared/constants/formconstants';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiscountComponent } from '../discount/discount.component';
import { TooltipPosition } from '@angular/material/tooltip';
import { Dates } from 'src/app/shared/constants/dates';
import { Parts } from 'src/app/shared/models/parts.model';

@Component({
  selector: 'app-repair-detail-dialog',
  templateUrl: './repair-detail-dialog.component.html',
  styleUrls: ['./repair-detail-dialog.component.css']
})
export class RepairDetailDialogComponent implements OnInit {

  //Global Variables
  name: string = "Sahil the CA of the Year";
  machineRepairCode: string = "3R22";
  receivedDate: number = Date.now();
  dates: any = [];
  nextStatus: number[] = [];
  //Class
  repairMachineStatusList: string[] = new RepairMachineStatus().repairMachineStatusList;
  public formConstants: FormConstants = new FormConstants();
  public date: Dates = new Dates();
  public parts: any;

  //Helpers
  public matToolTipPosition: TooltipPosition[] = ['above', 'below', 'after', 'right'];

  constructor(private discountDialog: MatDialog,
    public dialogRef: MatDialogRef<RepairDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.setDateObjectAndStatusLevel();
    this.setParts();
  }

  DiscountClick(): void {
    this.discountDialog.open(DiscountComponent, {
      data: this.machineRepairCode,
      width: '318px',
      height: '260px',
      panelClass: 'custom-mat-dailog'
    })
  }

  setDateObjectAndStatusLevel(): void {
    for (let dateName in this.data.date) {
      let newDateObj = {
        dateName: this.date.DateNames.get(dateName),
        time: this.data.date[dateName]
      };
      if (newDateObj.dateName != undefined)
        this.dates.push(newDateObj);
    }
  }

  setParts(): void{
    this.parts = new Parts(this.data.repairs).parts;
  }

}

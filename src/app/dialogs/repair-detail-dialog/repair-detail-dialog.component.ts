import { RepairMachineStatus } from './../../shared/constants/repairMachineStatus';
import { FormConstants } from './../../shared/constants/formconstants';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DiscountComponent } from '../discount/discount.component';
import { TooltipPosition } from '@angular/material/tooltip';
import { Dates } from 'src/app/shared/constants/dates';
import { Parts } from 'src/app/shared/models/parts.model';
import { Actions } from 'src/app/shared/constants/actions';
import { RepairService } from 'src/app/services/api/repair.service';
import { DATE_NAMES } from 'src/app/shared/constants/appConstants';
import { SnackBarService } from 'src/app/services/utility/snack-bar.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {
  Messages,
  CONFIRM_TO_DELIVER_TO_CUSTOMER,
  CONFIRM_TO_SEND_TO_FACTORY,
  MACHINE_SENT_TO_FACTORY,
  CONFIRM_TO_APPROVE_ESTIMATE,
  ESTIMATE_APPROVED,
  DISCOUNT_ADDED,
} from 'src/app/shared/constants/messages';

@Component({
  selector: 'app-repair-detail-dialog',
  templateUrl: './repair-detail-dialog.component.html',
  styleUrls: ['./repair-detail-dialog.component.css'],
})
export class RepairDetailDialogComponent implements OnInit {
  //Global Variables
  customerName: string;
  machineRepairCode: string;
  receivedDate: number;
  dates: any = [];
  nextStatus: number[] = [];
  grandTotal: number = 0;
  discount: number = 0;
  totalAmount: number = 0;
  //Class
  repairMachineStatusList: string[] = new RepairMachineStatus()
    .repairMachineStatusList;
  repairMachineStatus: RepairMachineStatus = new RepairMachineStatus();
  public formConstants: FormConstants = new FormConstants();
  public messages: Messages = new Messages();
  public date: Dates = new Dates();
  public parts: any;

  //Helpers
  public matToolTipPosition: TooltipPosition[] = [
    'above',
    'below',
    'after',
    'right',
  ];
  public actions: Actions = new Actions();

  constructor(
    private discountDialog: MatDialog,
    public dialogRef: MatDialogRef<RepairDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private repairService: RepairService,
    private snackBar: SnackBarService,
    private confirmDialog: MatDialog
  ) {
    console.log(this.data);
  }

  ngOnInit(): void {
    this.setBaseInformation();
    this.setDateObjectAndStatusLevel();
    this.setParts();
  }

  DiscountClick(): void {
    this.discountDialog
      .open(DiscountComponent, {
        data: this.machineRepairCode,
        width: '318px',
        height: '260px',
        panelClass: 'custom-mat-dailog',
      })
      .afterClosed()
      .subscribe((data) => {
        console.log(data);
        if (data.action == this.actions.CONFIRM) {
          console.log('Entered');
          let payload = {
            machineRepairCode: this.machineRepairCode,
            discount: {
              amount: data.discount,
              reason: data.reason,
            },
          };
          this.repairService
            .addDiscountToRepairMachine(payload)
            .subscribe((data) => {
              console.log(data);
              this.discount = payload.discount.amount;
              this.grandTotal -= this.discount;

              this.snackBar.openSnackBar(DISCOUNT_ADDED, 3000);
            });
        }
      });
  }

  setDateObjectAndStatusLevel(): void {
    for (let dateName in this.data.date) {
      let newDateObj = {
        dateName: this.date.DateNames.get(dateName),
        time: this.data.date[dateName],
      };

      if (newDateObj.dateName == DATE_NAMES.RECEIVEDDATE) {
        this.receivedDate = newDateObj.time;
      }

      if (newDateObj.dateName != undefined) this.dates.push(newDateObj);
    }
  }

  setParts(): void {
    this.parts = new Parts(this.data.repairs).parts;
  }

  setBaseInformation(): void {
    this.machineRepairCode = this.data.machineRepairCode;
    this.customerName = this.data.customerName;
    if (this.data.totalAmount != undefined) {
      this.grandTotal = this.data.totalAmount;
      this.totalAmount = this.data.totalAmount;
    }
    if (this.data.discount != undefined) {
      this.discount = this.data.discount.amount;
      this.grandTotal -= this.discount;
    }
  }

  deliverToCustomerOrFactory(): void {
    let status = this.repairMachineStatus.DELIVERED;
    let confirmMessage = CONFIRM_TO_DELIVER_TO_CUSTOMER;
    let snackBarMessage = this.messages.DELIVERED_TO_CUSTOMER;

    if (this.data.status == this.repairMachineStatus.IN_REPAIR) {
      status = this.repairMachineStatus.IN_FACTORY;
      confirmMessage = CONFIRM_TO_SEND_TO_FACTORY;
      snackBarMessage = MACHINE_SENT_TO_FACTORY;
    } else if (
      this.data.status == this.repairMachineStatus.ESTIMATE_SUBMITTED
    ) {
      status = this.repairMachineStatus.ESTIMATE_APPROVED;
      confirmMessage = CONFIRM_TO_APPROVE_ESTIMATE;
      snackBarMessage = ESTIMATE_APPROVED;
    }

    let payload = {
      machineRepairCode: this.machineRepairCode,
      status,
    };

    this.confirmDialog
      .open(ConfirmDialogComponent, {
        data: {
          action: 'deliverToCustomer',
          message: confirmMessage,
          button: [this.actions.CONFIRM, this.actions.CANCEL],
        },
        width: '320px',
        height: '200px',
        panelClass: 'custom-dialog-light',
      })
      .afterClosed()
      .subscribe((data: any) => {
        console.log(data);
        if (data.action == this.actions.CONFIRM) {
          this.repairService.changeStatusOfRepairMachine(payload).subscribe(
            (res) => {
              this.data = res;
              // this.data.status = status;
              this.snackBar.openSnackBar(snackBarMessage, 3000);
            },
            (error) => {
              console.log(error);
              this.snackBar.openSnackBar(error.error.error, 7000);
            }
          );
        }
      });
  }
}

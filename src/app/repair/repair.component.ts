import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { RepairService } from '../services/api/repair.service';
import { Actions } from '../shared/constants/actions';
import {
  ESTIMATE_NOT_APPROVED,
  ESTIMATE_SUBMITTED,
  GIVE_ESTIMATE,
  Messages,
} from '../shared/constants/messages';
import { RepairMachineStatus } from '../shared/constants/repairMachineStatus';
import { SnackBarService } from '../services/utility/snack-bar.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css'],
})
export class RepairComponent implements OnInit {
  screenHeight: number = 0;
  screenWidth: number = 0;
  errors: string = '';
  repairSale: any;
  isFetchPartSuccess: boolean = false;
  parts: any = [];
  machineRepairCode: string = '';
  isSubmitEstimate: boolean = false;
  MatSnackBarHorizontalPosition: MatSnackBarHorizontalPosition = 'center';
  matSnachBarVerticalPosition: MatSnackBarVerticalPosition = 'top';
  public actions: Actions = new Actions();
  public messages: Messages = new Messages();
  public status: RepairMachineStatus = new RepairMachineStatus();
  public estimateMessage: string = GIVE_ESTIMATE;

  constructor(
    private repairService: RepairService,
    private snackBar: MatSnackBar,
    private confirmDialog: MatDialog,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  fetchMachineParts(): any {
    if (_.isEmpty(this.machineRepairCode))
      return (this.errors = 'Please enter a MachineCode');

    let body = { machineRepairCode: this.machineRepairCode.toUpperCase() };

    this.repairService.fetchRepairMachineParts(body).subscribe(
      (res) => {
        this.repairSale = res.data.repairSale;

        if (this.repairSale.status == this.status.ESTIMATE_SUBMITTED) {
          this.errors = ESTIMATE_NOT_APPROVED;
        }

        if (this.repairSale.status == this.status.RECEIVED && this.repairSale.callBeforeRepair) {
          this.isSubmitEstimate = true;
        }

        if (
          this.repairSale.status != this.status.ESTIMATE_SUBMITTED ||
          !this.repairSale.callBeforeRepair
        ) {
          this.isFetchPartSuccess = true;
          this.parts = res.data.parts;

          _.set(body, 'status', this.status.IN_REPAIR);

          this.repairService.changeStatusOfRepairMachine(body).subscribe(
            (res: any) => {
              console.log(res);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        this.isFetchPartSuccess = false;
        console.log(error);
        this.errors = error.error.error;
      }
    );
  }

  submitParts() {
    let repairParts: any[] = [];
    let payload = {
      machineRepairCode: this.machineRepairCode,
      repairParts,
    };
    for (let part of this.parts) {
      if (part.check) {
        if (part.quantity > part.maxQuantity && part.quantityRequired)
          return this.snackBarService.openSnackBar(
            `Max Quantity of ${part.name} cannot be more than ${part.maxQuantity}`,
            3000
          );
        payload.repairParts.push({
          name: part.name,
          quantity: part.quantity,
          _id: part._id,
        });
      }
    }

    console.log(repairParts);

    if (_.isEmpty(repairParts))
      return this.snackBarService.openSnackBar(
        'Please select a part before submitting',
        3000
      );

    this.confirmDialog
      .open(ConfirmDialogComponent, {
        data: {
          action: 'submitRepairParts',
          message: 'Are you sure you want to submit parts?',
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
          this.repairService.submitRepairParts(payload).subscribe(
            (res) => {
              console.log(res);
              let message = this.messages.PARTS_SUBMITTED.replace(
                '{{machineRepairCode}}',
                this.machineRepairCode
              );
              this.snackBarService.openSnackBar(message, 7000);
              this.ngOnInit();
            },
            (error) => {
              console.log(error);
              this.snackBarService.openSnackBar(error.error.error, 7000);
            }
          );

          let message = this.messages.PARTS_SUBMITTED.replace(
            '{{machineRepairCode}}',
            this.machineRepairCode
          );

          if (this.isSubmitEstimate) {
            message = ESTIMATE_SUBMITTED;
          }

          this.snackBarService.openSnackBar(message, 3000, () => {
            this.isFetchPartSuccess = false;
            this.parts = [];
            this.machineRepairCode = '';
            console.log('Reset');
          });
          this.isSubmitEstimate = false;
        }
      });
  }

  onInputFocus() {
    this.errors = '';
  }

  onSelectPart(part: any) {
    part.check = !part.check;
  }

  

  //Opens SnackBar
  private openSnackBar(
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

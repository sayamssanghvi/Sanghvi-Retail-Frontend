import { RepairDetailDialogComponent } from './../../dialogs/repair-detail-dialog/repair-detail-dialog.component';
import { RepairMachineStatus } from './../../shared/constants/repairMachineStatus';
import { Messages } from './../../shared/constants/messages';
import { FormControl } from '@angular/forms';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/api/customer.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-previous-sales',
  templateUrl: './previous-sales.component.html',
  styleUrls: ['./previous-sales.component.css']
})
export class PreviousSalesComponent implements OnInit {

  public sales: any[] = [];
  public repairSales: any[] = [];
  public phoneNumber: FormControl;
  public buttonClick: boolean = false;
  private MatSnackBarHorizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private matSnachBarVerticalPosition: MatSnackBarVerticalPosition = 'bottom';

  public messages: Messages = new Messages();
  public repairStatus: RepairMachineStatus = new RepairMachineStatus();

  @ViewChild('salesButton') salesButton: ElementRef;
  @ViewChild('repairButton') repairButton: ElementRef;

  constructor(private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private renderer: Renderer2,
    private repairDialog: MatDialog) {
    this.phoneNumber = new FormControl();
  }

  ngOnInit(): void {
  }

  //Get Sales Button Click
  GetSales(): void {
    if (!this.validation())
      return;

    this.disableButtons();
    this.repairSales = [];
    let options = { sort: 'createdAt', order: 'desc' };
    this.customerService.GetSalesByPhoneNumber(this.phoneNumber.value, options).subscribe((res: any) => {
      if (res.status == 1)
        this.sales = res.sales;
    }, (error: any) => {
      console.log(error);
      if (error.status >= 400)
        this.openSnackBar(error.error.error, 5000);
      if (error.status >= 500)
        this.openSnackBar(error.error.error, 5000);
    }).add(() => {
      this.enableButtons();
    });
  }

  //Get Repair Machines Button Click
  GetRepairSales(): void {
    if (!this.validation())
      return;

    this.disableButtons();
    this.sales = [];
    let options = { sort: 'createdAt', order: 'desc' };
    this.customerService.GetRepairMachineByPhoneNumber(this.phoneNumber.value, options).subscribe((res: any) => {
      if (res.status == 1)
        this.repairSales = res.repairSales;
    }, (error: any) => {
      console.log(error);
      if (error.status >= 400)
        this.openSnackBar(error.error.error, 5000);
      if (error.status >= 500)
        this.openSnackBar(error.error.error, 5000);
    }).add(() => {
      this.enableButtons();
    });
  }

  //When the user wants to open a particular record of Sales
  OnSaleClick(sale: any): void {
  }

  OnRepairClick(repair: any): void {
    this.repairDialog.open(RepairDetailDialogComponent, {
      data: repair,
      width: '1000px',
      height: '400px',
      panelClass: 'custom-mat-dailog'
    });

    this.repairDialog.afterAllClosed.subscribe((data) => {
    })
  }
  //PhoneNumber Validation
  private validation(): boolean {
    if (this.phoneNumber.untouched || this.phoneNumber.pristine || this.phoneNumber.value.length == 0) {
      this.openSnackBar(this.messages.ENTER_PHNO, 2000);
      return false;
    } else if (this.phoneNumber.value.length != 10) {
      this.openSnackBar(this.messages.ENTER_CORRECT_PHNO, 2000);
      return false;
    }
    return true;
  }

  //Opens SnackBar
  private openSnackBar(message: string, timeout: number): void {
    this.snackBar.open(message, '', {
      horizontalPosition: this.MatSnackBarHorizontalPosition,
      verticalPosition: this.matSnachBarVerticalPosition,
      panelClass: ['snackbar']
    })._dismissAfter(timeout);
  }

  //Disable the Buttons
  private disableButtons(): void {
    this.renderer.setProperty(this.salesButton.nativeElement, 'disabled', true);
    this.renderer.setProperty(this.repairButton.nativeElement, 'disabled', true);
  }

  //Enable the Buttons
  private enableButtons(): void {
    this.renderer.setProperty(this.salesButton.nativeElement, 'disabled', false);
    this.renderer.setProperty(this.repairButton.nativeElement, 'disabled', false);
  }
}

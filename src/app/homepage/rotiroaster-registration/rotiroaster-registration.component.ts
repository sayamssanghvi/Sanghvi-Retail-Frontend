import { FaultsRR } from '../../shared/models/faults.models';
import { Messages } from '../../shared/constants/messages';
import { CustomerService } from './../../services/api/customer.service';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Actions } from 'src/app/shared/constants/actions';

@Component({
  selector: 'app-rotiroaster-registration',
  templateUrl: './rotiroaster-registration.component.html',
  styleUrls: ['./rotiroaster-registration.component.css']
})
export class RotiroasterRegistrationComponent implements OnInit, AfterViewInit {

  public problems = new FaultsRR();
  private messages: Messages = new Messages();
  private actions: Actions = new Actions();
  public problemDivHeight: number;
  public formGroup: any;

  public MatSnackBarHorizontalPosition: MatSnackBarHorizontalPosition = 'center';
  public matSnachBarVerticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('rightColumn') public rightColumn: ElementRef;
  @ViewChild('submitButton') submitButton: ElementRef;
  @ViewChild('callBeforeRepairCheckBox') callBeforeRepairChk: ElementRef;
  constructor(private snackBar: MatSnackBar, private customerService: CustomerService, private renderer: Renderer2) {
    this.formGroup = new FormGroup({
      phoneNumber: new FormControl(),
      rCode: new FormControl(),
      callBeforeRepair: new FormControl()
    });
    this.formGroup.controls["rCode"].disable();
    this.formGroup.controls["callBeforeRepair"].setValue(false);
  }

  ngOnInit(): void {
    this.problemDivHeight = 240;
  }

  ngAfterViewInit(): void {
    this.problemDivHeight = this.rightColumn.nativeElement.offsetHeight;
  }

  //Generade machineRepair Code(On click of generate Code Button)
  GenerateCodeClick(event: MouseEvent): void {
    if (this.codeValidationFailed())
      return;

    this.renderer.setProperty(this.submitButton.nativeElement, 'disabled', true);
    this.renderer.setProperty(this.submitButton.nativeElement, 'innerHTML', this.actions.GENERATING_CODE);
    this.customerService.RegisterRepairMachine(this.rrRegisterPayload()).subscribe((res: any) => {
      this.formGroup.controls["rCode"].setValue(res.data.machineRepairCode);
      this.formGroup.reset({
        rCode: res.data.machineRepairCode
      });
      this.formGroup.controls["callBeforeRepair"].setValue(false);
      this.problems = new FaultsRR();
    }, (error: any) => {
      console.log(error);
      if (error.status == 400 || error.status == 401)
        this.openSnackBar(error.error.error, 5000);
      if (error.status == 500)
        this.openSnackBar(this.messages.SERVER_ERROR, 5000);
    }).add(() => {
      this.renderer.setProperty(this.submitButton.nativeElement, 'disabled', false);

      this.renderer.setProperty(this.submitButton.nativeElement, 'innerHTML', this.actions.GENERATE_CODE);
    });
  }

  //Select and Deselect a problem
  OnProblemClick(problem: any): void {
    this.problems.faults.set(problem, !this.problems.faults.get(problem));
  }

  callBeforeRepairSelect(): void {
    this.formGroup.controls["callBeforeRepair"].setValue(!this.formGroup.controls["callBeforeRepair"].value);
  }

  //Validation for the inputs and checkBox
  private codeValidationFailed(): Boolean {
    if (this.formGroup.controls["phoneNumber"].pristine) {
      this.openSnackBar(this.messages.ENTER_PHNO_TO_GENERATE_CODE, 5000);
      return true;
    } else if (this.formGroup.controls["phoneNumber"].value.length != 10 ||
      !(/^\d{10}$/.test(this.formGroup.controls["phoneNumber"].value))) {
      this.openSnackBar(this.messages.ENTER_CORRECT_PHNO, 5000);
      this.formGroup.controls["phoneNumber"].reset();
      return true;
    }
    let notSelected = true;
    this.problems.faults.forEach((value, key) => {
      if (value)
        notSelected = false;
    });
    if (notSelected) {
      this.openSnackBar(this.messages.FAULT_SELECTION, 5000);
      return true;
    }
    return false;
  }

  //Opens SnackBar
  private openSnackBar(message: string, timeout: number): void {
    this.snackBar.open(message, '', {
      horizontalPosition: this.MatSnackBarHorizontalPosition,
      verticalPosition: this.matSnachBarVerticalPosition,
      panelClass: ['snackbar']
    })._dismissAfter(timeout);
  }

  private rrRegisterPayload(): any {
    let faults: string[] = [];
    this.problems.faults.forEach((value, key) => {
      if (value)
        faults.push(key);
    });
    let payload = {
      faults,
      customer: this.formGroup.controls["phoneNumber"].value,
      callBeforeRepair: this.formGroup.controls["callBeforeRepair"].value
    };
    return payload;
  }

}

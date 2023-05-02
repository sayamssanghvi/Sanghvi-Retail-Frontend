import { Actions } from 'src/app/shared/constants/actions';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Messages } from '../../shared/constants/messages'
import { CustomerService } from 'src/app/services/api/customer.service';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {

  registerForm: FormGroup;
  private messages: Messages = new Messages();
  private actions: Actions = new Actions();

  public MatSnackBarHorizontalPosition: MatSnackBarHorizontalPosition = 'center';
  public matSnachBarVerticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('submitButton') submitButton: ElementRef;

  constructor(formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private renderer: Renderer2) {
    this.registerForm = formBuilder.group({
      customerName: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required, Validators.minLength(10), customValidation]],
      email: ["", [Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$")]]
    })
  }

  ngOnInit(): void {
  }

  RegisterCustomer(form: FormGroup) {
    if (this.registerForm.valid) {
      this.renderer.setProperty(this.submitButton.nativeElement, 'disabled', true);
      this.renderer.setProperty(this.submitButton.nativeElement, 'innerHTML', this.actions.SUBMITTING);
      console.log(this.getPayLoad())
      this.customerService.RegisterNewCustomer(this.getPayLoad()).subscribe((res: any) => {
        if (res.status == 1) {
          this.openSnackBar(this.messages.CUSTOMER_REGISTERED, 5000);
          this.registerForm.reset();
        }
      }, (error: any) => {
        console.log(error);
        if (error.status == 400 || error.status == 401)
          this.openSnackBar(error.error.error, 5000);
        if (error.status == 500)
          this.openSnackBar(this.messages.SERVER_ERROR, 5000);
      }).add(() => {
        this.renderer.setProperty(this.submitButton.nativeElement, 'disabled', false);

        this.renderer.setProperty(this.submitButton.nativeElement, 'innerHTML', this.actions.SUBMIT);
      });
    } else {
      if (this.registerForm.pristine && this.registerForm.untouched)
        this.openSnackBar(this.messages.ENTER_VALUES_BEFORE_SUBMITTING, 5000);
      else if (this.registerForm.touched)
        this.openSnackBar(this.messages.CLEAR_THE_ERRORS, 2000);
    }
  }

  //Opens SnackBar
  private openSnackBar(message: string, timeout: number): void {
    this.snackBar.open(message, '', {
      horizontalPosition: this.MatSnackBarHorizontalPosition,
      verticalPosition: this.matSnachBarVerticalPosition,
      panelClass: ['snackbar']
    })._dismissAfter(timeout);
  }

  getPayLoad(): any {
    if (this.registerForm.controls["email"].value != null &&     this.registerForm.controls["email"].value != undefined &&
      this.registerForm.controls["email"].value.length != 0) {
      return {
        name: this.registerForm.controls["customerName"].value,
        phonenumber: this.registerForm.controls["phoneNumber"].value,
        email: this.registerForm.controls["email"].value
      }
    } else {
      return {
        name: this.registerForm.controls["customerName"].value,
        phonenumber: this.registerForm.controls["phoneNumber"].value
      }
    }
  }
}

function customValidation(control: FormControl) {
  let regex = new RegExp("^[0-9]+$");
  let check = regex.test(control.value);
  if (!check)
    return {
      checkIfNumberOnly: {
        error: control.value
      }
    }
  else if (control.value.toString().length > 1 && control.value.toString().length != 10)
    return {
      minLength: {
        error: control.value
      }
    }
  else
    return null;
}

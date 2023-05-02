import { Messages } from './../../shared/constants/messages';
import { CustomerService } from './../../services/api/customer.service';
import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Actions } from 'src/app/shared/constants/actions';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.css']
})
export class AddSalesComponent implements OnInit {

  addSalesForm: FormGroup;
  private message: Messages = new Messages();
  private actions: Actions = new Actions();
  private MatSnackBarHorizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private matSnachBarVerticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('submitButton') submitButton: ElementRef;
    
  constructor(formBuilder: FormBuilder, private snackBar: MatSnackBar, private customerService: CustomerService,private renderer:Renderer2) {
    this.addSalesForm = formBuilder.group({
      productName: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required, Validators.minLength(10), customValidation]],
      price: ["", [Validators.required, Validators.pattern("^[0-9]+$")]]
    })
  }

  ngOnInit(): void {
  }

  AddSales(event:MouseEvent) {
    if (!this.addSalesForm.valid) {
      this.openSnackBar(this.message.CLEAR_THE_ERRORS, 2000);
    } else {
      this.renderer.setProperty(this.submitButton.nativeElement, 'disabled', true);
      this.renderer.setProperty(this.submitButton.nativeElement, 'innerHTML', this.actions.SUBMITTING);
      this.customerService.RegisterNewSale(this.getPayLoad()).subscribe((res: any) => {
        if (res.status == 1) {
          this.openSnackBar(this.message.SALE_REGISTERED + this.addSalesForm.controls['phoneNumber'].value, 5000);
          this.addSalesForm.reset();
        }
      }, (error: any) => {
        console.log(error);
        if (error.status == 400 || error.status == 401)
          this.openSnackBar(error.error.error, 5000);
        if (error.status == 500)
          this.openSnackBar(this.message.SERVER_ERROR, 5000);
      }).add(() => {
        this.renderer.setProperty(this.submitButton.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.submitButton.nativeElement, 'innerHTML', this.actions.SUBMIT);
      });
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

  //Prepares Payload To be sent
  private getPayLoad(): any {
    return {
      name: this.addSalesForm.get('productName')?.value,
      amount: this.addSalesForm.get('price')?.value,
      phonenumber: this.addSalesForm.get('phoneNumber')?.value,
    };
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

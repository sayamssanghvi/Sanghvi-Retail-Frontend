import { Router } from '@angular/router';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AdminService } from '../services/admin.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Messages } from '../shared/constants/messages';
import { Actions } from '../shared/constants/actions';
import { ROLE } from '../shared/constants/appConstants';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  title = 'Sanghvi Retail';
  loginForm: FormGroup;
  loginResponse: string = '';
  private messages: Messages = new Messages();
  private actions: Actions = new Actions();
  private MatSnackBarHorizontalPosition: MatSnackBarHorizontalPosition =
    'center';
  private matSnachBarVerticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild('submitButton') submitButton: ElementRef;

  constructor(
    formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private renderer: Renderer2,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = formBuilder.group({
      phonenumber: [
        '',
        [Validators.required, Validators.minLength(10), customValidation],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  SubmitForm(form: FormGroup) {
    this.renderer.setProperty(
      this.submitButton.nativeElement,
      'disabled',
      true
    );
    this.renderer.setProperty(
      this.submitButton.nativeElement,
      'innerHTML',
      this.actions.SIGNING_YOU_IN
    );
    this.adminService
      .setAdmin(this.getPayLoad())
      .subscribe(
        (response) => {
          console.log(response);
          if (response.valid) {
            if (response.role == ROLE.SERVICE) {
              console.log('Condition is a Success');
              this.router.navigate(['repair-retail']);
            }
            if (response.role == ROLE.ADMIN || response.role == ROLE.MANAGER)
              this.router.navigate(['dashboard']);
          } else {
            this.loginResponse = response.message;
            form.markAsPristine();
            form.markAsUntouched();
          }
        },
        (error) => {
          console.log(error.message);
        }
      )
      .add(() => {
        this.renderer.setProperty(
          this.submitButton.nativeElement,
          'disabled',
          false
        );
        this.renderer.setProperty(
          this.submitButton.nativeElement,
          'innerHTML',
          this.actions.SUBMIT
        );
      });
  }

  private getPayLoad(): any {
    return {
      phonenumber: this.loginForm.get('phonenumber')?.value,
      password: this.loginForm.get('password')?.value,
    };
  }

  private openSnackBar(message: string, timeout: number): void {
    this.snackBar
      .open(message, '', {
        horizontalPosition: this.MatSnackBarHorizontalPosition,
        verticalPosition: this.matSnachBarVerticalPosition,
        panelClass: ['snackbar'],
      })
      ._dismissAfter(timeout);
  }
}

function customValidation(control: FormControl) {
  let regex = new RegExp('^[0-9]+$');
  let check = regex.test(control.value);
  if (!check)
    return {
      checkIfNumberOnly: {
        error: control.value,
      },
    };
  else if (
    control.value.toString().length > 1 &&
    control.value.toString().length != 10
  )
    return {
      minLength: {
        error: control.value,
      },
    };
  else return null;
}

import { RouteMappingService } from './services/api/route.mapping.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { PlaygroundComponent } from './playground/playground.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavComponent } from './nav/nav.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { AddSalesComponent } from './homepage/add-sales/add-sales.component';
import { CustomerRegistrationComponent } from './homepage/customer-registration/customer-registration.component';
import { PreviousSalesComponent } from './homepage/previous-sales/previous-sales.component';
import { RotiroasterRegistrationComponent } from './homepage/rotiroaster-registration/rotiroaster-registration.component';
import { SelectColourSwitchDirective } from './directives/select.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './services/admin.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { StatusDirective } from './directives/status.directive';
import { RepairDetailDialogComponent } from './dialogs/repair-detail-dialog/repair-detail-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DiscountComponent } from './dialogs/discount/discount.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RepairComponent } from './repair/repair.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { SnackBarService } from './services/utility/snack-bar.service';
import { ListingComponent } from './dialogs/listing/listing.component';
import { LanguagePipe } from './pipes/language.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    PlaygroundComponent,
    HomepageComponent,
    NavComponent,
    DropdownDirective,
    AddSalesComponent,
    CustomerRegistrationComponent,
    PreviousSalesComponent,
    RotiroasterRegistrationComponent,
    SelectColourSwitchDirective,
    StatusDirective,
    RepairDetailDialogComponent,
    DiscountComponent,
    RepairComponent,
    ConfirmDialogComponent,
    ListingComponent,
    LanguagePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  providers: [
    RouteMappingService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AdminService,
    SnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

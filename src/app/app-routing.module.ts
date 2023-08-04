import { RepairComponent } from './repair/repair.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login', component: AdminLoginComponent
  },
  {
    path: 'dashboard', component: HomepageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'repair-retail', component: RepairComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: 'login' }
  // { path:"**", redirectTo:'dashboard'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

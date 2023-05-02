import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private adminService: AdminService, private router: Router) { }

  canActivate(): boolean {
    // if (!this.adminService.isAuthenticated()) {
    //   this.router.navigate(['login']);
    //   return false;
    // }
    return true;
  }

}

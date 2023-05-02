import { RouteMappingService } from './api/route.mapping.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public adminPhoneNumber: string;
  private jwtToken?: any = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmY5MjNlZDkyY2Y0NzRlZWNlMWRkMmYiLCJpYXQiOjE2Nzg2MTAxNzcsImV4cCI6MTY3ODY5NjU3N30.gxklBgelnvTflPRZGzGR9S92579uC0KIZ6yHnioAGvY';
  private responseObservable: Observable<any>;
  constructor(private http: HttpClient, 
    private routeMapping: RouteMappingService, 
    private jwtHelper: JwtHelperService) 
  {
    localStorage.setItem('authToken', this.jwtToken);
  }

  public setAdmin(payload: any): Observable<any> {
    let url = this.routeMapping.getAdminLoginUrl();

    this.responseObservable = new Observable((observer) => {
      let httpSubscription: Subscription = this.http.post(url, payload).subscribe((res: any) => {
        localStorage.setItem('authToken', res.token);
        this.jwtToken = localStorage.getItem('authToken')?.toString();
        this.adminPhoneNumber = payload.phoneNumber;
        observer.next({ valid: true, message: '' });
        observer.complete();
        httpSubscription.unsubscribe();
      }, (error: any) => {
        if (error.status == 401) {
          observer.next({ valid: false, message: error.error.error });
          observer.complete();
        } else if (error.status == 403) {
          observer.next({ valid: false, message: error.error.error });
          observer.complete();
        } else
          observer.error(new Error("Login Error.Please try Logging after sometime"));
      });
    });

    return this.responseObservable;
  }

  public isAuthenticated(): boolean {
    if (this.jwtToken != undefined)
      return !this.jwtHelper.isTokenExpired(this.jwtToken);
    return false;
  }

}

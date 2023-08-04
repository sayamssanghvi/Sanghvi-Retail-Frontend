import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteMappingService } from './route.mapping.service';

@Injectable({
  providedIn: 'root',
})
export class RepairService {
  private authToken: any = localStorage.getItem('authToken');

  constructor(
    private routeMapping: RouteMappingService,
    private http: HttpClient
  ) {}

  private GetAuthToken(): any {
    return {
      headers: new HttpHeaders().set('Authorization', this.authToken),
    };
  }

  // public registerRepairMachine(body:any):Observable<any> {
  //   let url=this.routeMapping.getRepairPartsByMachineCode();
  //   url+=
  // }

  public fetchRepairMachineParts(body: any): Observable<any> {
    let url = this.routeMapping.getRepairPartsByMachineCodeUrl();
    url += body.machineRepairCode;
    return this.http.get(url, this.GetAuthToken());
  }

  public submitRepairParts(body: any): Observable<any> {
    let url = this.routeMapping.getSubmitRepairPartsUrl();
    return this.http.post(url, body, this.GetAuthToken());
  }

  public changeStatusOfRepairMachine(body: any): Observable<any> {
    let url = this.routeMapping.getChangeStatusUrl();
    return this.http.post(url, body, this.GetAuthToken());
  }

  public addDiscountToRepairMachine(body: any): Observable<any> {
    let url = this.routeMapping.getAddDiscountUrl();
    return this.http.post(url, body, this.GetAuthToken());
  }
}

import { RouteMappingService } from './route.mapping.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private authToken: any = localStorage.getItem('authToken');
  constructor(private routeMapping: RouteMappingService, private http: HttpClient) { }

  private GetAuthToken(): any {
    return {
      headers: new HttpHeaders().set('Authorization', this.authToken)
    };
  }

  public RegisterRepairMachine(payload: any): Observable<any> {
    let url = this.routeMapping.getRegisterRepairMachineUrl();
    return this.http.post(url, payload, this.GetAuthToken());
  }

  public RegisterNewSale(payload: any): Observable<any> {
    let url = this.routeMapping.getRegisterNewSaleUrl();
    return this.http.post(url, payload, this.GetAuthToken());
  }

  public RegisterNewCustomer(payload: any): Observable<any> {
    let url = this.routeMapping.getRegisterNewCustomer();
    return this.http.post(url, payload, this.GetAuthToken());
  }

  public GetRepairMachineByPhoneNumber(phoneNumber: any, options: any): Observable<any> {
    let query = '?';
    query += options.sort != undefined ? 'sort=' + options.sort + '&' : '';
    query += options.order != undefined ? 'order=' + options.order + '&' : '';
    query += options.limit != undefined ? 'limit=' + options.limit + '&' : '';
    query += options.skip != undefined ? 'skip=' + options.skip : '';
    let url = this.routeMapping.getRepairMachineByPhoneNumberURI() + phoneNumber + query;
    return this.http.get(url, this.GetAuthToken());
  }

  public GetSalesByPhoneNumber(phoneNumber: any, options: any): Observable<any> {
    let query = '?';
    query += options.sort != undefined ? 'sort=' + options.sort + '&' : '';
    query += options.order != undefined ? 'order=' + options.order + '&' : '';
    query += options.limit != undefined ? 'limit=' + options.limit + '&' : '';
    query += options.skip != undefined ? 'skip=' + options.skip : '';
    let url = this.routeMapping.getSaleByPhoneNumberURI() + phoneNumber + query;
    return this.http.get(url, this.GetAuthToken());
  }
}

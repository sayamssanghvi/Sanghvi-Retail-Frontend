import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteMappingService {
  //Dev
  private BASE_API_URL: string = 'http://localhost:3000';
  // private BASE_API_URL = 'https://sanghvi-retail-backend.glitch.me';

  //Customer Router
  private CUSTOMER_GET_DETAILS: string = '/customer/getdetails/';
  private CUSTOMER_GET_SALE_BY_NUMBER = '/customer/sale/';
  private CUSTOMER_REGISTRATION = '/customer/registration';
  private CUSTOMER_NEW_SALE = '/customer/new/sale';
  private CUSTOMER_UPDATE_DETAILS = '/customer/update/details/';
  private CUSTOMER_UPDATE_SALE = '/customer/update/sale/';

  //Repair Router
  private REPAIR_MACHINE_BY_PHONENUMBER = '/repair/byPhoneNumber/';
  private REPAIR_MACHINE_BY_MACHINECODE = '/repair/byMachineRepairCode/';
  private REPAIR_SUBMIT_ESTIMATE = '/repair/submitEstimate';
  private REPAIR_REGISTER_MACHINE = '/repair/generateCode';
  private REPAIR_ADD_DISCOUNT = '/repair/add-discount';
  private REPAIR_CHANGE_STATUS = '/repair/changeStatus';
  private REPAIR_SUBMIT_PARTS = '/repair/submitParts';
  private REPAIR_EDIT_MACHINE = '/repair/editSale';
  private REPAIR_FETCH_PARTS = '/repair/parts/';
  private REPAIR_FETCH_ALL_MACHINES = '/repair';

  //Admin Router
  private ADMIN_LOGIN = '/admin/login';

  constructor() {}

  public getAdminLoginUrl(): string {
    return this.BASE_API_URL + this.ADMIN_LOGIN;
  }

  // Repair Routes
  public getRegisterRepairMachineUrl(): string {
    return this.BASE_API_URL + this.REPAIR_REGISTER_MACHINE;
  }

  public getRepairMachineByPhoneNumberURI(): string {
    return this.BASE_API_URL + this.REPAIR_MACHINE_BY_PHONENUMBER;
  }

  public getRepairPartsByMachineCodeUrl(): string {
    return this.BASE_API_URL + this.REPAIR_FETCH_PARTS;
  }

  public getSubmitRepairPartsUrl(): string {
    return this.BASE_API_URL + this.REPAIR_SUBMIT_PARTS;
  }

  public getChangeStatusUrl(): string {
    return this.BASE_API_URL + this.REPAIR_CHANGE_STATUS;
  }

  public getEditRepairMachineUrl(): string {
    return this.BASE_API_URL + this.REPAIR_EDIT_MACHINE;
  }

  public getAddDiscountUrl(): string {
    return this.BASE_API_URL + this.REPAIR_ADD_DISCOUNT;
  }

  public getFetchAllRepairMachinesUrl(): string{
    return this.BASE_API_URL + this.REPAIR_FETCH_ALL_MACHINES;
  }

  //Customer Routes
  public getRegisterNewSaleUrl(): string {
    return this.BASE_API_URL + this.CUSTOMER_NEW_SALE;
  }

  public getRegisterNewCustomer(): string {
    return this.BASE_API_URL + this.CUSTOMER_REGISTRATION;
  }

  public getSaleByPhoneNumberURI(): string {
    return this.BASE_API_URL + this.CUSTOMER_GET_SALE_BY_NUMBER;
  }
}

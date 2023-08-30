import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { LANGUAGE } from '../shared/constants/appConstants';
import { TAMIL } from '../shared/constants/tamil';
import * as _ from 'lodash';

@Pipe({
  name: 'language',
})
@Injectable({
  providedIn: 'root',
})
export class LanguagePipe implements PipeTransform {
  constructor(public adminService: AdminService) {}

  transform(value: any, ...args: any): string {
    if (this.adminService.adminLanguage == LANGUAGE.ENGLISH) {
      return value;
    }

    let newValue = TAMIL[value as keyof object];

    if (_.isEmpty(newValue)) {
      return value;
    }

    return newValue;
  }
}

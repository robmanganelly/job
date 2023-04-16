import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  _serverRequirement = false;

  constructor(private api: ApiService) {
   }

  get serverRequirement() {
    return this._serverRequirement;
  }
  set serverRequirement(value) {
    this._serverRequirement = value;
  }

  getFilteredResults(){
    const  fake = {
      id:1,
      accountName: "accountName",
      foundOn: "foundOn",
      matchedValue: "matchedValue"
    }
    return of([fake,fake,fake]);
  }

}

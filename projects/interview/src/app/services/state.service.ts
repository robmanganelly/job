import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  _serverRequirement = false;

  constructor() { }

  get serverRequirement() {
    return this._serverRequirement;
  }
  set serverRequirement(value) {
    this._serverRequirement = value;
  }

  getRawData(){
    const  fake = {
      id:1,
      accountName: "accountName",
      foundOn: "foundOn",
      matchedValue: "matchedValue"
    }
    return of([fake,fake,fake]);
  }

}

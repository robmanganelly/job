import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DataResponse } from '../models/ApiResponse.model';
import { TableData } from '../models/TableData.model';
import { map } from 'rxjs';
import { entries, forIn, isArray, isObject, isString } from 'lodash';

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

  getFilteredResults(withValue:string){
    return this.api.getRawData().pipe(map(raw=>this.filterResults(raw,withValue)));
  }


  private filterResults(data:DataResponse,searchFor:string): TableData[]{ //TODO heavyweight logic here

    let result: TableData[] = [];

    entries(data.accountIds).map(
      ([name, id])=>{
        let snake = ''
      }
    )



    return result;
  }


  private __traverse(data: any, withValue:string, bucket: any[]):void{
    forIn(data, (value, key) => {
      // console.log(value);
      if (isArray(value)) {
          value.forEach((item) => {
              if (isObject(item)) {
                  this.__traverse(item,withValue,bucket);
              }
              if (isString(item) && item.includes(withValue)) {
                  bucket.push(data);
              }
          });
      }
      if (isObject(key)) {
          this.__traverse(data[key],withValue,bucket);
      }
      if (isString(key) && key.includes(withValue)) {
          this.__cookString(data[key],bucket);
      }
  });
  }

  private __cookString(k: string, bucket: any[]){}


}

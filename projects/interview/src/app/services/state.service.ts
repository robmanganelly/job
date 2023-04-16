import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DataResponse } from '../models/ApiResponse.model';
import { TableData } from '../models/TableData.model';
import { map } from 'rxjs';

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

  getFilteredResults(value:string){
    return this.api.getRawData().pipe(map(raw=>this.filterResults(raw,value)));
  }


  private filterResults(data:DataResponse,searchFor:string): TableData[]{ //TODO heavyweight logic here
    console.log({searchFor,data});

    return [];
  }

}

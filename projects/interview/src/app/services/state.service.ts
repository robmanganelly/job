import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DataResponse } from '../models/ApiResponse.model';
import { map } from 'rxjs';
import { traverseData } from './dfs/dfs';

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

  byPassState(){
    return this.api.getRawData();
  }


  filterResults(data:DataResponse,searchFor:string): string[]{ //TODO heavyweight logic here

    return traverseData(data,searchFor);
  }

}

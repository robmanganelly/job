import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DataResponse } from '../models/ApiResponse.model';
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

  getFilteredResults(withValue:string){
    return this.api.getRawData().pipe(map(raw=>this.filterResults(raw,withValue)));
  }

  byPassState(){
    return this.api.getRawData();
  }


  filterResults(data:DataResponse,searchFor:string): string[]{ //TODO heavyweight logic here

    return this.traverseData(data,searchFor);
  }

  traverseData(data: DataResponse, word: string) {
    console.log("traverseData");
    console.log(data);

    let results: string[] = [];
    let regexp = new RegExp(word, 'i');

    // flat networks
    const flatNetworks: Record<string, string[]> = data.groups.reduce(
      (current, { name, networks }) => {
        current[name] = networks;
        return current;
      },
      Object.create(null)
    );

    for (let prop in data.accountIds) {
      let accountName = prop;
      let accId = data.accountIds[accountName];
      if (regexp.test(accountName) || regexp.test(accId)) {
        results.push(`${accountName}-${accId}`);
        continue;
      } else {
        for (let oneAccount in data.accountGroups) {
          let oneAccountGroups = data.accountGroups[oneAccount];
          if (oneAccountGroups.some((s) => regexp.test(s))) {
            results.push(`${accountName}-${accId}`);
            continue;
          } else {
            for (let group of oneAccountGroups) {
              let networks = flatNetworks[group];
              if (networks.some((s) => regexp.test(s))) {
                results.push(`${accountName}-${accId}`);
                continue;
              }
            }
          }
        }
      }
    }
    return results;
  }

}

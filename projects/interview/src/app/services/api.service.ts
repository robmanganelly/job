import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from './di-tokens';
import { Observable } from 'rxjs';

@Injectable(
  {providedIn: 'root'},
)
export class ApiService {
  urlAddress: string;
  version: string = 'v1';

  constructor(
    @Inject(API_URL) public baseUrl: string,
    private http: HttpClient
  ) {
    this.urlAddress = `${this.baseUrl}/${this.version}/`;
  }
  getIndex(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'index');
  }
  resetData(): Observable<any> {
      return this.http.post(`${this.baseUrl}`+'data/reset', {});
  }
  getResource(resource: string): Observable<any> {
    return this.http.get(`${this.baseUrl}`+ resource);
  }

  // this method will be only implemented here, since is not required in lists.
  handleData(rule: number, option: 'Reset'| number){
    alert('received data '+ rule.toString() + '  ' + option.toString())
  }

}

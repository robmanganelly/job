import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL, API_VERSION } from './di-tokens';
import { ApiServiceModel } from './apiService.model';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService implements ApiServiceModel {
  urlAddress: string;

  constructor(
    @Inject(API_VERSION) public version: string,
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

}

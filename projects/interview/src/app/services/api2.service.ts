import { Inject, Injectable } from '@angular/core';
import { ApiServiceModel } from './apiService.model';
import { Observable } from 'rxjs';
import { API_URL, API_VERSION } from './di-tokens';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Api2Service implements ApiServiceModel{
  urlAddress: string;

  constructor(
    @Inject(API_VERSION) public version: string,
    @Inject(API_URL) public baseUrl: string,
    private http: HttpClient
  ) {
    this.urlAddress = `${baseUrl}/${version}`;
   }
  getIndex(): Observable<any> {
    throw new Error('Method not implemented.');
  }
  resetData(): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getResource(resource: string, page?: number | undefined, limit?: number | undefined): Observable<any> {
    throw new Error('Method not implemented.');
  }
}

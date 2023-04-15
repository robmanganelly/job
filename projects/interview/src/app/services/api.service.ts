import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL, API_VERSION } from './di-tokens';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    @Inject(API_VERSION) public version: string,
    @Inject(API_URL) public baseUrl: string,
    private http: HttpClient
  ) {}

  get() {
    return this.http.get(this.baseUrl + this.version);
  }
}

import { HttpClient } from '@angular/common/http';
import { InjectionToken, isDevMode } from '@angular/core';
import { Api2Service } from './api2.service';
import { ApiService } from './api.service';

export const API_URL = new InjectionToken<string>('API_URL', {
  providedIn: 'root',
  factory: () => {
    return isDevMode() ? 'http://localhost:3000/' : 'https://api.example.com/';
  },
});
export const API_VERSION = new InjectionToken<string>('API_VERSION');

const apiSerViceFactory = (
  version: string,
  baseUrl: string,
  http: HttpClient
) => {
  return version === 'v1'
    ? new ApiService(version, baseUrl, http)
    : new Api2Service(version, baseUrl, http);
};

export const ApiServiceProvider = {
  provide: ApiService,
  useFactory: apiSerViceFactory,
  deps: [API_VERSION, API_URL, HttpClient],
};

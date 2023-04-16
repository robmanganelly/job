import { InjectionToken, isDevMode } from '@angular/core';

export const API_URL = new InjectionToken<string>('api.url', {
  providedIn: 'root',
  factory: () => {
    return isDevMode() ? 'http://localhost:3000/api/' : 'https://api.example.com/';
  },
});


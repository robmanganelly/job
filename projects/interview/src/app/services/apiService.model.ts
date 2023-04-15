import {Observable} from 'rxjs';

export interface ApiServiceModel {
  getIndex(): Observable<any>;
  resetData(): Observable<any>;
  getResource(resource: string, page?: number, limit?: number): Observable<any>;
  urlAddress: string;
}

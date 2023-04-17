import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { ApiService } from './api.service';
import { DataResponse } from '../models/ApiResponse.model';


@Injectable({
  providedIn: 'root'
})
export class DataResolver { // TODO change to function. class approach deprecated in angular 15
  constructor(private api: ApiService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<DataResponse| typeof EMPTY> {
    return this.api.getRawData()
    .pipe(
      catchError(error => {
        return of(EMPTY);
      })
    );
  }
}

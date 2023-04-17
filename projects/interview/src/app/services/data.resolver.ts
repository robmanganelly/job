import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EMPTY, EmptyError, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Api2Service } from './api2.service';
import { ApiService } from './api.service';
import { DataResponse } from '../models/ApiResponse.model';


@Injectable({
  providedIn: 'root'
})
export class DataResolver {
  constructor(private api: ApiService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<DataResponse| typeof EMPTY> {
    return this.api.getRawData().pipe(
      tap(data => console.log(data)),
      catchError(error => {
        return of(EMPTY);
      })
    );
  }
}

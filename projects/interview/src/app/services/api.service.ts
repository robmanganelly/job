import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { API_URL } from './di-tokens';
import { Observable, Subject, debounceTime, map, switchMap, tap } from 'rxjs';
import { SubSink } from 'subsink';
import { ApiResponse, DataResponse } from '../models/ApiResponse.model';

@Injectable({ providedIn: 'root' })
export class ApiService implements OnDestroy {
  urlAddress: string;
  version: string = 'v1';
  sub = new SubSink();
  executeCRUD: Subject<[number, number]> = new Subject();
  onDataUpdated: Subject<string> = new Subject(); //type this

  constructor(
    @Inject(API_URL) public baseUrl: string,
    private http: HttpClient
  ) {
    this.urlAddress = `${this.baseUrl}/${this.version}/`;
    this.onPOSTcall();
  }

  getRawData(): Observable<DataResponse> {
    return this.http
      .get<ApiResponse<DataResponse>>(`${this.baseUrl}${this.version}/data`)
      .pipe(map((api) => api['data']['data']));
  }

  handleData(rule: number, option: number) {
    this.executeCRUD.next([rule, option]);
  }

  onPOSTcall() {
    this.sub.sink = this.executeCRUD
      .pipe(
        switchMap((order) => {
          const [method, param] = order;
          const _method = ['POST', 'POST', 'PATCH'][method];
          let path = [`/data/${param}`, `/data/${param}`, `/data/reset`][
            method
          ];
          const params = { replace: method === 1 };

          return this.http.request(
            _method,
            `${this.baseUrl}` + this.version + path,
            { params }
          );
        }),
        debounceTime(1000),
        tap((rs) => {
          console.log('updated');
          this.onDataUpdated.next('updated');
        })
      )
      .subscribe((rs) => console.log({ rs }));
  }

  ngOnDestroy() {
    this.executeCRUD.complete();
    this.sub.unsubscribe();
  }
}

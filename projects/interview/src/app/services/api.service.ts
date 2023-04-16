import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from './di-tokens';
import { Observable, Subject, map, of, switchMap, tap } from 'rxjs';

@Injectable(
  {providedIn: 'root'},
)
export class ApiService {
  urlAddress: string;
  version: string = 'v1';

  executeCRUD: Subject<[number,number]> = new Subject();
  onDataUpdated: Subject<any> = new Subject(); //type this

  constructor(
    @Inject(API_URL) public baseUrl: string,
    private http: HttpClient
  ) {
    this.urlAddress = `${this.baseUrl}/${this.version}/`;
    this.onHTTPCalls();
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
  handleData(rule: number, option: number){
    this.executeCRUD.next([rule, option]); // on post, this method call the subject to emit
  }

  onHTTPCalls(){
    this.executeCRUD.asObservable().pipe(
      switchMap(order => {
      const [method, param] = order;
      const _method = ['POST','POST','PATCH'][method];
      let path = [`/data/${param}`,`/data/${param}`,`/data/reset`][method];
      const params = {replace: method === 1}

      return this.http.request(_method,`${this.baseUrl}`+this.version+path,{params})
    }),
    tap(rs=>console.log(rs)),
    ).subscribe(rs=>this.onDataUpdated.next(rs)); // raw data from get is emitted
  }

}

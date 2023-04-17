import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../services/api.service';
import { ListSkeletonComponent } from '../list-skeleton/list-skeleton.component';
import { StateService } from '../services/state.service';
import {
  Observable,
  debounceTime,
  fromEvent,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableData } from '../models/TableData.model';
import { MatIconModule } from '@angular/material/icon';
import { SelectComponent } from '../select/select.component';
// import { Api2Service } from '../services/api2.service';

@Component({
  selector: 'app-list1',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ListSkeletonComponent,
    ReactiveFormsModule,
    SelectComponent,
  ],
  templateUrl: './list1.component.html',
  styleUrls: ['./list1.component.scss'],
  providers: [{ provide: ApiService, useClass: ApiService }],
})
export class List1Component {

  selected = 'John-acb';
  items: { name: string; id: string }[] = [
    { name: 'John  Doe', id: '1123-adc1' },
    { name: 'Mary Poppins', id: '24b9-6547' },
    { name: 'Peter Jackson', id: '1fe1-ccd3' },
    { name: 'Susan Saran', id: '49a1-1155' },
    { name: 'Mike Myers', id: '1235-cd74' },
    { name: 'Laura Paussini', id: '4fcb-1a39' },
    { name: 'Bob Marley', id: '1322-3417' },
    { name: 'Alice in Wonder', id: '453d-12a8' },
  ];

  valFn = function (value:{ name: string; id: string }) {
      return `${value.name}-${value.id}`;
    }

  filterFn: Function = function (item: {name: string, id: string}, word:string) {
      return new RegExp(word, 'i').test(`${item.name}-${item.id}`);
  }

  // dummy
  output: string="";
  onUpdate(v: string){this.output = v}



  // data: Observable<TableData[]>; //TODO implementation of strongly typed Observable
  // cachedData: TableData[] = []; //TODO implementation of strongly typed Observable same as before

  // searchBar: FormControl = new FormControl<string>('', [
  //   Validators.required,
  //   Validators.minLength(3),
  //   Validators.maxLength(20),
  // ]);

  // constructor(private apiService: ApiService, private state: StateService) {
  //   // changes are emitted by this stream, the cycle is subscribed in the template, hence there's no need to unsubscribe.
  //   this.data = this.searchBar.valueChanges.pipe(
  //     debounceTime(650),
  //     map((v) => (this.searchBar.valid ? v : null)),
  //     switchMap((v) => (!v ? of(this.cachedData) : this.search(v))),
  //     tap((v) => console.log(v)) //keep while in development
  //   );
  // }

  // private search(value: string): Observable<TableData[]> {
  //   return this.state
  //     .getFilteredResults(value)
  //     .pipe(tap((v) => (this.cachedData = v)));
  // }
}

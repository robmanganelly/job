import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSkeletonComponent } from '../list-skeleton/list-skeleton.component';
import { SelectComponent } from '../select/select.component';
import { MatButtonModule } from '@angular/material/button';
import { StateService } from '../services/state.service';
import { DataResponse } from '../models/ApiResponse.model';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, map } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-list2',
  standalone: true,
  imports: [
    CommonModule,
    ListSkeletonComponent,
    SelectComponent,
    MatButtonModule,
  ],
  templateUrl: './list2.component.html',
  styleUrls: ['./list2.component.scss'],
})
export class List2Component implements OnInit, OnDestroy {
  private sub = new SubSink();

  selected: string = '';

  data!: DataResponse;

  valFn = function (value: string[]) {
    return value;
  };

  filterFn: Function;

  // dummy
  output: string = '';
  onUpdate(v: string) {
    this.output = v;
  }

  usersCount: number = 0;
  networksCount: number = 0;
  groupsCount: number = 0;

  constructor(
    private state: StateService,
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.filterFn = this.state.filterResults;
  }

  ngOnInit() {
    this.activatedRoute.data
      .pipe(map((d) => d['data']))
      .subscribe(this.__handle.bind(this));

    this.sub.sink = this.api.onDataUpdated.pipe(debounceTime(1000)).subscribe((_) => {
      console.log('sub');
      this.loadData()
    });
  }

  loadData() {
    this.sub.sink = this.state
      .byPassState()
      .subscribe(this.__handle.bind(this));
  }

  private __handle(__data: DataResponse): void {
    this.data = __data;
    this.usersCount = Object.keys(__data.accountGroups).length || 0;
    this.networksCount =
      __data.groups.map((g) => g.networks).flat().length || 0;
    this.groupsCount = __data.groups.length || 0;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

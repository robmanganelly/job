import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, switchMap, tap } from 'rxjs';
import { DataResponse } from '../models/ApiResponse.model';
import { ListSkeletonComponent } from '../list-skeleton/list-skeleton.component';
import { MatButtonModule } from '@angular/material/button';
import { SubSink } from 'subsink';
import { StateService } from '../services/state.service';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-list2',
  standalone: true,
  imports: [
    CommonModule,
    ListSkeletonComponent,
    MatButtonModule,
    SelectComponent,
  ],
  templateUrl: './list2.component.html',
  styleUrls: ['./list2.component.scss'],
})
export class List2Component implements OnInit, OnDestroy {
  private sub = new SubSink();

  // dummy
  data!: DataResponse;
  filterFn: Function;
  groupsCount: number = 0;
  output: string = '';
  onUpdate(v: string) {
    this.output = v;
  }
  networksCount: number = 0;
  selected: string = '';
  usersCount: number = 0;
  valFn = function (value: string[]) {
    return value;
  };

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private state: StateService
  ) {
    this.filterFn = this.state.filterResults;
  }

  ngOnInit() {
    this.activatedRoute.data
      .pipe(map((d) => d['data']))
      .subscribe(this.handle.bind(this));

    this.sub.sink = this.api.onDataUpdated
      .pipe(switchMap((_) => this.state.byPassState()))
      .subscribe((rs) => this.handle(rs));
  }

  private handle(__data: DataResponse): void {
    this.data = __data;
    this.usersCount = Object.keys(__data.accountGroups).length || 0;
    this.networksCount =
      __data.groups.map((g) => g.networks).flat().length || 0;
    this.groupsCount = __data.groups.length || 0;
  }

  onLoadData() {
    this.api.onDataUpdated.next('from Button');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

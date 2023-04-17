import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSkeletonComponent } from '../list-skeleton/list-skeleton.component';
import { SelectComponent } from '../select/select.component';
import { MatButtonModule } from '@angular/material/button';
import { StateService } from '../services/state.service';
import { DataResponse } from '../models/ApiResponse.model';
import { SubSink } from 'subsink';

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
export class List2Component implements OnInit , OnDestroy {
  private sub = new SubSink();

  selected: string = '';
  items: any;

  data!: DataResponse;

  valFn = function (value: string) {
    return `${value}`;
  };

  filterFn: Function;

  // dummy
  output: string = '';
  onUpdate(v: string) {
    this.output = v;
  }

  get usersCount(): number {
    return Object.keys(this.data.accountIds).length || 0;
  }
  get networksCount(): number {
    return this.data.groups.map((g) => g.networks).flat().length || 0;
  }
  get groupsCount(): number {
    return this.data.groups.length || 0;
  }

  constructor(private state: StateService) {
    this.filterFn = this.state.filterResults;
  }

  ngOnInit() {
    this.loadData();
  }


  loadData() {
    this.sub.sink = this.state.byPassState().subscribe((data) => {
      this.data = data;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

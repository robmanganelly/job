import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { StateService } from '../services/state.service';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule,MatTableModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  @Input() dataSource!: Observable<any[]>; //TODO implement strong typing here.
  displayedColumns: string[] = [
    'Id',
    'Account Name',
    'Found On',
    'Matched Value',
  ];
  constructor(private state: StateService) {}
}
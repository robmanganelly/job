import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from '../services/state.service';
import { DataTableComponent } from '../data-table/data-table.component';
import { MatRadioModule } from '@angular/material/radio';
@Component({
  selector: 'app-list-skeleton',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatRadioModule,
    MatButtonModule,
    DataTableComponent,
  ],
  templateUrl: './list-skeleton.component.html',
  styleUrls: ['./list-skeleton.component.scss'],
})
export class ListSkeletonComponent {
  @Input() title: string = 'titleHERe';
  @Input() next: string = '';
  @Input() dataSource!: Observable<any[]>; //TODO implement strong typing here.

  showSecondRow = false;

  get nextRoute() {
    return ['/list' + this.next];
  }
}

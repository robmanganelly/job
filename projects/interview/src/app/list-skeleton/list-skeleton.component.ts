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
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../services/api.service';
import { TableData } from '../models/TableData.model';
@Component({
  selector: 'app-list-skeleton',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatToolbarModule,
    RouterModule,
  ],
  templateUrl: './list-skeleton.component.html',
  styleUrls: ['./list-skeleton.component.scss'],
  providers:[{provide: ApiService, useClass: ApiService}]
})
export class ListSkeletonComponent {
  @Input() title: string = 'titleHERe';
  @Input() next: string = '';
  @Input() dataSource!: Observable<TableData[]>; //TODO implement strong typing here.
  @Input() viewActions = true;

  showSecondRow = false;

  get nextRoute() {
    return ['/list' + this.next];
  }

  constructor(private api: ApiService) {
    this.api.executeCRUD.subscribe(([rule, option])=>{
      // alert(rule + ' ' + option);
      this.showSecondRow = false;
    });
  }

  actions = [
    { rule: 'Add Entries', options: ['10', '20', '200'] },
    { rule: 'Limit Entries to', options: ['2', '20', '50', '100'] },
    { rule: 'Reset Data', options: ['Reset'] },
  ].map(item=>({...item, call: this.onCRUD.bind(this)}))

  onCRUD(rule: string, option: string){
    let _option = option === 'Reset' ? -1 : Number(option);
    let _rule = this.actions.map(i=>i.rule).indexOf(rule);
    this.api.handleData(_rule, _option);
  }
}

import { ApiService } from '../services/api.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-list-skeleton',
  standalone: true,
  imports: [
    CommonModule,
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

  // external data source
  @Input() title: string = '';
  @Input() next: string = '';
  @Input() viewActions = true;

  showSecondRow = false;

  actions = [
    { rule: 'Add Entries', options: ['10', '20', '200'] },
    { rule: 'Limit Entries to', options: ['2', '20', '50', '100'] },
    { rule: 'Reset Data', options: ['Reset'] },
  ].map(item=>({...item, call: this.onCRUD.bind(this)}))

  constructor(private api: ApiService) {
    this.api.executeCRUD.subscribe(([rule, option])=>{
      // alert(rule + ' ' + option);
      this.showSecondRow = false;
    });
  }

  get nextRoute() {
    return ['/list' + this.next];
  }

  onCRUD(rule: string, option: string){
    let _option = option === 'Reset' ? -1 : Number(option);
    let _rule = this.actions.map(i=>i.rule).indexOf(rule);
    this.api.handleData(_rule, _option);
  }
}

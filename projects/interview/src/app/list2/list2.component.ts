import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSkeletonComponent } from '../list-skeleton/list-skeleton.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SelectComponent } from '../select/select.component';
import { isString } from 'lodash';

@Component({
  selector: 'app-list2',
  standalone: true,
  imports: [CommonModule, ListSkeletonComponent, SelectComponent],
  templateUrl: './list2.component.html',
  styleUrls: ['./list2.component.scss'],
})
export class List2Component {
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
}

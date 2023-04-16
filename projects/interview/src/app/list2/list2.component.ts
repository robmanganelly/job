import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSkeletonComponent } from '../list-skeleton/list-skeleton.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-list2',
  standalone: true,
  imports: [CommonModule, ListSkeletonComponent, SelectComponent],
  templateUrl: './list2.component.html',
  styleUrls: ['./list2.component.scss']
})
export class List2Component {

}

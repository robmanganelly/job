import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-list-skeleton',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, RouterModule],
  templateUrl: './list-skeleton.component.html',
  styleUrls: ['./list-skeleton.component.scss']
})
export class ListSkeletonComponent {

  queryParam = {serverRequirement: 'true'};

  @Input() title: string ="";


}

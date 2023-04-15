import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../services/api.service';
// import { Api2Service } from '../services/api2.service';

@Component({
  selector: 'app-list1',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './list1.component.html',
  styleUrls: ['./list1.component.scss'],
  })
export class List1Component {
  constructor(@Inject(ApiService)private apiService: ApiService) { }
}

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../services/api.service';
import { ApiServiceProvider } from '../services/di-tokens';
import { ListSkeletonComponent } from '../list-skeleton/list-skeleton.component';
import { StateService } from '../services/state.service';
import { Observable } from 'rxjs';
// import { Api2Service } from '../services/api2.service';

@Component({
  selector: 'app-list1',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ListSkeletonComponent,
  ],
  templateUrl: './list1.component.html',
  styleUrls: ['./list1.component.scss'],
  providers: [{ provide: 'API_VERSION', useValue: 'v1' }, ApiServiceProvider],
})
export class List1Component {
  data: Observable<any[]>; //TODO implementation of strongly typed Observable

  constructor(private apiService: ApiService, state: StateService) {
    this.data = state.getRawData();
  }
}

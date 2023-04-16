import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkMenuModule} from '@angular/cdk/menu';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SubSink } from 'subsink';
import { debounceTime, tap } from 'rxjs';
// import { TableData } from '../models/TableData.model';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    CdkMenuModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, OnDestroy {
  protected __items: any[] = [];
  protected searchBar = new FormControl();

  // prop bindings
  @Input() filterFn!: Function;
  @Input() items!:  any[];
  @Input() valFn!: (v: any) => string;

  //two way binding
  @Input() selected!: string;
  @Output() selectedChange = new EventEmitter<string>();

  // event binding
  @Output() update: EventEmitter<string> = new EventEmitter<string>();

  sub = new SubSink();


  constructor() {}

  ngOnInit(): void {
    this.__items = [...this.items];
    this.sub.sink = this.searchBar.valueChanges.pipe(
      debounceTime(450),
      tap(searchTerm=>this.__items = this.items.filter((item)=>this.filterFn(item,searchTerm))),)
    .subscribe((v: string) => {
      this.update.emit(v);
    });
  }

  get filteredItems(): string[] {
    return this.__items.map(item=>this.valFn(item) );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSelectOption(v: string){
    this.selectedChange.emit(v);
  }
}

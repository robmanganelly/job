import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkMenuModule } from '@angular/cdk/menu';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SubSink } from 'subsink';
import { debounceTime, tap } from 'rxjs';
import { MatMenuModule, MatMenuTrigger, MenuPositionX } from '@angular/material/menu';
@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    CdkMenuModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, AfterViewInit, OnDestroy {
  private hashTable = new Map<string,any>();
  private sub = new SubSink();

  protected __items: any[] = [];
  protected searchBar = new FormControl('');

  //view props
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;;

  // prop bindings
  @Input() filterFn!: Function;
  /**
   * The number of milliseconds to debounce the search.
   * Use this property to set the reactivity of the search bar.
   * On Heavy queries, it may cause performance issues.
   */
  @Input() reactivity: number = 250;
  @Input() items!:  any[];
  @Input() valFn!: (v: any) => string;

  //two way binding
  @Input() selected!: string;
  @Output() selectedChange = new EventEmitter<string>();

  // event binding
  @Output() change: EventEmitter<string> = new EventEmitter<string>();


  constructor() {}
  ngAfterViewInit(): void {
    // this.trigger._handleKeydown = (ev: KeyboardEvent) => {
    //   if (ev.key === ' ' || ev.key === 'Spacebar') {
    //   }
    // };
  }

  ngOnInit(): void {
    this.__items = [...this.items];

    this.sub.sink = this.searchBar.valueChanges.pipe(
      tap((v)=>!!v ? this.change.emit(v): null), // value emission should not be debounced
      debounceTime(this.reactivity)
    ).subscribe((v: string|null) => {
      this.processValue(!!v ? v : '');
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


  private processValue(searchTerm: string) {
    //process using hash table, to avoid recalculating values on complex operations.
    let key = this.__keyMaker(this.items,searchTerm);
    if (this.hashTable.has(key)) {
      console.log('using cache')
      this.__items = this.hashTable.get(key);
    }else{
      console.log('calculating')
      this.__items = this.items.filter((item)=>this.filterFn(item,searchTerm));
      this.hashTable.set(key,this.__items);
    }
  }

  private __keyMaker(o:any, s:string):string{
    return s.trim()+JSON.stringify(o);
  }

  preventDefaultSpace(ev: Event){
    ev.preventDefault();
    console.log(';yupi')
  }
}

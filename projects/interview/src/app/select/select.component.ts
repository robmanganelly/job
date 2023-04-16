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
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SubSink } from 'subsink';
import { debounceTime, tap } from 'rxjs';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
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
export class SelectComponent implements OnInit, AfterViewInit,  OnDestroy {
  private hashTable = new Map<string,any>();
  private sub = new SubSink();

  protected __items: any[] = [];
  protected searchBar = new FormControl('');

  //view props
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @ViewChild(MatMenu) menuPanel!: MatMenu;
  @ViewChild(MatMenu) menuContent!: MatMenu;
  @ViewChild(MatIcon) closeIcon!: MatIcon;

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

  get dirty(): boolean {
    return this.searchBar.dirty;
  }

  onClear(){
    this.searchBar.reset('');
  }

  ngAfterViewInit() {
    this.sub.sink = this.searchBar.valueChanges.
    // pipe(tap(_=>this.menuPanel.resetActiveItem()))
    subscribe(
      (x)=>{
    //     if(!this.trigger.menuOpen && this.__items.length > 0)this.trigger.openMenu();
        if(this.__items.length === 0) this.trigger.closeMenu();
      }
    )

    this.closeIcon._elementRef.nativeElement.addEventListener('click',()=>{
      if (this.dirty){
        this.onClear();
        this.trigger.closeMenu();
        this.menuPanel.resetActiveItem();
      }else{
        this.trigger.openMenu();
      }
    })


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
    this.searchBar.setValue(v);
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
}

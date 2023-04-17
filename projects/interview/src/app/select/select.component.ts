import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SubSink } from 'subsink';
import { debounceTime, tap } from 'rxjs';
import {
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger,
} from '@angular/material/menu';
import { ApiService } from '../services/api.service';
import { DataResponse } from '../models/ApiResponse.model';
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
  private hashTable = new Map<string, any>();
  private dataHashTable = new Map<any, any>();
  private sub = new SubSink();

  protected __items: string[] | object = [];
  protected searchBar = new FormControl('');

  //view props
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @ViewChildren('button.matMenuItem') menuItem: MatMenuItem[] = [];
  @ViewChild(MatIcon) suffixIcon!: MatIcon;

  // prop bindings
  @Input() filterFn!: Function;
  @Input() items!: string[] | object;
  @Output() itemsChange = new EventEmitter<DataResponse>();
  /**
   * The number of milliseconds to debounce the search.
   * Use this property to set the reactivity of the search bar.
   * On Heavy queries, it may cause performance issues.
   */
  @Input() reactivity: number = 250;
  @Input() valFn!: (v: any) => string[];

  //two way binding
  @Input() selected!: string;
  @Output() selectedChange = new EventEmitter<string>();

  // event binding
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor(private api: ApiService) {}

  get iconState(): 'close' | 'delete' | 'search' {
    try {
      if (this.trigger.menuOpen && this.searchBar.dirty) {
        return 'delete';
      } else if (!this.trigger.menuOpen && this.searchBar.dirty) {
        return 'close';
      } else {
        return 'search';
      }
    } catch {
      return 'search';
    }
  }

  onClear() {
    this.searchBar.reset();
  }

  ngAfterViewInit() {
    this.suffixIcon._elementRef.nativeElement.addEventListener('click', () => {
      switch (this.iconState) {
        case 'close':
          this.searchBar.reset();
          this.trigger.closeMenu();
          break;
        case 'delete':
          this.trigger.closeMenu();
          break;
        case 'search':
        default:
          if (!this.trigger.menuOpen) {
            this.trigger.openMenu();
          }
          break;
      }
    });
  }

  ngOnInit(): void {
    this.__items = this.filterFn(this.items, '');

    this.sub.sink = this.api.onDataUpdated.pipe(debounceTime(500)).subscribe(() => {
      // this behavior is just for demonstration purposes, the actual implementation should not use this approach
      this.__items = this.filterFn(this.items, '');
      this.hashTable.clear();
      this.dataHashTable.clear();
      console.log(this.__items as string[]);
    });

    this.sub.sink = this.searchBar.valueChanges
      .pipe(
        tap((v) => (!!v ? this.change.emit(v) : null)), // value emission should not be debounced
        debounceTime(this.reactivity)
      )
      .subscribe((v: string | null) => {
        this.processValue(!!v ? v : '');
      });
  }

  get filteredItems(): string[] {
    return (this.__items as string[]).length > 10
      ? (this.__items as string[]).slice(0, 10)
      : (this.__items as string[]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onClickInput() {
    try {
      if (this.iconState === 'search')
        this.suffixIcon._elementRef.nativeElement.click();
      else if (this.iconState === 'close') {
        this.trigger.openMenu();
      }
    } catch (e) {}
  }

  onSelectOption(v: string) {
    this.selectedChange.emit(v);
    this.searchBar.setValue(v);
  }

  private processValue(searchTerm: string) {
    let key = this.__keyMaker(this.items, searchTerm);
    if (this.hashTable.has(key)) {
      console.log('returned cached value');
      this.__items = this.hashTable.get(key);
    } else {
      console.log('calculating value');
      this.__items = this.filterFn(this.items, searchTerm);
      this.hashTable.set(key, this.__items);
    }
  }

  private __keyMaker(o: any, s: string): string {
    if (this.dataHashTable.has(o)) {
      return s.trim() + this.dataHashTable.get(o);
    }
    let key = s.trim() + JSON.stringify(o);
    this.hashTable.set(o, key);
    return key;
  }
}

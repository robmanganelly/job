import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TableData } from '../models/TableData.model';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatIconModule,MatInputModule,ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnDestroy {

  searchBar = new FormControl();

  @Input() selected!: string;
  @Input() items!:  string[]| object[];
  @Input() valFn = (v:any)=>v; // default dummy value function
  @Input() filterFn = (v:any)=>v; // default dummy filter function
  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  sub = new SubSink();

  constructor() {}

  ngOnInit(): void {
    this.sub.sink = this.searchBar.valueChanges.subscribe((v:string)=>{this.update.emit(v);});
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }




}

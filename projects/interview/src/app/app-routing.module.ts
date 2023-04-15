import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { List1Component } from './list1/list1.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: List1Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

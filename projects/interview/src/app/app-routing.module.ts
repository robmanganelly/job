import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { DataResolver } from './services/data.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: EntryComponent },
  {
    path: 'list1',
    loadComponent: () =>
      import('./list1/list1.component').then((c) => c.List1Component),
  },
  {
    path: 'list2',
    loadComponent: () =>
      import('./list2/list2.component').then((c) => c.List2Component),
    resolve: { data: DataResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

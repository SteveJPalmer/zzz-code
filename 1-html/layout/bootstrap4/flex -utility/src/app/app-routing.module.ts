import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurboTableComponent } from './turbo-table/turbo-table.component';

const routes: Routes = [
  { path: 'table', component: TurboTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

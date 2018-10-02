import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleComponent } from './vehicle.component';
import { VehiclesComponent } from './vehicles.component';
import { VehicleListComponent } from './vehicle-list.component';

const routes: Routes = [
  {
    path: '',                        // lazy loaded so concat to app router definition
    component: VehiclesComponent,
    children: [
      { path: '', component: VehicleListComponent },
      { path: ':id', component: VehicleComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }

export const routedComponents = [
  VehiclesComponent,
  VehicleListComponent,
  VehicleComponent
];


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
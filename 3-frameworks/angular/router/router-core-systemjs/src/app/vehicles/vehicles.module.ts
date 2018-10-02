import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VehicleService } from './vehicle.service';
import { routedComponents, VehiclesRoutingModule } from './vehicles-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, VehiclesRoutingModule],
  declarations: [routedComponents],
  providers: [VehicleService],
})
export class VehiclesModule { }


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
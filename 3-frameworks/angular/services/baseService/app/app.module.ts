import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { VehiclesComponent } from './vehicles.component';
import { VehicleService } from './vehicle.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [VehiclesComponent],
  providers: [VehicleService],
  bootstrap: [VehiclesComponent],
})
export class AppModule { }


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
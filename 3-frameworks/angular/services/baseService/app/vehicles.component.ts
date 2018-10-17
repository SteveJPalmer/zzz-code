import { Component } from '@angular/core';

import { VehicleService } from './vehicle.service';

@Component({
  moduleId: module.id,
  selector: 'my-vehicles',
  templateUrl: './vehicles.component.html',
})
export class VehiclesComponent {
  vehicles = this.vehicleService.getVehicles();

  constructor(private vehicleService: VehicleService) { }
}


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
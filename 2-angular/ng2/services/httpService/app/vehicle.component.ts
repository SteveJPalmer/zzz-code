import { Component, Input } from '@angular/core';
import { Vehicle } from './vehicle.service';

@Component({
  moduleId: module.id,
  selector: 'my-vehicle',
   templateUrl: './vehicle.component.html'
})
export class VehicleComponent {
  @Input() vehicle: Vehicle;
}


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
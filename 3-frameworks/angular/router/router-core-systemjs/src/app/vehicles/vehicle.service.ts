import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { CONFIG } from '../config';

let vehiclesUrl = CONFIG.baseUrls.vehicles;

export class Vehicle {
  id: number;
  name: string;
  type: string;
}

@Injectable()
export class VehicleService {
  constructor(private http: Http) {
    console.log('created vehicle service');
  }

  getVehicle(id: number) {
    return this.getVehicles()
      .map(vehicles => vehicles.find(vehicle => vehicle.id === id));
  }

  getVehicles() {
    return this.http
      .get(vehiclesUrl)
      .map((response: Response) => <Vehicle[]>response.json().data);
  }
}


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
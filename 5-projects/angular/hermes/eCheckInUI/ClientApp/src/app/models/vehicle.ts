import { Driver } from './driver';
import { VehicleType } from './enums';

export class Vehicle {
  public registrationNumber: string;
  public registrationTrailerNumber: string;
  public driverInfo: Driver;
  public vehicleType: VehicleType;

  constructor( registrationNumber: string = '',
               registrationTrailerNumber: string = '',
               driver: Driver = null,
               vehicleType: VehicleType = 1 ) {
    //
    this.registrationNumber = registrationNumber;
    this.registrationTrailerNumber = registrationTrailerNumber;
    this.driverInfo = driver;
    this.vehicleType = vehicleType;
  }
}

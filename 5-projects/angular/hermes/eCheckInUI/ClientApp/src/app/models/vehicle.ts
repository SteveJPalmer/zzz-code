import { Driver } from './driver';
import { VehicleType } from './enums';

export class Vehicle {
  public registrationNumber :string;
  public registrationTrailorNumber :string;
  public driverInfo: Driver;
  public vehicleType: VehicleType;

  constructor( registrationNumber :string = '',
               registrationTrailorNumber :string = '',
               driver: Driver = null,
               vehicleType: VehicleType = 1 ) {
    //
    this.registrationNumber = registrationNumber;
    this.registrationTrailorNumber = registrationTrailorNumber;
    this.driverInfo = driver;
    this.vehicleType = vehicleType;
  }
}

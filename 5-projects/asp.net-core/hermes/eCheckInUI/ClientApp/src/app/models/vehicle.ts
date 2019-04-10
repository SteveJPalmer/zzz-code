import { Driver } from './driver';

export class Vehicle {
  public registrationNumber :string;
  public registrationTrailorNumber :string;
  public driverInfo: Driver;

  constructor( registrationNumber :string = '',
               registrationTrailorNumber :string = '',
               driver: Driver = null ) {
    //
    this.registrationNumber = registrationNumber;
    this.registrationTrailorNumber = registrationTrailorNumber;
    this.driverInfo = driver;
  }
}

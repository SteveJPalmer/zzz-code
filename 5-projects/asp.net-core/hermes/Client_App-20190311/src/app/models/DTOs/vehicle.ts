export class Vehicle {
  public deliveryMethod :string ;
  public registrationNumber :string;
  public registrationTrailorNumber :string;
  public driver: string;
  public driverId: string;

  constructor( deliveryMethod :string = '',
               registrationNumber :string = '',
               registrationTrailorNumber :string = '',
               driver: string = '',
               driverId: string = '' ) {
    //
    this.deliveryMethod = deliveryMethod;
    this.registrationNumber = registrationNumber;
    this.registrationTrailorNumber = registrationTrailorNumber;
    this.driver = driver;
    this.driverId = driverId;
  }
}

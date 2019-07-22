export class Driver {

  public driverFirstName: string;
  public driverMiddleName: string;
  public driverLastName: string;
  public driverId: string;

  constructor( driverFirstName: string = '',
               driverMiddleName: string = '',
               driverLastName: string = '',
               driverId: string = '' ) {
    //
    this.driverFirstName = driverFirstName;
    this.driverMiddleName = driverMiddleName;
    this.driverLastName = driverLastName;
    this.driverId = driverId;
  }

}

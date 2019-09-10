import { Package } from '../models';

export class Booking {

  public airlineCode: string;
  public flightNumber: string;
  public origin: string;
  public destination: string;
  public flightDate: string;
  public looseCargo: Package;
  public uldManifest: any;

  constructor( airlineCode: string = '',
               flightNumber: string = '',
               origin: string = '',
               flightDate: string = '',
               looseCargo: Package = null,
               uldManifest: any = null ) {
    //
    this.airlineCode = airlineCode;
    this.flightNumber = flightNumber;
    this.origin = origin;
    this.flightDate = flightDate;
    this.looseCargo = looseCargo;
    this.uldManifest = uldManifest;
  }

}

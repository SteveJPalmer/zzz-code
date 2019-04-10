import { AirwayBill } from '../models';

export class VCTBooking {

  public userProvidedAirwayBill: AirwayBill;
  public pieces: string;
  public weight: string;

  constructor( userProvidedAirwayBill: AirwayBill = null,
               pieces: string = '',
               weight: string = '' ) {
    //
    this.userProvidedAirwayBill = userProvidedAirwayBill;
    this.pieces = pieces;
    this.weight = weight;
  }

}

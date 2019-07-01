import { AirwayBill, RejectReason } from '../models';

export class VCTBooking {

  public userProvidedAirwayBill: AirwayBill;
  public pieces: string;
  public weight: string;
  public rejectReason: RejectReason;

  constructor( userProvidedAirwayBill: AirwayBill = null,
               pieces: string = '',
               weight: string = '',
               rejectReason: RejectReason = 0 ) {
    //
    this.userProvidedAirwayBill = userProvidedAirwayBill;
    this.pieces = pieces;
    this.weight = weight;
    this.rejectReason = rejectReason;
  }

}

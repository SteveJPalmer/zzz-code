import { VCTBooking } from './vctbooking';

export class Container {
  public vctBookings: Array<VCTBooking>;

  constructor( vctBookings: Array<VCTBooking> ) {
    //
    this.vctBookings = vctBookings;
  }

}

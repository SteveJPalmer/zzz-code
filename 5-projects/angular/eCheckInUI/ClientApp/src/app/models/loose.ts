import { Container } from './container';
import { VCTBooking } from './vctbooking';

export class Loose extends Container {

  constructor ( VCTBookings: Array<VCTBooking> ) {
    //
    super( VCTBookings );
  }

}

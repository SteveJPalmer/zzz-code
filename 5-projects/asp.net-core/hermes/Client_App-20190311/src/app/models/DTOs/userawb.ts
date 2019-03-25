import { Delivery } from './delivery';
import { Booking } from './booking';

export class UserAWB {
  public prefix: string;
  public serial: string;
  public bookingInfo: Booking;
  public deliveryInfo: Delivery;

  constructor( prefix: string = '',
               serial: string = '',
               deliveryInfo: Delivery,
               bookingInfo: Booking) {
    //
    this.prefix = prefix;
    this.serial = serial;
    this.deliveryInfo = deliveryInfo;
    this.bookingInfo = bookingInfo;
  }

}

import { Delivery } from './delivery';

export class UserAWB {
  public prefix: string;
  public serial: string;
  public deliveryInfo: Delivery;

  constructor( prefix: string = '',
               serial: string = '',
               deliveryInfo: Delivery ) {
    //
    this.prefix = prefix;
    this.serial = serial;
    this.deliveryInfo = deliveryInfo;
  }

}

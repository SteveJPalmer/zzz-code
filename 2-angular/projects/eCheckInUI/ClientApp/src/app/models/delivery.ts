export class Delivery {
  public piecesRecievedDelivered: string;
  public weightReceivedDelivered: string;
  public volumeReceivedDelivered: string;

  constructor( piecesRecievedDelivered: string,
               weightReceivedDelivered: string,
               volumeReceivedDelivered: string) {
    //
    this.piecesRecievedDelivered = piecesRecievedDelivered;
    this.weightReceivedDelivered = weightReceivedDelivered;
    this.volumeReceivedDelivered = volumeReceivedDelivered;
  }

}

export class Consignment {

  public expectedNumberOfPieces: string;
  public expectedWeight: string;
  public expectedVolume: string;
  public weightCode: number;

  constructor( expectedNumberOfPieces: string = '',
               expectedWeight: string = '',
               expectedVolume: string = '',
               weightCode: number = 1 ) {
    //
    this.expectedNumberOfPieces = expectedNumberOfPieces;
    this.expectedWeight = expectedWeight;
    this.expectedVolume = expectedVolume;
    this.weightCode = weightCode;
  }

}

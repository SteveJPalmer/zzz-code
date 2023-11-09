export class Location {

  public code: string;
  public pieces: string;
  public weight: string;
  public volume: string;
  public shcs: string;
  public groupNumber: string;

  constructor( code: string = '',
               pieces: string = '',
               weight: string = '',
               volume: string = '',
               shcs: string = '',
               groupNumber: string = '' ) {
    //
    this.code = code;
    this.pieces = pieces;
    this.weight = weight;
    this.volume = volume;
    this.shcs = shcs;
    this.groupNumber = groupNumber;
  }

}

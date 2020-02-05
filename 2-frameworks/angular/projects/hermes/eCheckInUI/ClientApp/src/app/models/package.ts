import { WeightCode } from './enums';

export class Package {

  public numberOfPieces: string;
  public weight: string;
  public volume: string;
  public weightCode: WeightCode;
  public isLoaded: boolean;

  constructor( numberOfPieces: string = '',
               weight: string = '',
               volume: string = '',
               weightCode: WeightCode = 1,
               isLoaded: boolean = false ) {
    //
    this.numberOfPieces = numberOfPieces;
    this.weight = weight;
    this.volume = volume;
    this.weightCode = weightCode;
    this.isLoaded = isLoaded;
  }

}

import { Loose } from './loose';

export class Manifest {
 public looseCargoInfo: Array<Loose>;

  constructor( looseCargoInfo: Array<Loose> = [] ) {
    //
    this.looseCargoInfo = looseCargoInfo;
  }

}

import { Loose } from './loose';

export class VCTManifest {
 public looseCargoInfo: Array<Loose>;

  constructor( looseCargoInfo: Array<Loose> = [] ) {
    //
    this.looseCargoInfo = looseCargoInfo;
  }

}

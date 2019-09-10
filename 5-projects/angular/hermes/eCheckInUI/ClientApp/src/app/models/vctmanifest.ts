import { Loose } from './loose';
import { ULD } from './uld';

export class VCTManifest {
 public looseCargoInfo: Loose;
 public uldCargoInfo: Array<ULD>;

  constructor( looseCargoInfo: Loose = null,
               uldCargoInfo: Array<ULD> = null ) {
    //
    this.looseCargoInfo = looseCargoInfo;
    this.uldCargoInfo = uldCargoInfo;
  }

}


import { ULDMetadata } from './uldmetadata';

export class ULD {

  public uldMetadata: ULDMetadata;
  public containerContentInfo: object;

  constructor ( uldMetadata: ULDMetadata = null,
                containerContentInfo: object = null ) {
    //
    this.uldMetadata = uldMetadata;
    this.containerContentInfo = containerContentInfo;
  }

}

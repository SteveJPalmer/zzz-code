import { VCTRequest } from './vctrequest';
import { Vehicle } from './vehicle';
import { VCTManifest } from './vctmanifest';
import { VCTRequestStatus } from './enums';

export class ExportVCTRequest extends VCTRequest {
  public customer: string;

  constructor (customer: string,
               vehicleInfo: Vehicle,
               vctManifestInfo: VCTManifest,
               deliveryMethod: number ) {
    //
    super(vehicleInfo, vctManifestInfo, null, VCTRequestStatus['Waiting for Submission'], null, 0, deliveryMethod );
    this.customer = customer;
  }
};

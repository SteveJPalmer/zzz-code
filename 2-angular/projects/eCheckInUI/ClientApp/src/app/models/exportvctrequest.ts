import { VCTRequest } from './vctrequest';
import { Vehicle } from './vehicle';
import { VCTManifest } from './vctmanifest';
import { VCTRequestStatus } from './enums';

export class ExportVCTRequest extends VCTRequest {
  public customer: string;

  constructor (customer: string,
               vehicleInfo: Vehicle,
               vctManifestInfo: VCTManifest,
               groundHandlerId: string,
               deliveryMethod: number ) {
    //
    super(null, vehicleInfo, vctManifestInfo, null, null, VCTRequestStatus['Waiting for Submission'], groundHandlerId, null, 0, null, deliveryMethod);
    this.customer = customer;
  }
};

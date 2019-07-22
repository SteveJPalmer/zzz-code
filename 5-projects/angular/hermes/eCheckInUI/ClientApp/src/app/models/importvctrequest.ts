import { VCTRequest } from './vctrequest';
import { Appointment } from './appointment';
import { Vehicle } from './vehicle';
import { VCTManifest } from './vctmanifest';
import { VCTRequestStatus } from './enums';

export class ImportVCTRequest extends VCTRequest {

  public appointmentInfo: Appointment;

  constructor( appointmentInfo: Appointment = null,
               vehicleInfo: Vehicle,
               vctManifestInfo: VCTManifest,
               deliveryMethod: number ) {
    //
    super(vehicleInfo, vctManifestInfo, null, VCTRequestStatus['Waiting for Submission'], null, 0, deliveryMethod );
    this.appointmentInfo = appointmentInfo;
  }

}

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
               groundHandlerId: string,
               deliveryMethod: number ) {
    //
    super(null, vehicleInfo, vctManifestInfo, null, null, VCTRequestStatus['Waiting for Submission'], groundHandlerId, null, 0, null, deliveryMethod);
    this.appointmentInfo = appointmentInfo;
  }

}

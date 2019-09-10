import { Vehicle } from './vehicle';
import { VCTManifest } from './vctmanifest';
import { VCTRequestStatus } from './enums';

export class VCTRequest {
  public id: string;
  public vehicleInfo: Vehicle;
  public vctManifestInfo: VCTManifest;
  public uldRejections: object;
  public awbRejections: object;
  public vctRequestStatus: VCTRequestStatus;
  public groundHandlerId: string;
  public vctNumber: string;
  public requestDateTime: number;
  public remarks: string;
  public deliveryMethod: number;
  public statusReason: number;

  constructor( id: string = '',
               vehicleInfo: Vehicle = null,
               vctManifestInfo: VCTManifest = null,
               uldRejections: object = null,
               awbRejections: object = null,
               vctRequestStatus: VCTRequestStatus = 1,
               groundHandlerId: string = '',
               vctNumber: string = null,
               requestDateTime: number = 0,
               remarks: string = '',
               deliveryMethod: number = null,
               statusReason: number = 0 ) {
    //
    this.id = id;
    this.vehicleInfo = vehicleInfo;
    this.vctManifestInfo = vctManifestInfo;
    this.uldRejections = uldRejections;
    this.awbRejections = awbRejections;
    this.vctRequestStatus = vctRequestStatus;
    this.groundHandlerId = groundHandlerId;
    this.vctNumber = vctNumber;
    this.requestDateTime = requestDateTime;
    this.remarks = remarks;
    this.deliveryMethod = deliveryMethod;
    this.statusReason = statusReason;
  }
}

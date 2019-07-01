import { Vehicle } from './vehicle';
import { VCTManifest } from './vctmanifest';
import { VCTRequestStatus } from './enums';

export class VCTRequest {
  public vehicleInfo: Vehicle;
  public vctManifestInfo: VCTManifest;
  public id: string;
  public vctRequestStatus: VCTRequestStatus;
  public vctNumber: string;
  public requestDateTime: number;
  public deliveryMethod: number;

  constructor( vehicleInfo: Vehicle = null,
               vctManifestInfo: VCTManifest = null,
               id: string = '',
               vctRequestStatus: VCTRequestStatus = 1,
               vctNumber: string = null,
               requestDateTime: number = 0,
               deliveryMethod: number = null ) {
    //
    this.vehicleInfo = vehicleInfo;
    this.vctManifestInfo = vctManifestInfo;
    this.id = id;
    this.vctRequestStatus = vctRequestStatus;
    this.vctNumber = vctNumber;
    this.requestDateTime = requestDateTime;
    this.deliveryMethod = deliveryMethod;
  }
}

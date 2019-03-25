import { VCTRequest } from './vctrequest';
import { Vehicle } from './vehicle';
import { Manifest } from './manifest';

export class ExportVCTRequest extends VCTRequest {
  public customer: string;
  public vehicleInfo: Vehicle;
  public manifestInfo: Manifest;

  constructor (id: string = '',
               vctRequestStatus: number = 1,
               customer: string,
               vehicle: Vehicle,
               manifestInfo: Manifest) {
    //
    super(id, vctRequestStatus);
    this.customer = customer;
    this.vehicleInfo = vehicle;
    this.manifestInfo = manifestInfo;
  }
};

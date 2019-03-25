export class VCTRequest {
  public id: string;
  public vctRequestStatus: number;
  public assignedTo: string;
  public originator: string;
  public vctNumber: string;
  public vctCreatedDate: number;

  constructor(id: string = '',
              vctRequestStatus: number = 1,
              assignedTo: string = '',
              originator: string = '',
              vctNumber: string = '') {
    //
    this.id = id;
    this.vctRequestStatus = vctRequestStatus;
    this.assignedTo = assignedTo;
    this.originator = originator;
    this.vctNumber = vctNumber;
  }
}

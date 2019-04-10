export class AWBStatusInfo {

  public id: string;
  public awbNumber: string;
  public status: string;

  constructor( id: string = '',
               awbNumber: string = '',
               status: string = '' ) {
    //
    this.id = id;
    this.awbNumber = awbNumber;
    this.status = status;
  }

}

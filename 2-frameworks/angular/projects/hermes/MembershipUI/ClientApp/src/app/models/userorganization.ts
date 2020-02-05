export class UserOrganization {

  public organizationId: string;
  public organizationName: string;
  public isGroundHandler: string;
  public isAgent: string;
  public isHaulier: string;
  public isDriver: string;
  public location: string;

  constructor( organizationId: string = '',
               organizationName: string = '',
               isGroundHandler: string = '',
               isAgent: string = '',
               isHaulier: string = '',
               isDriver: string = '',
               location: string = '') {
    //
    this.organizationId = organizationId;
    this.organizationName = organizationName;
    this.isGroundHandler = isGroundHandler;
    this.isAgent = isAgent;
    this.isHaulier = isHaulier;
    this.isDriver = isDriver;
    this.location = location;
  }

}

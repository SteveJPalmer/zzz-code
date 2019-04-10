export class User {

  public name: string;
  public email: string;
  public defaultGroundHandler: string;

  constructor( name: string = '',
               email: string = '' ) {
    //
    this.name = name;
    this.email = email;
  }

}

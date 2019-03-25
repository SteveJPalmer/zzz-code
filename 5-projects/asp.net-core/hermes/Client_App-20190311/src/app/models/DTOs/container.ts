import { UserAWB } from './userawb';

export class Container {
  public userProvidedAWBs: Array<UserAWB>;

  constructor( userProvidedAWBs: Array<UserAWB> ) {
    //
    this.userProvidedAWBs = userProvidedAWBs;
  }

}

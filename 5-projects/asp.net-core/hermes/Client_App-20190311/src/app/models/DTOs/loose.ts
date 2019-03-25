import { Container } from './container';
import { UserAWB } from './userawb';

export class Loose extends Container {

  constructor ( userProvidedAWBs: Array<UserAWB> ) {
    //
    super( userProvidedAWBs );
  }

}

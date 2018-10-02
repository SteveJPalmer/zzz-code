import { Injectable } from '@angular/core';

//temp mock for heroes data service
import { HEROES }     from './mock-heroes';

//logging service
import { Logger }     from '../logger/logger.service';

@Injectable()
export class HeroService {
  /* don't forget to register Logger service (either module or component)
     as used across app, best register logger in module  */

  //constructor shorthand, auto-creates class prop
  constructor(private logger: Logger) { }    //inject instance of Logger to to provide logging

  getHeroes() {
    this.logger.log('Fetching heroes data..');
    this.logger.log('Fetching heroes data again..');
    return HEROES;
  }
}

import { Injectable, Output, EventEmitter } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
//import { ActivateLoginResponse } from '../models/activation/activateLoginResponse';
//import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
//import { UserDetailsResponse } from '../models/activation/userDetailsResponse';
//import { UserAgreementVersion } from '../models/activation/useragreementversion';
//import { SignUserAgreementsRequest } from '../models/activation/signuseragreementsrequest';
//import { ApplicationUser } from '../models/general/applicationUser';
//import { ServiceBase } from './service-base.service';
//import { BasketTransaction } from '../models/online-transaction/baskettransaction';
//import { ServiceDetails } from '../models/services/servicedetails';
//import { ServiceProviderDetails } from '../models/risca/service-provider-details';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ServiceBase } from './service-base.service';
import { ApplicationUser } from '../models/applicationUser';


@Injectable()
export class UserService extends ServiceBase {

  constructor() {
    super();
  }
}


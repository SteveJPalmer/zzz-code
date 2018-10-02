import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserProfileService } from './user-profile.service';

@Injectable()
export class LoginService {
  constructor(private userProfileService: UserProfileService) { }

  login() {
    return Observable.of(true)
        .delay(1000)
        .do(this.toggleLogState.bind(this));
  }

  logout() {
    this.toggleLogState(false);
  }

  private toggleLogState(val: boolean) {
    this.userProfileService.isLoggedIn = val;
  }
}


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
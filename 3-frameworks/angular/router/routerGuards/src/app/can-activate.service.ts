import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { UserProfileService } from './login/user-profile.service';

@Injectable()
export class CanActivateAuthGuard implements CanActivate, CanActivateChild {
  constructor(private userProfileService: UserProfileService, private router: Router) { }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('canActivateChild guard called');
    return this.canActivate(next, state);
    // return false;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('canActivate guard called');
    if (this.userProfileService.isLoggedIn) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { redirectTo: state.url } });
    return false;
  }
}


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { OrgsService } from '../Services';
import { MapToIterable } from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../models';

@Injectable()
export class NavMenuService  {
  title: string;
  navElem: HTMLElement;
  initialLoad: boolean = true;
  userDetails: User;
  userDataFetched: boolean = false;
  // GH control
  groundHandlers: Array<any> = [];
  selectedGH: string;
  dataFetched: boolean = false;
  ghDefaulted: boolean = false;
  errorRaised: boolean = false;
  noGroundHandlerWarning: boolean = false;
  userDefaultGroundHandler: string;

  constructor( @Inject(DOCUMENT) private document: any,
               private orgsService: OrgsService,
               private spinner: NgxSpinnerService ) { }

  // set Title
  setPageTitle(title: string) {
    this.title = title;
  }

  // toggle background image
  mblBackImg(isActive: boolean) {
    if (window.matchMedia('(max-width: 991px)').matches) {
      this.navElem = document.getElementById('hl-bg') as HTMLElement;
      if (isActive) {
        this.navElem.classList.add('bg-image');
      }
      else {
        this.navElem.classList.remove('bg-image');
      }
    }
  };

  isMobile() {
    let isMobile: boolean = true;
    if (window.matchMedia('(min-width: 992px)').matches) {
      isMobile = false;
    }
    return isMobile;
  }

  async setupUserAccount() {
    this.spinner.show();
    const res = await this.orgsService.getThisUserProfile();
    if (res.error === true)  {
      this.errorRaised = true;
      this.spinner.hide();
      return Promise.reject(400);
    } else {
      this.userDetails = res;
    }
    //console.log('>>NavMenu Service > setupUserAccount(): isError: ' + this.errorRaised);
    //console.log('>>NavMenu Service > setupUserAccount():: res: ' + JSON.stringify(res ,null,2));
    return res;
  }


  isSuperUser() {
     return this.userDetails.defaultGroundHandler === 'HERMES';
  }

  getUserGroundHandlers() {
    this.orgsService.getThisUserGroundHandlers().then(res => {
      if (res.error == true) {
        this.errorRaised = true;
      }
      else {
        this.setUsersGroundHandler(res)
      }
      this.spinner.hide();
    });
  }

  setUsersGroundHandler(res) {
    this.groundHandlers = new MapToIterable().transform(res, null);
    this.dataFetched = true;
    this.noGroundHandlerWarning = false;
    if (this.groundHandlers.length == 0) {        //no GH for user warning
      this.noGroundHandlerWarning = true;
    }
    else if (this.groundHandlers.length == 1) {   //default GH
      this.selectedGH = this.groundHandlers[0].key;
      this.ghDefaulted = true;
    }
    else {                                        //multiple GH - check for users' last used prop
      if ( this.userDefaultGroundHandler ) {
        this.selectedGH = this.userDefaultGroundHandler;    //user profile default returned
      }
      else {
        this.selectedGH = this.groundHandlers[0].key;       //set to first GH in list
      }
    }
  }

  setUsersDefaultGroundHandler(gh: string) {
    this.userDefaultGroundHandler = gh;
  }

  setGroundHandler(idx: number) {
    this.selectedGH = this.groundHandlers[idx].key;
  }

  initializeGroundHandlers() {
    this.orgsService.getThisUserProfile().then(res => {
      if (!res) {
        this.spinner.hide();
        this.noGroundHandlerWarning = true;
        toastr.warning(`No GroundHandlers found for your user.
                     <i style="font-size:0.85em;">(Please contact support desk)</i>`)
              .css("width","360px");     //app error - no associated user profile exists yet
      }
      else if (res.error == true)  {
        this.errorRaised = true;
        this.spinner.hide();
      }
      else {
        this.setUsersDefaultGroundHandler(res.defaultGroundHandler);
        this.getUserGroundHandlers();
      }
    });
  }

}

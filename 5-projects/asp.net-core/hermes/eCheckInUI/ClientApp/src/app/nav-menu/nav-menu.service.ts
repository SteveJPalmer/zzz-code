import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { OrgsService } from '../Services';
import { MapToIterable } from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class NavMenuService  {
  title: string;
  navElem: HTMLElement;
  initialLoad: boolean = true;

  //GH control
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

  getUserGroundHandlers() {
    //
    this.orgsService.getThisUserGroundHandlers().then(res => {
      if (res.error == true) {
        this.errorRaised = true;
      }
      else {
        this.groundHandlers = new MapToIterable().transform(res, null);
        this.dataFetched = true;

        if (this.groundHandlers.length == 0) {
          //no GH for user warning
          this.noGroundHandlerWarning = true;
        }
        else if (this.groundHandlers.length == 1) {
          //default GH
          this.selectedGH = this.groundHandlers[0].key;
          this.ghDefaulted = true;
        }
        else {
          //multiple GH - check for users' last used prop
          if ( this.userDefaultGroundHandler ) {
            this.selectedGH = this.userDefaultGroundHandler;    //user profile default returned
          }
          else {
            this.selectedGH = this.groundHandlers[0].key;       //set to first GH in list
          }
        }
      }
      this.spinner.hide();
    });
  }

  setGroundHandler(idx) {
    //console.info('>>selectedGH: ' + this.groundHandlers[idx].key);
    this.selectedGH = this.groundHandlers[idx].key;
  }

  initializeGroundHandlers() {
    this.orgsService.getThisUserProfile().then(res => {
      if (res.error == true)  {
        this.errorRaised = true;
        this.spinner.hide();
      }
      else {
        this.userDefaultGroundHandler = res.defaultGroundHandler;
        this.getUserGroundHandlers();
      }
    });
  }

}

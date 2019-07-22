import { Component, OnInit } from '@angular/core';

import { NavMenuService } from '../nav-menu/nav-menu.service';
import { hlList } from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  animations: [ hlList ]
})
export class PortalComponent implements OnInit {
  title: string = 'Portal';
  userDataFetched: boolean = false;
  isSuperUser: boolean;
  errorRaised: boolean = false;

  constructor( public navMenu: NavMenuService,
               private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    this.navMenu.setPageTitle(this.title);
    if ( this.navMenu.initialLoad ) {
      this.navMenu.initialLoad = false;
      this.navMenu.setupUserAccount()
        .then( res => {
          // console.log('>>Portal comp > ngOnInit() setupUserAccount - promise returned');
          this.navMenu.userDataFetched = true;
          this.isSuperUser = this.navMenu.isSuperUser();
          this.spinner.hide();
        })
        .catch( err => {
          this.errorRaised = true;
        });
    } else {
      this.spinner.hide();
    }
  }

}

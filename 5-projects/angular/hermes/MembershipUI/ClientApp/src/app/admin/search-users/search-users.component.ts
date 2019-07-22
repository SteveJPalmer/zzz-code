import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { hlAdminRoute } from '../admin-animations';

import { NavMenuService } from '../../nav-menu/nav-menu.service';
import { OrgsService } from '../../Services';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrganizationType } from '../../models';

@Component({
  selector: 'admin-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss'],
  animations: [ hlAdminRoute ]
})
export class SearchUsersComponent implements OnInit, AfterViewInit  {
  @ViewChild('searchrv') searchrv: ElementRef;
  state: string = 'show';
  orgType: OrganizationType;
  errorRaised: boolean = false;
  search: string;
  searchResults: any;
  dataRetrieved: boolean = false;
  inviteEmail: string;

  constructor( private router: Router,
               private route: ActivatedRoute,
               public navMenu: NavMenuService,
               private orgsService: OrgsService,
               private spinner: NgxSpinnerService,
               private renderer: Renderer2,
               private elRef: ElementRef
                ) {}

  onTabChange(e) {
    let index = e.index;
    //console.info('>>SearchUsers - onTabChange().. event: ' + JSON.stringify(e, null,2));
    setTimeout( () => {
      if (index === 1) {
        this.renderer.selectRootElement('.emailf').focus();
      } else {
        this.searchrv.nativeElement.focus();
      }}, 0 );
  }

  validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  searchUsers() {
    this.spinner.show();
    this.dataRetrieved = false;
    let name: string,
        email: string,
        searchAs: string,
        searchFor: string;
    if (this.orgType === OrganizationType.HERMESUPERUSER) {
      searchAs = OrganizationType[OrganizationType.HERMESUPERUSER];
      searchFor = OrganizationType[OrganizationType.GROUNDHANDLER];
    } else {
      searchAs = OrganizationType[OrganizationType.GROUNDHANDLER];
      searchFor = OrganizationType[this.orgType];
    }
    if ( this.validateEmail(this.search) ) {
      email = this.search;
    } else {
      name = this.search;
    }
    // console.info(`>>SearchUsers call- searchUsers(${searchAs},${searchFor},${name},${email} )`);
    this.orgsService.searchUsers( searchAs, searchFor, name, email )
      .then(res => {
        if (res.error === true) {
          this.errorRaised = true;
        } else {
          this.searchResults = res;
          this.dataRetrieved = true;
        }
        this.spinner.hide();
      });
  }

  sendInvite( email: string ) {
    this.spinner.show();
    //console.log('>>Search comp - sendInvite() - email: ' + email);
    const invitedAs: OrganizationType = this.orgType;
    this.orgsService.inviteUser( invitedAs, email )
      .then(res => {
        this.spinner.hide();
        if (res.body && res.body.error === true) {
          this.errorRaised = true;
        } else {
          toastr.info(`<b>Success</b>: Invite sent to user.`);
        }
      this.inviteEmail = '';
      this.router.navigate(['/admin/associations']);
    });
  }

  ngOnInit(): void {
    //console.log('>>router' + this.router);
    //console.log('>>route' + this.route);  // add breakpoints to dig deeper
    this.route.paramMap.subscribe(pmap => {
      var pmapType = pmap.get('orgType');
      this.orgType = +pmapType;
    });
    // console.info('>>SearchUsers Comp: router required Params - orgType:' + this.orgType);
    // console.info('>>SearchUsers Comp: router required Params - orgType(string):' + OrganizationType[this.orgType]);
    this.spinner.hide();
  }

  ngAfterViewInit() {
    this.searchrv.nativeElement.focus();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavMenuService } from '../../nav-menu/nav-menu.service';
import { OrgsService } from '../../Services';
import { UserOrganization } from '../../models';
import { NgxSpinnerService } from 'ngx-spinner';
import { hlAdminRoute, hlAdminView } from '../admin-animations';

@Component({
  selector: 'admin-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.scss'],
  animations: [ hlAdminRoute, hlAdminView ]
})
export class OrgDetailsComponent implements OnInit {
  state: string = 'show';
  userOrg: UserOrganization = new UserOrganization();
  noOrgMsg: boolean = false;
  showNewOrgFrom: boolean = false;
  orgInfo: UserOrganization = new UserOrganization();
  isAgent: boolean = false;
  dataFetched: boolean = false;
  noInviteMsg: boolean = false;
  errorRaised: boolean;

  constructor( private router: Router,
               public navMenu: NavMenuService,
               private orgsService: OrgsService,
               private spinner: NgxSpinnerService ) { }

  onCreate() {
    this.spinner.show();
    this.orgsService.CreateOrganization( this.orgInfo )
      .then(res => {
        if (res == null) {
          toastr.info(`<b>Success</b>: Created new Organization.`).css("width","330px");
          this.checkInvite();
        } else {
          this.errorRaised = true;
        }
        this.spinner.hide();
      });
  }

  checkInvite() {
    this.spinner.show();
    this.orgsService.getIncomingInvites()
      .then(res => {
        if (res.error === true)  {
          this.errorRaised = true;
        } else {
          if ( res && res.length == 0 ) {
            this.noInviteMsg = true;
          } else {
            this.noInviteMsg = false;
          }
          // console.log('>>org comp > checkInvite >getIncomingInvites: noInviteMsg: ' + this.noInviteMsg);
          // console.log('>>org comp > checkInvite >getIncomingInvites res: ' + JSON.stringify(res , null, 2));
        }
        this.spinner.hide();
        if ( this.noInviteMsg ) {
          toastr.warning(`Ask GH/Hermes to invite you to be able to work with their Org.`).css('width','330px');
          this.showNewOrgFrom = false;
          this.noOrgMsg = false;
        } else {
          this.router.navigate(['/admin/associations']);
        }
      });
}

  ngOnInit() {
    this.dataFetched = false;
    this.orgsService.getUserOrgs()
    .then(res => {
      if (res.error === true)  {
        this.errorRaised = true;
        this.spinner.hide();
      } else {
        if ( res.orgs && res.orgs[0] ) {
          this.noOrgMsg = false;
          this.userOrg = res.orgs[0];
        } else {
          this.noOrgMsg = true;   // show create msg
        }
        this.dataFetched = true;
        // console.log('>>org details comp > onInit > userOrgs: ' + JSON.stringify(this.userOrg ,null,2));
        this.spinner.hide();
      }
    });
  }

}

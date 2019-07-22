import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NavMenuService } from '../../nav-menu/nav-menu.service';
import { OrgsService } from '../../Services';
import { NgxSpinnerService } from 'ngx-spinner';
import { InviteStatus, OrganizationType } from '../../models';
import { hlAdminRoute, hlAdminView } from '../admin-animations';

@Component({
  selector: 'admin-associations',
  templateUrl: './associations.component.html',
  styleUrls: ['./associations.component.scss'],
  animations: [ hlAdminRoute, hlAdminView ]
})
export class AssociationsComponent implements OnInit {
  state: string = 'show';
  errorRaised: boolean = false;
  dataFetched: boolean = false;
  isSuperUser: boolean;
  isInvite: boolean = false;
  organizationType = OrganizationType;
  // invites
  pendingInvite: any = {};
  inviteAccepted: boolean = false;
  inviteRejected: boolean = false;
  invitedUsers: any = [];
  InviteStatus = InviteStatus;

  constructor( private router: Router,
               private route: ActivatedRoute,
               private navMenu: NavMenuService,
               private orgsService: OrgsService,
               private spinner: NgxSpinnerService ) { }

  showSearchUsers( orgType: string ) {
    this.router.navigate(['./search-users', orgType], {relativeTo: this.route});
  }

  async checkInvites() {
    const res = await this.orgsService.getIncomingInvites();
    if (res.error === true)  {
      return Promise.reject(400);
    } else {
      if ( res.length === 0 ) {
        this.isInvite = false;
      } else {
        this.pendingInvite = res[0];
        if ( this.pendingInvite.inviteStatus === 1 ) {
          this.isInvite = true;
        }
      }
      // console.log('>>Associations comp > checkInvites(): isInvite: ' + this.isInvite);
      // console.log('>>Associations comp > checkInvites(): res: ' + JSON.stringify(res ,null,2));
    }
    return res;
  }

  onAccepted ( event: string ) {
    // console.log('>>Associations comp > acceptInvite > emit: ' + event);
    switch (event) {
      case 'accept':
        this.inviteAccepted = true;
        this.isInvite = false;
        break;
      case 'reject':
        this.inviteRejected = true;
        this.isInvite = false;
        break;
      case 'cancel':
        this.isInvite = false;
        break;
      case 'error':
        this.errorRaised = true;
        break;
      default:
        console.log('unrecognised emitted value');
    }
  }

  ngOnInit() {
    this.checkInvites()
      .then( res => {
          this.isSuperUser = this.navMenu.isSuperUser();
          // console.log('>>Association comp > ngOnInit > isSuperUser: ' +  this.isSuperUser );
          this.orgsService.getInvitedUsers()
            .then(res => {
              if (res.error === true)  {
                this.errorRaised = true;
              } else {
                this.invitedUsers = res;
                // console.log('>>Association comp > ngOnInit > getInvitedUsers() res: ' + JSON.stringify(res, null, 2));
              }
              this.dataFetched = true;
              this.spinner.hide();
            });
      })
      .catch( err => {
        this.errorRaised = true;
      });
  }

}

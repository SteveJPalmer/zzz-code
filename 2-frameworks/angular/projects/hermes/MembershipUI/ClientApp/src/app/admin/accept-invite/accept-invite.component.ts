import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { OrganizationType } from '../../models';
import { OrgsService } from '../../Services';
import { NgxSpinnerService } from 'ngx-spinner';
import { hlAdminRoute, hlAdminView } from '../admin-animations';

@Component({
  selector: 'admin-accept-invite',
  templateUrl: './accept-invite.component.html',
  styleUrls: ['./accept-invite.component.scss'],
  animations: [ hlAdminRoute, hlAdminView ]
})
export class AcceptInviteComponent {
  state: string = 'show';
  _invite: any;
  passcode: string;
  organizationType = OrganizationType;
  errorRaised: boolean = false;

  // @Input() invite: string;
  @Input()
  set invite(invite: string) {
    //console.info(`>>Accept Invite comp > set invite: ${JSON.stringify(invite,null,2)}`);
    this._invite = invite;
  }
  get invite(): string { return this._invite; }
  @Output() accepted = new EventEmitter<string>();

  constructor ( private router: Router,
                private orgsService: OrgsService,
                private spinner: NgxSpinnerService ) { }

  acceptInvite() {
    this.spinner.show();
    this.errorRaised = false;
    this.orgsService.acceptInvite(this._invite.organizationId, this._invite.invitedAs, this.passcode)
      .then(res => {
        if (res == null) {
          toastr.info(`<b>Success</b>: Accepted Invitation.`);
        } else {
          this.errorRaised = true;
          if (res.text) {
            // show app err via non-blocking notification
            var errorTitle = 'Application Message';
            var errorMsg = `<section class="error-req">
                            <span class="error-req-msg">${res.text}</span>
                            <span class="error-req-footer app-error-req-footer">(Click to clear this message)</span>
                          </section>`;
            var errorOptions = {"timeOut": 0, "extendedTimeOut": 0};
            toastr.warning(errorMsg, errorTitle, errorOptions).css("width", "495px");
          }
        }
        this.passcode = '';
        this.spinner.hide();
        this.accepted.emit(!this.errorRaised ? 'accept' : 'error' );
      });
  }

  rejectInvite() {
    this.spinner.show();
    this.errorRaised = false;
    this.orgsService.rejectInvite(this._invite.organizationId, this._invite.invitedAs)
      .then(res => {
        if (res == null) {
          toastr.info(`<b>Success</b>: Rejected Invitation.`);
        } else {
          this.errorRaised = true;
        }
        this.spinner.hide();
        this.accepted.emit('reject');
      });
  }

  cancel() {
    this.accepted.emit('cancel');
  }

}



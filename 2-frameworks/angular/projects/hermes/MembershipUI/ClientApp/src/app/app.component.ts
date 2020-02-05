import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor( private spinner: NgxSpinnerService,
               private router: Router,
               private authService: MsalService,
               private broadcastService: BroadcastService) {

    this.broadcastService.subscribe('msal:loginSuccess', payload => {
      // Temporary solution to avoid 'X-Frame-Options' error on password reset. MSAL not yet supporting auto login after password reset.
      if (document.referrer.toLowerCase().indexOf(environment.B2CPwdResetPolicyName) > -1) {
        this.authService.logout();
        window.alert("Password changed successfully. Please login with new password");
      }
    });

    if (this.forgotPassword()) {
      this.navigateToForgotPassword();
    }

    router.events.subscribe( evt => {
      if (evt instanceof NavigationStart) {
        //console.log('NavStart: ' + evt);
        this.spinner.show();
      }
      if( evt instanceof NavigationEnd ){
        console.log('NavEnd: ' + evt);
        if ( evt.url != '/e-tickets' && evt.url != '/e-tickets') {
          this.spinner.hide();
        }
      }
      // hide  spinner in case a request fails
      if (evt instanceof NavigationCancel || evt instanceof NavigationError) {
        this.spinner.hide();
      }
    });
  }

  // Determine if user clicked "Forgot Password"
  forgotPassword() {
    const storage = this.authService.getCacheStorage();
    const authError: string = storage.getItem('msal.login.error') ? storage.getItem('msal.login.error') : null;
    if (authError && authError.indexOf(environment.B2CForgotPwdErrorCode) > -1) {
      return true;
    }

    return false;
  }

  navigateToForgotPassword() {
    this.authService.authority = this.authService.authority.replace(environment.B2CAuthority.toLowerCase(), environment.B2CPwdResetPolicyURL.toLowerCase());
    this.authService.loginRedirect();
  }


  ngOnInit() {
    //config - app non-blocking notifications
    toastr.options = {
      "timeOut":4000,
      "extendedTimeOut": 3000,
      "positionClass": "toast-top-right",
      "closeButton": false,
      "showMethod": "slideDown"
    };
  }

}

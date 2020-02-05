import { Component, OnInit } from '@angular/core';
import { NavMenuService } from './nav-menu.service';
import { MsalService } from '@azure/msal-angular';
import { OrgsService } from '../Services';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  appVersion = environment.appVersion;
  user: string;
  avatarName: string;
  userEmail: string;

  constructor( public navMenu: NavMenuService,
               public authService: MsalService,
               private orgsService: OrgsService,
               private router: Router ) {}

  collapse() {
    this.isExpanded = false;
  };

  toggle() {
    this.isExpanded = !this.isExpanded;
  };

  logout() {
    this.authService.logout();
  }

  isLoggedIn() {
    return this.authService.getUser() != null;
  }

  getAvatarName() {
    let id: any = this.authService.getUser().idToken;
    this.user = id.name + ' ' + id.family_name;
    this.avatarName = id.name.substring(0, 1).toUpperCase() + id.family_name.substring(0, 1).toUpperCase();
    this.userEmail = id.emails[0];
    return this.avatarName;
  }

  onGHChanged(idx) {
    this.navMenu.setGroundHandler(idx);
    //update user profile
    this.orgsService.updateThisUserDefaultGroundHandler( this.navMenu.selectedGH )
      .then(res => {
        this.navMenu.setUsersDefaultGroundHandler(this.navMenu.selectedGH);
        this.router.navigate(['/e-checkin']);
      });
  }

  isGHSelected(idx) {
     return this.navMenu.groundHandlers[idx].key == this.navMenu.selectedGH;
  }

  displayGroundHandler() {
    let displayValue = '';
    if (this.navMenu.selectedGH) {
      let index =  this.navMenu.groundHandlers.findIndex(x => x.key == this.navMenu.selectedGH);
      displayValue = this.navMenu.groundHandlers[index].val;
    }
    return displayValue;
  }

  ngOnInit(): void {
    //console.log('>>navBar.comp > onInit() called');
  }

}

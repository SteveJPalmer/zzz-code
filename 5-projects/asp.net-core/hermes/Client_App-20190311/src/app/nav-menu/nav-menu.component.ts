import { Component } from '@angular/core';

import { NavMenuService } from './nav-menu.service';

import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;
  appVersion = 'Beta:1.1.3';
  user: string;
  avatarName: string;
  userEmail: string;

  constructor(public navMenu: NavMenuService, public authService: MsalService ) {}

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
    this.avatarName = id.name.substring(0, 1) + id.family_name.substring(0, 1);
    this.userEmail = id.emails[0];
    return this.avatarName;
  }
}

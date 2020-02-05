import { Component, OnInit } from '@angular/core';

import { NavMenuService } from '../../nav-menu/nav-menu.service';
import { hlList } from '../../shared';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [ hlList ]
})
export class AdminComponent implements OnInit {
  title: string = 'Admin';

  constructor( private navMenu: NavMenuService ) { }

  ngOnInit() {
    this.navMenu.setPageTitle(this.title);
    this.navMenu.setupUserAccount();
  }

}

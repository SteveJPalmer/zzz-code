import { Component, Inject, OnInit } from '@angular/core';
import { NavMenuService } from '../nav-menu/nav-menu.service';
import { VctService } from '../Services/vct.service';
import { hlList } from '../shared/hl-animations';

@Component({
  selector: 'app-echeckin',
  templateUrl: './echeckin.component.html',
  styleUrls: ['./echeckin.component.scss'],
  animations: [ hlList ]
})
export class ECheckInComponent implements OnInit {
  title: string = 'E-Checkin';
  eticketCount: number;
  badgeSpinner = true;

  constructor( private vctService: VctService,
               private navMenu: NavMenuService) { }

  ngOnInit() {
    this.navMenu.setPageTitle(this.title);
    //initial cut for VCT badge total
    // this.badgeSpinner = true;
    // this.vctService.searchVCTs()
    //   .then(res => {
    //     this.eticketCount = res.length;
    //     this.badgeSpinner = false;
    //   });
  };
}


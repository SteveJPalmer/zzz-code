import { Component, OnInit } from '@angular/core';

import { hlAdminRoute } from '../admin-animations';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'admin-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  animations: [ hlAdminRoute ]
})
export class UserDetailsComponent implements OnInit {
  state: string = 'show';

  constructor( private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    this.spinner.hide();
  }

}

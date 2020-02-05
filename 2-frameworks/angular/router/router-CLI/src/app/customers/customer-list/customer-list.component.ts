import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, GuardsCheckStart } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor( private router: Router  ) {

    router.events.subscribe(evt => {
      if (evt instanceof NavigationStart) {
        console.log('NavStart: ' + evt);
      }
      if( evt instanceof NavigationEnd ){
        console.log('NavEnd: ' + evt);
      }
      if( evt instanceof GuardsCheckStart){
        console.log('GuardsCheckStart: ' + evt);
      }
    });
  }

  ngOnInit() {
  }

}

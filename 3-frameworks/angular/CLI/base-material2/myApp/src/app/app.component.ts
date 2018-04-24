import { Component, OnInit } from '@angular/core';

// import * as _ from "lodash";
import { filter as _filter } from 'lodash'

// Material2
import { VERSION } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  version = VERSION;   // Material2 version

  ngOnInit() {
    // check Modernizr integration
    var query = Modernizr.mq('(min-width: 900px)');
    if (query) {
      // the browser window is larger than 900px
      console.info('>>Modernizr integration check: .mq() - window is larger that 900px');
    }
    else {
      console.info('>>Modernizr integration check: .mq() - window is smaller that 900px');
    };


    // check Lodash integration
    var res;
    var users = [
      { name: 'Steve',
        age: 30,
        is_premium: false },
      { name: 'Bob',
        age: 20,
        is_premium: false },
      { name: 'Kylie',
        age: 25,
        is_premium: true }
    ];
    //test out a lodash method
    res = _filter(users, function(value, index, collection) {
      return value.age > 21;
    });
    console.info('>>Lodash integration check: ' + JSON.stringify(res) );  //Steve & Kylie


    // check Material integration
    console.log('>>Material2 integration check - Current Build:' + this.version.full );

  }
}

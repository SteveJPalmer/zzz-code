import { Component } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';
// import { Sanitizer } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private _sanitizer: DomSanitizer){
  }

  title = 'app';

  evilTitle = 'Template <script>alert("evil never sleeps”)</script> <b>syntax</b>';   // !!! XSS attack !!!

  name = 'steve  <b>test bold</b>';
  password = 'xyz';
}

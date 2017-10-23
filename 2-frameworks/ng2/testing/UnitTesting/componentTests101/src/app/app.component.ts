import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h3>Test Suite for {{name}} </h3>`,
  // templateUrl: './app.component.html',

})
export class AppComponent  {
  name = 'Angular2';
}

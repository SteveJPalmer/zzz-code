import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>{{title}}</h1>
             <h2>My favourite hero is: {{myHero}}</h2>
            `
})
export class AppComponent {
  ///model properties
  title = 'Tour of Heroes';
  myHero = 'Steve';
}

import { Component } from '@angular/core';

import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [  /* comment */
    trigger('animateColor', [
      state('inactive', style({
        backgroundColor: 'red',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: 'orange',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('1000ms ease-in')),
      transition('active => inactive', animate('1000ms ease-in'))
    ])
  ]
})
export class AppComponent {
  /* square colour */
  title = 'baseAnimation';
  state = 'inactive';

  toggleState() {
    this.state = (this.state == 'active') ? 'inactive' : 'active';
  };

}

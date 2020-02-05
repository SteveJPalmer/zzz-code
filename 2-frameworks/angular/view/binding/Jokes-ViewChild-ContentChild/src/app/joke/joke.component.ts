import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import { Joke } from './joke';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent {

  @Input("joke") data: Joke;

  /* deep - target child comp template
     to access child comp templates from parent comp, just add @ViewChild to child Comp.
     can then see this as a comp prop via @ViewChild(comp) from parent
  */
  @ViewChild("deep") elemDeep: ElementRef;  //selects elem #1 (temp ref var)
}

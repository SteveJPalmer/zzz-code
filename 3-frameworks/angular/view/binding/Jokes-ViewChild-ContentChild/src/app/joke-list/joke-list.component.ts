import { Component } from '@angular/core';

import { Joke } from '../joke/joke';
import { JokeComponent } from '../joke/joke.component';

import {
   AfterContentInit,
   AfterViewInit,

   ViewChild,
   ViewChildren,
   ContentChild,
   ElementRef,
   QueryList
 } from "@angular/core";


@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.css']
})
export class JokeListComponent implements AfterContentInit, AfterViewInit {

  //create array of new Joke instances
  jokes: Joke[] = [
    new Joke(
      "Why did the teacher have to put the lights on?",
      "Her class was too dim!"
    ),
    new Joke(
      "What can you serve but should never eat?",
      "A tennis ball"
    )
  ];

  /* target Comps */
  @ViewChild(JokeComponent) jokeViewChild: JokeComponent;                    //selects 1st comp instance
  @ViewChildren(JokeComponent) jokeViewChildren: QueryList<JokeComponent>;   //selects all comp instances
  @ContentChild(JokeComponent) jokeContentChild: JokeComponent;   //selects 1st comp instances in <ng-content>

  /* target Elems */
  //elem - #header (temp ref var)
  @ViewChild("header") headerEl: ElementRef;       //selects elem #header (temp ref var)

  /* deep - target child comp template
       1st - add a @ViewChild(TempRefVar) on the child comp, targeting a child template elem
       2nd - can then see this ref within the Comp instance (becomes a child comp prop)
   */
  @ViewChild(JokeComponent) childComp: JokeComponent;  //selects elem #1 (temp ref var)



  constructor() {
    //will show as undefined as neither rendered yet!!
    /*ng renders in tree down approach, so when a parent comp is being constructed the children are not yet created */
    console.log(`new - jokeViewChild is ${this.jokeViewChild}`);
    console.log(`new - jokeContentChild is ${this.jokeContentChild}`);
  }

  ngAfterContentInit() {
    //<ng-content> projected content available (aka transclusion)
    let res = JSON.stringify(this.jokeContentChild,null,2);
    console.log(
      `ngAfterContentInit - jokeContentChild is ${res}`
    );
  }

  ngAfterViewInit() {
    //Child comps available
    //output comp instance
    let res = JSON.stringify(this.jokeViewChild,null,2);
    console.log(`ngAfterViewInit - jokeViewChild is ${res}`);


    //output array of comp instances
    let jokes: JokeComponent[] = this.jokeViewChildren.toArray();
    console.log(jokes);


    /* target Elems */
    //#header  - output selected element
    console.log(`ngAfterViewInit - old header Elem: ${this.headerEl.nativeElement.textContent}`);
    this.headerEl.nativeElement.textContent = "Header dyn changed to...Best Joke Machine";
    console.log(`ngAfterViewInit - new header Elem: ${this.headerEl.nativeElement.textContent}`);


    /* deep - target child comp template */
    console.log(`ngAfterViewInit - ElemDeep: ${JSON.stringify(this.childComp,null,2)}`);
    console.log(`ngAfterViewInit - ElemDeep: ${this.childComp.elemDeep.nativeElement.textContent}`);

  }

}

import { Component, EventEmitter, Input, Output, OnChanges, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Character } from './character.service';

@Component({
  moduleId: module.id,
  selector: 'my-character',
   templateUrl: './character.component.html'
})
export class CharacterComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() character: Character;

  ngAfterViewInit() {
    console.log(`ngAfterViewInit for ${this.character.name}`);
  }

  ngOnChanges() {
    console.log(`ngOnChanges for ${this.character.name}`);
  }

  ngOnDestroy() {
    console.log(`ngOnDestroy for ${this.character.name}`);
  }

  ngOnInit() {
    console.log(`ngOnInit for ${this.character.name}`);
  }
}


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
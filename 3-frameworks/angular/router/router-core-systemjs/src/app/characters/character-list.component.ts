import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Character, CharacterService } from './character.service';

@Component({
  moduleId: module.id,
  selector: 'story-characters',
   templateUrl: './character-list.component.html',
  styles: [`
    .characters {list-style-type: none;}
    *.characters li {padding: 4px;cursor: pointer;}
  `]
})
export class CharacterListComponent implements OnInit {
  characters: Observable<Character[]>;

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.characters = this.characterService.getCharacters();
  }
}


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
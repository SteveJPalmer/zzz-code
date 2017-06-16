import { Component, OnInit } from '@angular/core';

import { Character, CharacterService } from './character.service';

@Component({
  moduleId: module.id,
  selector: 'my-character-list',
   templateUrl: './character-list.component.html',
  styles: ['li {cursor: pointer;}']
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  selectedCharacter: Character;

  constructor(private characterService: CharacterService) { }

  clearSelection() {
    this.selectedCharacter = null;
  }

  ngOnInit() {
    this.characters = this.characterService.getCharacters();
  }

  select(character: Character) {
    this.selectedCharacter = character;
  }
}


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
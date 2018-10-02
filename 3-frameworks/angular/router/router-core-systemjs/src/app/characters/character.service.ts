import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { CONFIG } from '../config';

let charactersUrl = CONFIG.baseUrls.characters;

export class Character {
  id: number;
  name: string;
  side: string;
}

@Injectable()
export class CharacterService {
  constructor(private http: Http) { }

  getCharacter(id: number) {
    return this.getCharacters()
      .map(characters => characters.find(character => character.id === id));
  }

  getCharacters() {
    return this.http
      .get(charactersUrl)
      .map((response: Response) => <Character[]>response.json().data);
  }
}


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
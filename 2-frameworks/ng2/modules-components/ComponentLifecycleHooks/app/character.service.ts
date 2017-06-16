import { Injectable } from '@angular/core';

export class Character {
  constructor(public id: number, public name: string, public side: string) {}
}

@Injectable()
export class CharacterService {
  getCharacters() {
    return [
      new Character(1, 'Han Solo', 'light'),
      new Character(2, 'Luke Skywalker', 'light'),
      new Character(3, 'Kylo', 'dark'),
      new Character(4, 'Rey', 'light')
    ];
  }
}


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
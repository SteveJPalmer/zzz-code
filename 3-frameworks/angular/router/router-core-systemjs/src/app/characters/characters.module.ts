import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CharacterService } from './character.service';
import { CharactersRouterModule, routedComponents } from './characters-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, CharactersRouterModule],
  declarations: [routedComponents],
  providers: [CharacterService],
})
export class CharactersModule { }


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
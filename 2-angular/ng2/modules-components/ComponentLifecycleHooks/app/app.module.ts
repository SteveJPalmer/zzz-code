import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CharacterComponent } from './character.component';
import { CharacterListComponent } from './character-list.component';
import { CharacterService } from './character.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    CharacterComponent,
    CharacterListComponent
  ],
  providers: [CharacterService],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
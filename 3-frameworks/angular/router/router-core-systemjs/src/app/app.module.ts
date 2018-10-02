import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import './rxjs-extensions';

import { AppComponent } from './app.component';
import { CharactersModule } from './characters/characters.module';
import { AppRoutingModule, routableComponents } from './app-routing.module';

/* for debug */
import { Router } from '@angular/router';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    CharactersModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, routableComponents],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
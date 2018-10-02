import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import './rxjs-extensions';

import { AppComponent } from './app.component';
import { AppRoutingModule, routableComponents } from './app-routing.module';

import { CharacterService } from './characters/character.service';
import { VehicleService } from './vehicles/vehicle.service';
import { CanActivateAuthGuard } from './can-activate.service';
import { UserProfileService } from './login/user-profile.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [AppComponent, routableComponents],
  providers: [CanActivateAuthGuard, CharacterService, UserProfileService, VehicleService],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/
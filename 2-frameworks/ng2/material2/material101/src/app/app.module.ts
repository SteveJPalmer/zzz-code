import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import individual material modules
// import { MdInputModule, MdButtonModule } from '@angular/material';
// or create separate NgModule that imports all Material components required by app
import { AppMaterialModules } from './app.material.module';

//RWD css fw
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppMaterialModules,
    // MdInputModule,
    // MdButtonModule
    FlexLayoutModule,
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

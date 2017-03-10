import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  imports: [ BrowserModule ],         //aka sub-modules
  declarations: [ AppComponent ],     //components owned by module
  providers: [],                      //injectable services
  bootstrap: [ AppComponent ]
})
export class AppModule { }

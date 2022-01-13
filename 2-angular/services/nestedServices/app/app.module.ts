import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

//heroes component
import { HeroesComponent } from './heroes/heroes.component';
import { HeroListComponent } from './heroes/hero-list.component';

//logger service
import { Logger } from './logger/logger.service';

@NgModule({
  imports: [ BrowserModule ],           //ak sub-modules
  declarations: [ AppComponent,         //components owned by module
                  HeroesComponent,
                  HeroListComponent ],
  providers: [ Logger ],                //injectable services
  bootstrap: [ AppComponent ]
})
export class AppModule { }

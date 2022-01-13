import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NewFeatureModule } from './new-feature/new-feature.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NewFeatureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

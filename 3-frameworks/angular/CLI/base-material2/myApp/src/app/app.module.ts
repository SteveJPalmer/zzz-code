import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';

/* Material2 */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//add Material comps via separate NgModule
import { AppMaterialModules } from './app.material.module';
//or add individually
// import { MatButtonModule, MatCheckboxModule } from '@angular/material';   //ensure import after BrowserModule


@NgModule({
  declarations: [
    AppComponent,
//    MatButtonModule,            // add Material Comps - individually
//    MatCheckboxModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModules            // add Material Comps - via separate NgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

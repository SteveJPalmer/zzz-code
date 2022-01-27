import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {UnlessDirective} from "./structural-directives/unless.directive";
import {HighlightDirective} from "./attribute-directives/highlight.directive";
import {HighlightDirectiveAdvanced} from "./attribute-directives/highlight.directive-advanced";

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    HighlightDirectiveAdvanced,
    UnlessDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

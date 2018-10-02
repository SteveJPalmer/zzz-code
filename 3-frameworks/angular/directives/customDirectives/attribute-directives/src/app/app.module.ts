import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HighlightDirective } from './highlight.directive';
import { HighlightDirectiveAdvanced } from './highlight.directive-advanced';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    AppComponent,
    HighlightDirective,               // declares both basic & advanced versions of directive
    HighlightDirectiveAdvanced
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

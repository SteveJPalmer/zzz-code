import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BypassSecurityComponent, SafeHtmlPipe } from './bypass-security.component';


@NgModule({
  declarations: [
    AppComponent,
    BypassSecurityComponent, SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

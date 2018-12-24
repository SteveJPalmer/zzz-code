import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TurboTableComponent } from './turbo-table/turbo-table.component';

import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    TurboTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

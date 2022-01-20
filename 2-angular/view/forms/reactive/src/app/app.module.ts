import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ReactiveFormBaseComponent } from './reactive-form-base/reactive-form-base.component';
import { ReactiveFormFullComponent } from './reactive-form-full/reactive-form-full.component';
import { ReactiveFormsArrayComponent } from './reactive-forms-array/reactive-forms-array.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormBaseComponent,
    ReactiveFormFullComponent,
    ReactiveFormsArrayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

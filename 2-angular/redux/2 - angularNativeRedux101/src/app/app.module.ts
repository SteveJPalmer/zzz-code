import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { CourseListComponent } from './courses/course-list.component';
// import { store } from './store/store';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent,
                  CourseListComponent
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

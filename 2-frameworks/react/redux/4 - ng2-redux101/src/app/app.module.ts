import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//root component
import { AppComponent }  from './app.component';
//app components
import { CourseListComponent } from './courses/course-list.component';

//angular-redux
import { NgReduxModule, NgRedux }  from '@angular-redux/store';
import { store, IAppState } from './store/index';
// import { store } from './store/store';
// import { IAppState } from './store/IAppState';

@NgModule({
  imports:      [ BrowserModule,
                  NgReduxModule
                ],
  declarations: [ AppComponent,
                  CourseListComponent
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {

  //wire up redux to Angular2 fw - "bridge between the two worlds"
  constructor(ngRedux: NgRedux<IAppState>) {    //inject instance of ngRedux
    //use provideStore() fn to link to existing Redux Store instance (./store/store.js)
    ngRedux.provideStore(store);
  }
}

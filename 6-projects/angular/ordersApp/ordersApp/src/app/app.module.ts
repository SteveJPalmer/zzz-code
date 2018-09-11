import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';  //Note: new v4.3 HttpClient
//http interceptor
import { NoopInterceptor } from './orderSearch/orderSearch.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import './core/rxjs-extensions';

//root component
import { AppComponent }  from './app.component';

//feature components
import { OrderSearchComponent } from './orderSearch/orderSearch.component';
import { CourseListComponent } from './courses/course-list.component';
import { ClPanelComponent } from './clPanel/cl-panel.component';

//libraries
//material design modules
import { AppMaterialModules } from './app.material.module';

//angular-redux
import { NgReduxModule, NgRedux }  from '@angular-redux/store';
import { store, IAppState } from './store/index';

// import the app common components
import { AppCommonModule } from  './common/common.module';


@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  HttpClientModule,
                  BrowserAnimationsModule,
                  AppMaterialModules,
                  NgReduxModule,
                  AppCommonModule
                ],
  declarations: [ AppComponent,
                  OrderSearchComponent,
                  CourseListComponent,
                  ClPanelComponent,
                ],
  providers: [ {provide: HTTP_INTERCEPTORS,
                useClass: NoopInterceptor,
                multi: true,}
             ],
  bootstrap:    [ AppComponent ],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {    //inject instance of ngRedux
    //use provideStore() fn to link to existing Redux Store (./store/store.js)
    ngRedux.provideStore(store);
  }
}


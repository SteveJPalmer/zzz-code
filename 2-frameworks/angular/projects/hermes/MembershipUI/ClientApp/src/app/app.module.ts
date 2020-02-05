import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule, routableComponents } from './app-routing.module';

// services
import { MsalModule, MsalGuard, MsalInterceptor, MsalService } from '@azure/msal-angular';
import { LogLevel } from 'msal';
import { AwbService } from './Services/awb.service';
import { HttpErrorInterceptor } from '../app/Services/http-interceptor.service';
import { NavMenuService } from './nav-menu/nav-menu.service';
import { VctService } from './Services/vct.service';
import { OrgsService } from './Services/orgs.service';
import { EncodeHttpParamsInterceptor } from "./Services/http-encode-params-interceptor";
import { MockXHRInterceptor } from './Services/mock-xhr-interceptor.service';
import { AppCommonModule } from './common/common.module';

// components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal/portal.component';
import { VctStatusPipe, VctStatusDirective, MapToIterable, AutofocusDirective, RejectReasonPipe } from './shared';
import { UIComponents } from './app-ui-components';

// Logger callback for MSAL
export function loggerCallback(logLevel, message, piiEnabled) {
  console.log(message);
}

var prm: any[] = environment.protectedResourceMap;

export const protectedResourceMap: [string, string[]][] = prm;

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    routableComponents,
    VctStatusPipe,
    VctStatusDirective,
    RejectReasonPipe,
    MapToIterable,
    AutofocusDirective,
    PortalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MsalModule.forRoot({
      authority: environment.B2CAuthority,
      consentScopes: ["https://hermesdevb2c.onmicrosoft.com/hermesng/read"],
      clientID: environment.B2CClientID,
      popUp: false,
      protectedResourceMap: protectedResourceMap,
      postLogoutRedirectUri: environment.B2CPostLogoutRedirectUri,
      loadFrameTimeout: 6000,
      logger: loggerCallback,
      level: LogLevel.Verbose
    }),
    UIComponents,
    AppCommonModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    // {
    //  provide: HTTP_INTERCEPTORS,
    //  useClass: MockXHRInterceptor,
    //  multi: true
    // },
    {
     provide: HTTP_INTERCEPTORS,
     useClass: EncodeHttpParamsInterceptor,
     multi: true
    },
    AwbService,
    NavMenuService,
    MsalService,
    VctService,
    OrgsService,
    // { provide: UrlSerializer,
    //   useClass: CustomUrlSerializer
    // }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

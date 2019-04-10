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

// components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { EticketComponent } from './eticket/eticket.component';
import { PickupComponent } from './pickup/pickup.component';

// UI
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SpinnerModule } from 'primeng/spinner';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { VctStatusPipe, VctStatusDirective, MapToIterable, AutofocusDirective } from './shared';
import { NgxQRCodeModule } from 'ngx-qrcode2';

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
    CounterComponent,
    routableComponents,
    EticketComponent,
    PickupComponent,
    VctStatusPipe,
    VctStatusDirective,
    MapToIterable,
    AutofocusDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    InputTextModule,
    SpinnerModule,
    CalendarModule,
    ButtonModule,
    DialogModule,
    CardModule,
    DropdownModule,
    NgxSpinnerModule,
    NgxQRCodeModule,
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

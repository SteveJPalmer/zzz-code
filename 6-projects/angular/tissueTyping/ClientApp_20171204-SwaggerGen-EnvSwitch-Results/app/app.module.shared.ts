import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryOrderService } from './components/api/in-memory-order.service';

import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { store, IAppState } from './store/index';
import { ApiModule, Configuration } from './services/orders/index';

import { AppComponent } from './components/app/app.component';
import { ClPanelComponent } from './components/cl-panel/cl-panel.component';
import { OrderSearchPanelComponent } from './components/order-search-panel/order-search-panel.component';
import { AcceptOrderComponent } from './components/accept-order/accept-order.component';
import { RequestSearchPanelComponent } from './components/request-search-panel/request-search-panel.component';
import { HlaResultsEntryComponent } from './components/hla-results-entry/hla-results-entry.component';

import { AppRoutingModule } from './components/app/app-routing.module';

import { environment } from '../environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

export function apiConfig() {
  return new Configuration({
    basePath: environment.basePath
  });
}

@NgModule({
    declarations: [
        AppComponent,
        ClPanelComponent,
        OrderSearchPanelComponent,
        AcceptOrderComponent,
        RequestSearchPanelComponent,
        HlaResultsEntryComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        // InMemoryWebApiModule.forRoot(InMemoryOrderService),
        AppRoutingModule,
        NgReduxModule,
        ApiModule.forConfig(apiConfig)
    ]
})
export class AppModuleShared {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}

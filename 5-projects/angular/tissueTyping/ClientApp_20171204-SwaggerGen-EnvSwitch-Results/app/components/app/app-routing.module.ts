import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSearchPanelComponent } from '../order-search-panel/order-search-panel.component';
import { AcceptOrderComponent } from '../accept-order/accept-order.component';
import { RequestSearchPanelComponent } from '../request-search-panel/request-search-panel.component';
import { HlaResultsEntryComponent } from '../hla-results-entry/hla-results-entry.component';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: OrderSearchPanelComponent },
    { path: 'orderSearch', component: OrderSearchPanelComponent },
    { path: 'acceptOrder', component: AcceptOrderComponent },
    { path: 'requestSearch', component: RequestSearchPanelComponent },
    { path: 'hlaResultsEntry', component: HlaResultsEntryComponent },
    { path: '**', redirectTo: 'home' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

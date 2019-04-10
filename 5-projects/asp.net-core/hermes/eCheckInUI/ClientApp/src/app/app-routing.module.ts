import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from "@azure/msal-angular";

// routing comps
import { HomeComponent } from "./home/home.component";
import { ECheckInComponent } from './eCheckIn/echeckin.component';
import { DropOffComponent } from './dropoff/dropoff.component';
import { EticketComponent } from "./eticket/eticket.component";
import { PickupComponent } from './pickup/pickup.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'e-checkin', component: ECheckInComponent, canActivate: [MsalGuard] },
  { path: 'dropoff', component: DropOffComponent, canActivate: [MsalGuard] },
  { path: 'eticket', component: EticketComponent, canActivate: [MsalGuard] },
  { path: 'pickup', component: PickupComponent, canActivate: [MsalGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// convenience - instead of declaring individually in app module
export const routableComponents = [
  ECheckInComponent,
  DropOffComponent,
  PickupComponent
];

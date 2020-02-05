import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from "@azure/msal-angular";

// routing comps
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal/portal.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'portal', component: PortalComponent, canActivate: [MsalGuard] },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canActivate: [MsalGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// convenience - instead of declaring individually in app module
export const routableComponents = [
  PortalComponent
];

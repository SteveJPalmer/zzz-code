import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { UserDetailsComponent,
         OrgDetailsComponent,
         AssociationsComponent,
         SearchUsersComponent,
         AcceptInviteComponent } from './';

const adminRoutes: Routes = [
  { path: '',
    component: AdminComponent,
    children: [
      { path: 'user-details', component: UserDetailsComponent },
      { path: 'org-details', component: OrgDetailsComponent },
      { path: 'associations', component: AssociationsComponent },
      { path: 'associations/search-users/:orgType', component: SearchUsersComponent }
      // { path: 'associations/search-users', component: SearchUsersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

// convenience - instead of declaring individually in app module
export const routableAdminComponents = [
  AdminComponent,
  UserDetailsComponent,
  OrgDetailsComponent,
  AssociationsComponent
];

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule, routableAdminComponents } from './admin-routing.module';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { AssociationsComponent } from './associations/associations.component';
// import { CardModule } from 'primeng/card';
// import { ButtonModule } from 'primeng/button';
import { adminUIComponents } from './admin-ui-components';
import { SearchUsersComponent } from './search-users/search-users.component';
import { AcceptInviteComponent } from './accept-invite/accept-invite.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    // CardModule,
    // ButtonModule
    adminUIComponents
  ],
  declarations: [
    routableAdminComponents,
    OrgDetailsComponent,
    AssociationsComponent,
    SearchUsersComponent,
    AcceptInviteComponent
  ]
})
export class AdminModule { }

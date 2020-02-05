import {NgModule} from '@angular/core';

import { MatButtonModule,
         MatCheckboxModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule,
            MatCheckboxModule
           ],
  exports: [MatButtonModule,
            MatCheckboxModule
           ],
  declarations: [],
  providers: [],
})
export class AppMaterialModules {}

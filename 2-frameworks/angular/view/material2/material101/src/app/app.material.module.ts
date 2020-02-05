import {NgModule} from '@angular/core';

import { MatButtonModule,
         MatProgressSpinnerModule,
         MatProgressBarModule,
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule,
            MatProgressSpinnerModule,
            MatProgressBarModule
           ],
  exports: [MatButtonModule,
            MatProgressSpinnerModule,
            MatProgressBarModule
           ],
  declarations: [],
  providers: [],
})
export class AppMaterialModules {}

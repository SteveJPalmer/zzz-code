import {NgModule} from '@angular/core';

import {MdInputModule,
        MdButtonModule,
        MdIconModule,
        MdProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    MdInputModule,
    MdButtonModule,
    MdIconModule,
    MdProgressSpinnerModule
  ],
  exports: [
    MdInputModule,
    MdButtonModule,
    MdIconModule,
    MdProgressSpinnerModule
  ],
  declarations: [],
  providers: [],
})
export class AppMaterialModules {}








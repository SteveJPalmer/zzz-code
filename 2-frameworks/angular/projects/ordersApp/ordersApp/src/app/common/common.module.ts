import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';			// import just CommonModule (not BrowserModule)

import { ClPanelComponent } from './clPanel/cl-panel.component';			// import sub-modules comp

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ ClPanelComponent ],					// make sub-modules comps, dirs & pipes, available to external comp templates
  declarations: [ ClPanelComponent ]			// add comps, directives & pipes that belong exclusively to this sub-module
})
export class AppCommonModule { }

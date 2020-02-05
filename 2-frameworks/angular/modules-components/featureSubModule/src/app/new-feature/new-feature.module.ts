import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyNewCompComponent } from './my-new-comp/my-new-comp.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [MyNewCompComponent],
  declarations: [MyNewCompComponent]
})
export class NewFeatureModule { }

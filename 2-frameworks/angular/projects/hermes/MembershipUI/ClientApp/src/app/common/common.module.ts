import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlPaginationComponent, HlPaginationService } from '.';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HlPaginationComponent
  ],
  declarations: [
    HlPaginationComponent
  ],
  providers: [
    HlPaginationService
  ]
})
export class AppCommonModule { }

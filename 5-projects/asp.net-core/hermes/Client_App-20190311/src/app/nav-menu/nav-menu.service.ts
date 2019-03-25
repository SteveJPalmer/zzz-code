import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class NavMenuService  {
  title: string;
  navElem: HTMLElement;

  constructor( @Inject(DOCUMENT) private document: any) { }

  // set Title
  setPageTitle(title: string) {
    this.title = title;
  }

  // toggle background image
  mblBackImg(isActive: boolean) {
    if (window.matchMedia('(max-width: 991px)').matches) {
      this.navElem = document.getElementById('hl-bg') as HTMLElement;

      if (isActive) {
        this.navElem.classList.add('bg-image');
      }
      else {
        this.navElem.classList.remove('bg-image');
      }
    }
  };

}

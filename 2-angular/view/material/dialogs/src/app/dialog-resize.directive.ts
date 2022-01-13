import {Directive, Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {DOCUMENT} from '@angular/common';

@Directive({
  selector: '[appDialogResize]'
})
export class DialogResizeDirective {

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(DOCUMENT) private document: Document) {
    console.log('>>DialogResizeDirective initialized');
    /* two diff approaches - so can distinguish, first sets resize to both, second to horizontal */

    /* 1) MatDialogRef technique to add a class to cdk-overlay-pane */
    // dialogRef.addPanelClass('myDynClass');

    /* 2) or select via injected document & apply inline styles (++keeps encapsulated within Directive, no associated css style) */
    const el: HTMLElement = document.querySelector('.cdk-overlay-pane');    // or as HTMLElement;
    el.style.resize = 'horizontal';
    el.style.overflow = 'auto';
    // need cast returned element type from querySelector to to a HTMLElement, which has got the style property
    // (as could return another type of elem, that hasn't got style property)
  }

}

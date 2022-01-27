import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[aoHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {
    this.highlight('yellow');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  /* ElementRef grants direct access to host DOM elem via its nativeElement property */
}

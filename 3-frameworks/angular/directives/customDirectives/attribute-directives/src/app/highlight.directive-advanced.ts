import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[aoHighlightAdvanced]'
})
export class HighlightDirectiveAdvanced {

  constructor(private el: ElementRef) {
    // this.highlight('yellow');   // basic version of directive - just highlight in yellow
  }


  /* advanced - enhances directive with dynamic params */
  @Input() defaultColor: string;

  @Input('aoHighlightAdvanced') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
  /* ----  */

  /* my enhancement to pass Event onj */
  @HostListener('keydown', ['$event']) keyEvent(event: KeyboardEvent) {
    console.log(event); }
  /* ----  */

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  /* ElementRef grants direct access to host DOM elem via its nativeElement property */
}

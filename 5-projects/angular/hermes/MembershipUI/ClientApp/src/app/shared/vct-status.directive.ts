import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { VCTRequestStatus } from 'app/models/';

@Directive({
  selector: '[hlVctStatus]'
})
export class VctStatusDirective implements OnInit {
  @Input('hlVctStatus') vctStatus: number;

  constructor( private el: ElementRef,
               private renderer: Renderer2) {
  }

  private highlightStatus() {
    let styleColour: string;
    let applyStyle: boolean = true;

    switch (VCTRequestStatus[this.vctStatus]) {
      case 'Waiting for Submission':
        styleColour = '#9a9a9a';
        break;
      case 'Submitted':
        styleColour = '#f0ad4e';
        break;
      case 'Waiting for Delivery':
        styleColour = '#007bff';
        break;
      case 'Delivered':
        styleColour = '#28a745';
        break;
      case 'Retry or Contact Support':
        styleColour = '#d9534f';
        break;
      default:
        applyStyle = false;
    }

    if (applyStyle) {
      this.renderer.setProperty(this.el.nativeElement, 'style', 'color:' + styleColour );
    }
  }

  ngOnInit() {
    this.highlightStatus();
  }

}

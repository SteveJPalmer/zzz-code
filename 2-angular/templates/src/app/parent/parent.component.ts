import { AfterViewInit, Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements AfterViewInit {

  blars: string = 'blarblarblar';
  totalEstimate = 10;
  ctx = {estimate: this.totalEstimate};

  /* for JavaScript api (createEmbeddedView) */
  constructor(private vref: ViewContainerRef) { }     // for JavaScript api

  /* get ref to the templateRef */
  @ViewChild('api') apiTemplate!: TemplateRef<any>;   // for JavaScript api

  /* create template instance via API */
  ngAfterViewInit() {
    this.vref.createEmbeddedView(this.apiTemplate);
  }
}

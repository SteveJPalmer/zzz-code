import {Component, ContentChild, OnInit, TemplateRef, ViewChild, AfterContentInit} from '@angular/core';
import {MyTemplateDirective} from "../directives/my-template.directive";

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements AfterContentInit {

  blarsNested: string = 'nested-blarblarblarblarblar';

  selected!: TemplateRef<any>;

  constructor() { }

  @ContentChild('chooseOne') one!: TemplateRef<any>;
  @ContentChild('chooseOther') other!: TemplateRef<any>;
  @ContentChild(MyTemplateDirective) myTemplate!: MyTemplateDirective;     /* Note: no Quotes around directive in query */

  ngAfterContentInit(): void {
    /* can select via comp prop  or within template *ngIf */
    this.selected = this.one;
    // this.selected = this.other;
  }

}

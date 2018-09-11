import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'cl-panel-common',
    templateUrl: './cl-panel.html',
    styleUrls: ['./cl-panel.css']
})
export class ClPanelComponent implements OnInit
{
    @Input('title') panelTitle: string;
    @Input() isCollapsable: boolean = true;

    isCollapsed: boolean = false;
    isActive: boolean = true;

    // @ViewChild('summary') summary: ElementRef;
    @ViewChild('body') body: ElementRef;


    ngOnInit() {
       console.log('>>cl-panel OnInit');
    }

    togglePanel() {
        if (this.isCollapsable) {
            this.isCollapsed = !this.isCollapsed
        }
    };

}
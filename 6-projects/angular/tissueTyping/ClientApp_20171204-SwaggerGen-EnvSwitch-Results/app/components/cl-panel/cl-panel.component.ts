import { Component, Input } from '@angular/core';

@Component({
    selector: 'cl-panel',
    templateUrl: 'cl-panel.component.html',
    styleUrls: ['cl-panel.component.scss']
})
export class ClPanelComponent {
    @Input() title: string;
}
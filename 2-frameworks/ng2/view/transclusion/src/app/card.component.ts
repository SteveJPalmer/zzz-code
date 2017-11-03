import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'card',
    templateUrl: 'card.component.html',
})
export class CardComponent {
    @Input() header: string = 'a default header';      //assignment acts as default value, if not passed via elem attribute
    
    @Input() footer: string = 'a default footer';
}
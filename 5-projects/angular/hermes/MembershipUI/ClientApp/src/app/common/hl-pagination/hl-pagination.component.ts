import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { hlFadeIn } from '../hl-common-animations';

@Component({
  selector: 'hl-pagination',
  templateUrl: './hl-pagination.component.html',
  styleUrls: ['./hl-pagination.component.scss'],
  animations: [ hlFadeIn ]
})
export class HlPaginationComponent implements OnInit {
  @Input() continuationTokens: Array<string>;
  @Input() index: any;
  @Input() next: boolean;
  @Output() clicked = new EventEmitter<string>();

  constructor() { }

  onClick( pos: string ) {
    this.clicked.emit( pos );
  }

  ngOnInit() {
  }

}

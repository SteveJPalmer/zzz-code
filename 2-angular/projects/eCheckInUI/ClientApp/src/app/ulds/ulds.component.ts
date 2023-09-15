import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-ulds',
  templateUrl: './ulds.component.html',
  styleUrls: ['./ulds.component.scss']
})
export class UldsComponent implements OnInit {
  @Input() ulds: Array<any>;
  @Input() edit: boolean = true;
  @Input() mode: string;
  @Output() cancel = new EventEmitter<string>();
  @Output() update = new EventEmitter<Array<any>>();

  // editUlds: Array<any>;

  constructor() { }

  addUld() {
    this.ulds.push({});
  }

  removeUld(index) {
    this.ulds.splice(index, 1);
  }

  onCancel() {
    // console.info('>>ULDs Comp >Emitted: onCancel');
    if (!this.edit) {
      this.cancel.emit('entry');
    } else {
      this.cancel.emit('edit');
    }
  }

  onUpdate() {
    // console.info('>>ULDs Comp >Emitted: onUpdate');
    // console.warn( JSON.stringify( this.ulds, null, 2) );
    this.update.emit( this.ulds );
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   //make shallow clone of input prop
  //   console.info( JSON.stringify( changes.ulds.currentValue, null, 2) );
  //
  //   if (changes.ulds.currentValue) {
  //     this.editUlds = JSON.parse(JSON.stringify(changes.ulds.currentValue));
  //   }
  // }

  ngOnInit() {
  }

}

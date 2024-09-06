import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ApiRequestStatusEnum } from '../../core/api/api-request-status.enum';

@Component({
  selector: 'mcmview-async-data-wrapper',
  templateUrl: './async-data-wrapper.component.html',
  styles: [`.async-data-wrapper__wrapper {
      padding: 10px 15px 10px 15px;
    }
    .spinner-white {
      margin-left: 20px;
    }
    .spinner-white ::ng-deep .mat-progress-spinner circle, .mat-spinner circle {
      margin-left: 10px;
      stroke: #FFF !important;
    }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsyncDataWrapperComponent implements OnInit {
  @Input() asyncRequestStatus: ApiRequestStatusEnum;
  @Input() overrideMessage: string;
  @Input() hideSpinner: boolean;
  @Input() set textColour(textColour: string) {
    this._textColour = textColour;
  }

  _textColour: string = '#000';
  get textColour(): string {
    return this._textColour;
  }

  // store a reference to the enum so can use in template
  apiRequestStatus = ApiRequestStatusEnum

  constructor() { }

  ngOnInit() {
  }

  getErrorText() {
    if (this.overrideMessage != undefined)
      return this.overrideMessage;

    return "Failed to retrieve the data. Please check your internet connection and try again."
  }

}

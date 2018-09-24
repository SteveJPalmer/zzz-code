import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RequestsService } from '../../services/requests/index';
import { RequestSearchActions } from './request-search.actions';

import { RequestDto } from '../../services/requests/model/models';


@Component({
    selector: 'request-search-panel',
    templateUrl: 'request-search-panel.component.html',
    styleUrls: ['request-search-panel.component.scss'],
    providers: [ RequestsService,
                 RequestSearchActions
    ]
})
export class RequestSearchPanelComponent {

  constructor(
    private _router: Router,
    private requestsService: RequestsService,
    private requestSearchActions: RequestSearchActions) {
  }

  search: any = { labNumber: '' };
  noRequestFound: boolean = false;
  lastSearch: number;
  request: RequestDto = {};

  findRequestByLabNumber(): void {
    this.noRequestFound = false;
    this.requestsService.apiRequestsGet(this.search.labNumber)
      .subscribe(
        next => {
          this.request = next;

          if (!this.request || typeof this.request.labNumber == 'undefined') {
            console.info('>>findRequestByLabNumber... request: Is empty - no match ');
            this.request = {};
            this.noRequestFound = true;
            this.lastSearch = this.search.labNumber;
          }
          else {
            // console.info('>>findRequestByLabNumber... request: ' + JSON.stringify(this.request,null, 2));
            this.requestSearchActions.addRequest(this.request);
            //ToDo: redirect to tt > data entry view
            this._router.navigate(['/hlaResultsEntry']);
           }
        },
        err => {
          //ToDo: replace with a non-blocking notification
          this.request = {};
          this.noRequestFound = true;
        }
      );
  };

  resetRequestSearch() {
    this.noRequestFound = false;
    this.search.labNumber = '';
    this.request = {};
    this.requestSearchActions.resetRequest();
  };

}
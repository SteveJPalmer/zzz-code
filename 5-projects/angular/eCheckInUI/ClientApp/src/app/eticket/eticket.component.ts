import { Component, OnInit } from '@angular/core';
import { VctService } from '../Services';
import { NavMenuService } from '../nav-menu/nav-menu.service';
import { ExportVCTRequest, VCTRequestStatus  } from "../models";
import { NgxSpinnerService } from "ngx-spinner";
import { hlDetail, hlList, hlData } from '../shared';
import { OrgsService } from '../Services';
import { SortEvent } from 'primeng/components/common/sortevent';
import { HlPaginationService } from '../common';

@Component({
  selector: 'app-eticket',
  templateUrl: './eticket.component.html',
  styleUrls: ['./eticket.component.scss'],
  animations: [ hlDetail, hlList, hlData ]
})

export class EticketComponent implements OnInit {
  title: string = 'E-Ticket(s)';
  listCols: any[];
  detailCols: any[];
  vctRequests: ExportVCTRequest[];
  selectedVctRequest: ExportVCTRequest;
  showQRCode: boolean = false;
  codeValue: any;
  filterPickup: boolean = true;
  filterDropoff: boolean = true;
  // flow control
  detailView: boolean;
  selectedVctIndex: number;
  selectedVctNumber: string;
  dataFetched: boolean = false;
  errorRaised: boolean = false;
  // filter panel
  stime: Date = null;
  etime: Date = null;
  filterActive: boolean = false;
  noVctsMsg: boolean = false;
  // pagination control
  paginationFlag: boolean = false;
  paginationIndex: number = 1;
  continuationTokensPickup: Array<string> = [''];
  continuationTokensDropoff: Array<string> = [''];
  nextContinuationTokenPickup: string;
  nextContinuationTokenDropoff: string;

  constructor( private vctService: VctService,
               private spinner: NgxSpinnerService,
               private orgsService: OrgsService,
               public navMenu: NavMenuService,
               public paginationService: HlPaginationService ) { }

  viewVctRequest(rowIndex, $event) {
    this.detailView = true;
    this.selectedVctIndex = rowIndex;
    this.selectedVctRequest = this.vctRequests[rowIndex];
    this.selectedVctNumber = (this.selectedVctRequest.vctRequestStatus <= VCTRequestStatus.Submitted) ? "< awaiting.. >" : $event;
    // show QRCode if VCT Number available and no errors
    if (   this.selectedVctRequest.vctRequestStatus > VCTRequestStatus.Submitted
        && this.selectedVctRequest.vctRequestStatus != VCTRequestStatus['Retry or Contact Support'] ) {
       this.showQRCode = true;
       this.codeValue = this.vctRequests[rowIndex].vctNumber;
    } else {
      this.showQRCode = false;
    }
  }

  back() {
    this.detailView = false;
    this.selectedVctRequest = null;
  }

  retrieveVctRequests(sTime?: Date, eTime?: Date) {
    this.spinner.show();
    this.dataFetched = false;
    this.resetPagination();
    if (sTime || eTime) {
      eTime ? eTime.setHours(23,59,59,999): eTime;
      var sUnixTime = sTime ? Math.round(sTime.getTime() / 1000) : null;
      var eUnixTime = eTime ? Math.round(eTime.getTime() / 1000) : null;
    }
    /* Domain filter service calls */
    if (this.filterPickup) {   // scenario: either pickup or both checked
      this.vctService.searchVCTs(this.navMenu.selectedGH, 'pickup', sUnixTime, eUnixTime)
        .then(
          res => {
            if (res.body.error === true) {          // check no error thrown by interceptor
              this.errorRaised = true;
              this.spinner.hide();
            }
            else {
              let vcts = res.body;
              let ContinuationToken = this.paginationService.getHeaderToken(res);
              //console.info(`>>InitRetrieve - eticketComp: ContinuationToken: ${ContinuationToken}`);
              if (ContinuationToken) {
                this.paginationFlag = true;
                this.nextContinuationTokenPickup = ContinuationToken;
                this.continuationTokensPickup.push(ContinuationToken);
              } else {
                this.continuationTokensPickup.push('');   //ensure both token arrays in sync
              }

              if ( this.filterDropoff ) {     // also get dropoff VCTs if required
                this.vctService.searchVCTs( this.navMenu.selectedGH, 'dropoff', sUnixTime, eUnixTime )
                  .then(
                    resp => {
                      if (resp.body.error === true) {
                        this.errorRaised = true;
                        this.spinner.hide();
                      }
                      else {
                        let ContinuationToken = this.paginationService.getHeaderToken(resp);
                        //console.info(`>>InitRetrieve - eticketComp: ContinuationToken: ${ContinuationToken}`);
                        if (ContinuationToken) {
                          this.paginationFlag = true;
                          this.nextContinuationTokenDropoff = ContinuationToken;
                          this.continuationTokensDropoff.push(ContinuationToken);
                        } else {
                          this.continuationTokensDropoff.push('');   //ensure both token arrays in sync
                        }
                        for (var booking of resp.body) vcts.push(booking);      // combine with pickup VCTs
                        this.displayVCTs(vcts);
                      }
                    }
                  );
              } else {
                this.displayVCTs(res.body);
              }
            }
        });
    }
    else if (this.filterDropoff) {   // scenario: just dropoff checked
      this.vctService.searchVCTs( this.navMenu.selectedGH, 'dropoff', sUnixTime, eUnixTime )
        .then(res => {
          if (res.body.error === true) {
            this.errorRaised = true;
            this.spinner.hide();
          }
          else {
            let ContinuationToken = this.paginationService.getHeaderToken(res);
            //console.info(`>>InitRetrieve - eticketComp: ContinuationToken: ${ContinuationToken}`);
            if (ContinuationToken) {
              this.paginationFlag = true;
              this.nextContinuationTokenDropoff = ContinuationToken;
              this.continuationTokensDropoff.push(ContinuationToken);
            }
            this.displayVCTs(res.body);
          }
        });
    }
    else {   // both domains unchecked
      this.dataFetched = true;
      this.filterActive = true;
      this.vctRequests = null;
      this.noVctsMsg = true;
      this.spinner.hide();
    }
  }

  displayVCTs(res) {
    this.vctRequests = res;
    if (res[0] !== undefined && res[0].id !== undefined) {
      this.dataFetched = true;
    }
    if (this.vctRequests.length == 0) {
      this.noVctsMsg = true;     // filtering no results message
    } else {
      this.noVctsMsg = false;
    }
    this.spinner.hide();
  }

  onContinuation(pos: string) {
    //console.info(`>>ETicket comp - onContinuation() - ${pos}` );
    this.spinner.show();
    this.dataFetched = false;
    if (this.stime || this.etime) {
      this.etime ? this.etime.setHours(23, 59, 59, 999) : this.etime;
      var sUnixTime = this.stime ? Math.round(this.stime.getTime() / 1000) : null;
      var eUnixTime = this.etime ? Math.round(this.etime.getTime() / 1000) : null;
    }
    let tokenIndex: number;
    tokenIndex = this.paginationService.getTokenIndex(pos, this.paginationIndex);
    /* Domain filter service calls */
    if (this.filterPickup) {   // get pickup
      const tokenPickup = this.continuationTokensPickup[tokenIndex];
      this.vctService.searchVCTs( this.navMenu.selectedGH, 'pickup', sUnixTime, eUnixTime, tokenPickup )
        .then(
          res => {
            if (res.body.error === true) {          // check no error thrown by interceptor
              this.errorRaised = true;
              this.spinner.hide();
            }
            else {
              let vcts: Array<any> = [];
              this.paginationIndex = this.paginationService.setPagingIndex(pos, this.paginationIndex);
              console.info(`>>eticketComp: onContinuation - pageIndex: ${this.paginationIndex}`);
              if (tokenPickup !== '' || this.paginationIndex === 1) {
                vcts = res.body;
                this.nextContinuationTokenPickup = this.paginationService.getHeaderToken(res);
              } else {
                this.nextContinuationTokenPickup = null;
              }
              //console.info(`>>eticketComp: onContinuation - ContinuationToken: ${ContinuationToken}`);
              this.paginationService.manageTokenArray(pos, this.paginationIndex, this.continuationTokensPickup, this.nextContinuationTokenPickup);

              if (this.filterDropoff) {     // also get dropoff VCTs if required
                const tokenDropoff = this.continuationTokensDropoff[tokenIndex];
                this.vctService.searchVCTs( this.navMenu.selectedGH, 'dropoff', sUnixTime, eUnixTime, tokenDropoff )
                  .then(
                    resp => {
                      if (resp.body.error === true) {
                        this.errorRaised = true;
                        this.spinner.hide();
                      } else {
                        if (tokenDropoff !== '' || this.paginationIndex === 1) {
                          for (const booking of resp.body) vcts.push(booking);      // combine with pickup VCTs
                          this.nextContinuationTokenDropoff = this.paginationService.getHeaderToken(resp);
                        } else {
                          this.nextContinuationTokenDropoff = null;
                        }
                        //console.info(`>>eticketComp: onContinuation - ContinuationToken: ${ContinuationToken}`);
                        this.paginationService.manageTokenArray(pos, this.paginationIndex, this.continuationTokensDropoff, this.nextContinuationTokenDropoff);
                        this.displayVCTs(vcts);
                      }
                  });
              } else {
                this.displayVCTs(res.body);
              }
            }
        });
    }
    else if (this.filterDropoff) {   // get just dropoff
      const tokenDropoff = this.continuationTokensDropoff[tokenIndex];
      this.vctService.searchVCTs( this.navMenu.selectedGH, 'dropoff', sUnixTime, eUnixTime, tokenDropoff )
        .then(res => {
          if (res.body.error === true) {
            this.errorRaised = true;
            this.spinner.hide();
          } else {
            this.paginationIndex = this.paginationService.setPagingIndex(pos, this.paginationIndex);
            //console.info(`>>eticketComp: onContinuation - paginationIndex: ${this.paginationIndex}`);
            let ContinuationToken = this.paginationService.getHeaderToken(res);
            //console.info(`>>eticketComp: onContinuation - ContinuationToken: ${ContinuationToken}`);
            this.paginationService.manageTokenArray(pos, this.paginationIndex, this.continuationTokensDropoff, ContinuationToken);
            this.displayVCTs(res.body);
          }
        });
    } else {   // both domains unchecked
      this.dataFetched = true;
      this.filterActive = true;
      this.vctRequests = null;
      this.noVctsMsg = true;
      this.spinner.hide();
    }
  }

  showNext(): boolean {
    let showNext: boolean = true;
    const length: number = this.filterPickup ? this.continuationTokensPickup.length : this.continuationTokensDropoff.length;
    if (this.paginationIndex === length - 1) {
      // domain checkbox scenarios
      if (this.filterPickup && this.filterDropoff) { // default
          if (   this.continuationTokensPickup[this.paginationIndex] === ''
              && this.continuationTokensDropoff[this.paginationIndex] === '' ) {
            showNext = false;
          }
      } else if (   (this.filterPickup && this.continuationTokensPickup[this.paginationIndex] === '')
                 || (this.filterDropoff && this.continuationTokensDropoff[this.paginationIndex] === '') ) {
        showNext = false;
      }
    }
    return showNext;
  }

  resetData() {
    this.vctRequests = [];
    this.noVctsMsg = false;
    this.resetPagination();
  }

  resetPagination() {
    this.paginationFlag = false;
    this.paginationIndex = 1;
    this.nextContinuationTokenPickup = '';
    this.nextContinuationTokenDropoff = '';
    this.continuationTokensPickup = [''];
    this.continuationTokensDropoff = [''];
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      data1.reg_s = data1.vehicleInfo.registrationNumber;
      data2.reg_s = data2.vehicleInfo.registrationNumber;
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) {
        result = 1;
      } else if (value1 != null && value2 == null) {
        result = -1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }
      return (event.order * result);
    });
  }

  onFilter() {
    this.filterActive = true;
    this.retrieveVctRequests(this.stime, this.etime);
    if ( this.stime == null && this.etime == null && this.filterPickup && this.filterDropoff ) {
      this.filterActive = false;
    }
  }

  onPrint() {
    window.print();
  }

  onRefresh() {
    this.retrieveVctRequests(this.stime, this.etime);
  }

  ngOnInit() {
    this.detailView = false;
    this.navMenu.setPageTitle(this.title);
    this.navMenu.mblBackImg(false);

    this.listCols = [
      { field: 'vctNumber', header: 'VCT Number', width: '24' },
      { field: 'domain', header: 'Domain', width: '14' },
      { field: 'reg_s', header: 'Vehicle Reg', width: '16' },
      { field: 'requestDateTime', header: 'VCT Date', width: '16' },
      { field: 'vctRequestStatus', header: 'Status', width: '20' }
    ];
    this.detailCols = [
      { field: 'awbNumber', header: 'AWB Number', width: '16' },
      { field: 'domain', header: 'Domain', width: '10' },
      { field: 'airline', header: 'Airline', width: '10' },
      { field: 'pieces', header: 'Pieces', width: '10' },
      { field: 'weight', header: 'Weight(kg)', width: '13' },
      { field: 'origin', header: 'Origin', width: '11' },
      { field: 'destination', header: 'Destination', width: '14' },
      { field: 'rejectReason', header: 'Reject Reason', width: '16' }
    ];

    if ( this.navMenu.initialLoad ) {
      this.spinner.show();
      this.navMenu.initialLoad = false;
      this.orgsService.getThisUserProfile().then(res => {
        if (!res) {
          this.spinner.hide();
          this.navMenu.noGroundHandlerWarning = true;
        }
        else if (res.error == true)  {
          this.errorRaised = true;
          this.spinner.hide();
        }
        else {
          this.navMenu.setUsersDefaultGroundHandler(res.defaultGroundHandler);
          this.orgsService.getThisUserGroundHandlers().then(res => {
            if (res.error == true) {
              this.errorRaised = true;
            } else {
              this.navMenu.setUsersGroundHandler(res);
              this.retrieveVctRequests();
            }
            this.spinner.hide();
          });
        }
      });
    } else {
      this.navMenu.noGroundHandlerWarning ? this.spinner.hide() : this.retrieveVctRequests();
    }
  }
}

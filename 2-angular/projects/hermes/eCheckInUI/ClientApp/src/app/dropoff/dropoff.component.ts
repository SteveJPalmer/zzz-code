import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { AwbService, VctService, OrgsService, UldService } from '../Services';
import { NavMenuService } from '../nav-menu/nav-menu.service';
import { Table } from 'primeng/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { hlDetail, hlList, hlData } from '../shared';
import { AirwayBill, Vehicle, Driver, ExportVCTRequest, VCTManifest, Loose, ULD, DeliveryMethod } from '../models';
import { IDropoffList } from './IDropoffList';

@Component({
  selector: 'app-dropoff',
  templateUrl: './dropoff.component.html',
  styleUrls: ['./dropoff.component.scss'],
  animations: [ hlDetail, hlList, hlData ]
})

export class DropOffComponent implements OnInit {
  title: string = 'Drop-off';
  cols: any[];
  awbNumber: string;
  isValidSearchStr: boolean = false;
  airwayBills: IDropoffList[];
  selectedAWBs: any[];
  @ViewChild('mainTable') private mainTable: Table;
  eta: Date;
  groundHandlers: any;
  selectedGroundHandler: any;

  //flow control
  searchClicked: boolean = false;
  searchReturned: boolean = false;
  nextClicked: boolean = false;
  noGroundHandlerWarning: boolean = false;
  ghDefaulted: boolean = false;
  errorRaised: boolean = false;

  //pagination control
  paginationFlag: boolean = false;
  paginationIndex: number = 1;
  nextContinuationToken: string;
  continuationTokens: Array<string> = [''];
  lastPage: boolean = false;

  //edit pieces control
  displayEditModal: boolean = false;
  selectedAWB: number;
  selectedAWBIndex: number;
  adjustedNumberOfPieces: number;
  maxValue: number;

  //edit driver details
  driverDetailView: boolean = false;
  doorOptions: any[];
  driverInfo: Driver = new Driver();
  vehicleInfo: Vehicle = new Vehicle();
  selectedDeliveryMethod: string;

  //edit ULDs control
  displayULDsModal: boolean = false;
  isEdit: boolean;
  uldMode: string = 'dropoff';
  selectedULDs: Array<any>;

  constructor(private awbService: AwbService,
              private spinner: NgxSpinnerService,
              public navMenu: NavMenuService,
              private router: Router,
              private orgsService: OrgsService,
              private vctService: VctService,
              private uldService: UldService,
              private cdRef: ChangeDetectorRef) {
  }

  onSearchAWBs() {
    if (this.isValidSearchStr) {
      this.searchClicked = true;
      this.searchReturned = false;
      this.errorRaised = false;
      this.resetPagination();
      if (this.awbNumber && this.awbNumber.trim().length >= 1) {
        this.spinner.show();
        let httpOptions = { observe: 'response' };
        this.awbService.searchDropoffAWBs(this.awbNumber.trim(), this.navMenu.selectedGH, httpOptions ).then(resp => {
          // parse response obj
          this.searchReturned = true;
          const body: Array<AirwayBill> = resp.body;
          // check no error thrown by interceptor
          if (resp.body.error == true) {
            this.errorRaised = true;
            this.awbNumber = '';
            this.isValidSearchStr = false;
          }
          else {
            const headers: HttpHeaders = resp.headers;
            let ContinuationToken = headers.get('ContinuationToken');
            const keys = resp.headers.keys();

            if (ContinuationToken) {
              this.paginationFlag = true;
              this.nextContinuationToken = ContinuationToken;
              this.continuationTokens.push(ContinuationToken);
            }
            /* add derived properties */
            let tmpAirwayBills: IDropoffList[] = [];
            for (let elem of body) {
              if (!elem.hawbs || elem.hawbs === null || (elem.hawbs && elem.hawbs.length === 0)) {     // temp disable any hawbs
                let numberOfPieces = (elem.bookedInfo && elem.bookedInfo.numberOfPieces) ? elem.bookedInfo.numberOfPieces : '0';
                let weight = (elem.bookedInfo && elem.bookedInfo.weight) ? elem.bookedInfo.weight : '0';
                let containsULD: string = (elem.shcs && elem.shcs.indexOf('BUP') !== -1) ? 'Yes' : '';
                let tempWeight = Number(weight).toFixed(1);
                let tmpAWB: IDropoffList = {userProvidedAirwayBill: elem, pieces: numberOfPieces, weight: tempWeight,
                                            aWBNumber: elem.awbNumber,
                                            origin: elem.origin,
                                            destination: elem.destination,
                                            expectedNumberOfPieces: numberOfPieces,
                                            expectedWeight: tempWeight,
                                            uld: containsULD
                                           };
                tmpAirwayBills.push(tmpAWB);
              }
            }
            this.airwayBills = tmpAirwayBills;
          }
          this.spinner.hide();
        });
      }
    }
  }

  onContinuation(pos: string) {      // inputs:  'next'  |  'prev'  |  index
    this.spinner.show();
    this.searchClicked = true;
    this.errorRaised = false;
    let tokenIndex: number;
    //retrieve appropriate token
    if (pos == 'next') {
      tokenIndex = this.paginationIndex;
    }
    else if (pos == 'prev') {
      tokenIndex = this.paginationIndex -2;
    }
    else {
      tokenIndex = +pos -1;
    }
    let token = this.continuationTokens[tokenIndex];
    var params = new HttpParams().set('ctkn', token);
    var httpOptions = { params: params, observe: 'response' };
    this.awbService.searchDropoffAWBs(this.awbNumber.trim(), this.navMenu.selectedGH, httpOptions).then(resp => {
      // parse response obj
      const body: Array<AirwayBill> = resp.body;
      // check no error was thrown by interceptor
      if (resp.body.error == true) {
        this.errorRaised = true;
      }
      else {  // set pagination index position
        switch (pos) {
          case 'next':
            this.paginationIndex++;
            break;
          case 'prev':
            (this.paginationIndex-- <= 0) ? this.paginationIndex = 0 : this.paginationIndex;
            break;
          default:
            this.paginationIndex = +pos;
        }

        const headers: HttpHeaders = resp.headers;
        this.nextContinuationToken = headers.get('ContinuationToken');
        const keys = resp.headers.keys();
        /* manage pagination token array (if 'next' or last item in token array & end point not reached) */
        if (pos == 'next' && (this.paginationIndex == this.continuationTokens.length) ) {
          if (this.nextContinuationToken) {
            this.continuationTokens.push(this.nextContinuationToken);
          }
          else { //no further records
            this.continuationTokens.push('');
            this.lastPage = true;
          }
        }
        /* add derived properties */
        let tmpAirwayBills: IDropoffList[] = [];
        for (let elem of body) {
          if (!elem.hawbs || elem.hawbs === null || (elem.hawbs && elem.hawbs.length === 0)) {     // temp disable any hawbs
            let numberOfPieces = (elem.bookedInfo && elem.bookedInfo.numberOfPieces) ? elem.bookedInfo.numberOfPieces : '0';
            let weight = (elem.bookedInfo && elem.bookedInfo.weight) ? elem.bookedInfo.weight : '0';
            let tempWeight = Number(weight).toFixed(1);
            let containsULD: string = (elem.shcs && elem.shcs.indexOf('BUP') !== -1) ? 'Yes' : '';
            let tmpAWB: IDropoffList = {userProvidedAirwayBill: elem, pieces: numberOfPieces, weight: tempWeight,
                                        aWBNumber: elem.awbNumber,
                                        origin: elem.origin,
                                        destination: elem.destination,
                                        expectedNumberOfPieces: numberOfPieces,
                                        expectedWeight: tempWeight,
                                        uld: containsULD
            };
            tmpAirwayBills.push(tmpAWB);
          }
        }
        this.airwayBills = tmpAirwayBills;
        this.searchClicked = true;
      }
      this.spinner.hide();
    });
  }

  resetPagination() {
    this.paginationFlag = false;
    this.paginationIndex = 1;
    this.nextContinuationToken = '';
    this.continuationTokens = [''];
    this.lastPage = false;
  }

  removeSelection($event) {
    // quirk to handle un-highlighting removed row. See 'Change Detection' in Table component doc
    var tmpSelectedAWBs = this.selectedAWBs;
    let index = tmpSelectedAWBs.findIndex(awb => awb.aWBNumber === $event);
    tmpSelectedAWBs.splice(index, 1);
    this.selectedAWBs = [...tmpSelectedAWBs];
  }

  isSelected($event) {
    if (this.mainTable)
      return this.mainTable.isSelected($event);
    else
      return false;
  }

  editSelection($event, rowData, rowIndex) {
    this.selectedAWB = $event;
    this.selectedAWBIndex = rowIndex;
    this.adjustedNumberOfPieces = parseInt(this.selectedAWBs[rowIndex].pieces);
    this.maxValue = parseInt(this.selectedAWBs[rowIndex].expectedNumberOfPieces);
    this.displayEditModal = true;
  }

  updatePieces() {
    this.displayEditModal = false;
    this.selectedAWBs[this.selectedAWBIndex].pieces = this.adjustedNumberOfPieces;
    //derive new weight
    let $awb = this.selectedAWBs[this.selectedAWBIndex];
    let calcWeight = Number(($awb.expectedWeight / $awb.expectedNumberOfPieces ) * $awb.pieces).toFixed(1);
    this.selectedAWBs[this.selectedAWBIndex].weight = calcWeight;
    // adjust totals for display
    if (this.selectedAWBs[this.selectedAWBIndex].uld === 'Yes'
         && this.selectedAWBs[this.selectedAWBIndex].selectedUlds
         && this.selectedAWBs[this.selectedAWBIndex].selectedUlds.length > 0) {
      this.recalculateTotals(this.selectedAWBs[this.selectedAWBIndex].selectedUlds );
    } else {
      this.selectedAWBs[this.selectedAWBIndex].totalPieces = this.adjustedNumberOfPieces;
      this.selectedAWBs[this.selectedAWBIndex].totalWeight = calcWeight
    }
  }


  onRowSelect(event) {
    // console.log(JSON.stringify(event, null, 2));
    let idx = this.selectedAWBs.length - 1;  // identify next selectedAWB array index..
    // console.info('next index: ' + idx);
    this.selectedAWBs[idx].pieces = parseInt(this.selectedAWBs[idx].expectedNumberOfPieces);
    this.selectedAWBs[idx].totalPieces = parseInt(this.selectedAWBs[idx].expectedNumberOfPieces);
    this.selectedAWBs[idx].totalExpectedPieces = parseInt(this.selectedAWBs[idx].expectedNumberOfPieces);
    this.selectedAWBs[idx].weight = parseFloat(this.selectedAWBs[idx].expectedWeight);
    this.selectedAWBs[idx].totalWeight = parseFloat(this.selectedAWBs[idx].expectedWeight);
    this.selectedAWBs[idx].totalExpectedWeight = parseInt(this.selectedAWBs[idx].expectedWeight);
    if ( event.data.uld === 'Yes') {
      let ulds = this.uldService.extractULDs(event.data.userProvidedAirwayBill.bookingInfo);
      this.selectedULDs = JSON.parse(JSON.stringify(ulds));
      this.selectedAWB = this.selectedAWBs[idx].userProvidedAirwayBill.awbNumber;
      this.selectedAWBIndex = idx;
      this.isEdit = false;
      this.displayULDsModal = true;
    }
  }

  toggleUlds(idx) {
    console.log('toggleULDs > showUlds: ' + this.selectedAWBs[idx].showUlds);
    this.selectedAWBs[idx].showUlds = !this.selectedAWBs[idx].showUlds;
  }

  editULDs($event, rowData, rowIndex) {
    this.selectedAWB = $event;
    this.selectedAWBIndex = rowIndex;
    this.isEdit = true;
    this.selectedULDs = JSON.parse(JSON.stringify(this.selectedAWBs[rowIndex].selectedUlds));
    this.displayULDsModal = true;
  }

  cancelULDs($event) {
    // console.info('>>Dropoff Comp >cancelULDs()...' + $event);
    if ($event === 'entry' ) {
      this.selectedULDs = [];                                       // refresh issue sol
      this.selectedAWBs[this.selectedAWBIndex].selectedUlds = null;
    }
    this.displayULDsModal = false;
  }

  updateULDs($event) {
    // console.info('>>Dropoff Comp >updateULDs()...' + JSON.stringify($event, null, 2) );
    this.selectedAWBs[this.selectedAWBIndex].selectedUlds = $event;
    this.recalculateTotals($event);      // adjust pieces & weight for ULDs
    this.displayULDsModal = false;
  }

  recalculateTotals($event) {
    let pieces = +this.selectedAWBs[this.selectedAWBIndex].pieces;
    let piecesExpected = +this.selectedAWBs[this.selectedAWBIndex].expectedNumberOfPieces;
    let weight = +this.selectedAWBs[this.selectedAWBIndex].weight;
    let weightExpected = +this.selectedAWBs[this.selectedAWBIndex].expectedWeight;
    let urlPieces = 0, urlWeight = 0;
    if ($event.length > 0) {
      urlPieces = $event.map(i => +i.pieces).reduce((a, n) => a + n);
      urlWeight = $event.map(i => +i.weight).reduce((a, n) => a + n);
    }
    this.selectedAWBs[this.selectedAWBIndex].totalPieces = pieces + urlPieces;
    this.selectedAWBs[this.selectedAWBIndex].totalExpectedPieces = piecesExpected + urlPieces;
    this.selectedAWBs[this.selectedAWBIndex].totalWeight = weight + urlWeight;
    this.selectedAWBs[this.selectedAWBIndex].totalExpectedWeight = weightExpected + urlWeight;
  }

  cancel() {
    this.displayEditModal = false;
  }

  next() {
    this.driverDetailView = true;
    this.navMenu.setPageTitle('Driver Details');
  }

  back() {
    this.driverDetailView = false;
    this.navMenu.setPageTitle(this.title);
  }

  setFocus() {
    // setTimeout( () => (document.querySelector('#hl-pieces-input input') as HTMLElement).focus() , 0 );
  }

  exportVCTRequest() {
    this.driverDetailView = false;
    this.spinner.show();
    this.nextClicked = true;
    this.vehicleInfo.driverInfo = this.driverInfo;
    // console.log('vehicle: ' + JSON.stringify(this.vehicleInfo, null, 2) );
    this.uldService.initializeULDCargoInfo();
    let containerContentInfo: object = {};
    // console.log('>>exportVCTRequests - selectedAWBs: ' + JSON.stringify(this.selectedAWBs, null, 2));
    for (let awb of this.selectedAWBs) {
      // console.log('>>exportVCTRequests: loop AWBs--- ' + JSON.stringify(awb, null, 2))
      /* loose cargo */
      // console.warn(`>>looseCargo: ${awb.aWBNumber} - ${awb.pieces} - ${awb.weight} ` );
      containerContentInfo[awb.aWBNumber] = {'numberOfPieces': awb.pieces, 'weight': awb.weight };
      // console.error('containerContentInfo: ' + JSON.stringify(containerContentInfo, null, 2));
      /* ULD cargo */
      if (awb.selectedUlds) {
        // console.warn('ULD array detected..');
        // console.info('>>ULDCargo: ' + JSON.stringify(awb.selectedUlds, null, 2) );
        // console.info('..start to loop through');
        // loop through ULDs
        for (let uld of awb.selectedUlds) {
          // console.warn('looping - ULD: ' + JSON.stringify(uld, null, 2));
          let index = this.uldService.searchReqULD(uld.serial);
          // console.error('>>uldService.searchReqULD() - returned index: ' + index);
          if (index !== -1) {
            // console.error('update');
            this.uldService.updateReqULD(awb.aWBNumber, uld, index);
          } else {
            // console.error('create');
            this.uldService.createReqULD(awb.aWBNumber, uld);
          }
        }
      }
    }
    const looseCargoInfo: Loose = new Loose( containerContentInfo );
    // console.error('looseCargoInfo: ' + JSON.stringify(looseCargoInfo, null, 2));
    const uldCargoInfo: Array<ULD> = this.uldService.getULDCargoInfo();
    // console.error('uldCargoInfo: ' + JSON.stringify(uldCargoInfo, null, 2));
    const vctManifestInfo: VCTManifest = new VCTManifest(looseCargoInfo, uldCargoInfo);
    // console.error('manifestInfo: ' + JSON.stringify(vctManifestInfo, null, 2));

    // construct final exportVCTRequest for POST request
    let deliveryMethodValue: number = DeliveryMethod[this.selectedDeliveryMethod];
    let exportVCTRequest: ExportVCTRequest = new ExportVCTRequest( 'customer1', this.vehicleInfo, vctManifestInfo, this.navMenu.selectedGH, deliveryMethodValue);
    console.log('ExportVCTRequest: ' + JSON.stringify(exportVCTRequest, null, 2) );

    this.vctService.exportVCTRequest( exportVCTRequest, this.navMenu.selectedGH )
      .then(res => {
        this.spinner.hide();
        if (res == null) {
          // non-blocking notification & redirect
          toastr.info(`<b>Success</b>: VCT Request for Drop-Off Submitted
                                <i style="font-size: 0.85em;">(Check status in E-Ticket section. It may take some time for status to appear there.)</i>`)
            .css('width', '400px');
        }
        this.resetSearch();
        this.router.navigate(['/e-checkin']);
      });

  }

  validateSearchStr() {
    this.isValidSearchStr = false;
    if (this.awbNumber) {
      let searchStr = this.awbNumber.trim();
      if (searchStr.length > 0) {
        this.isValidSearchStr = true;
      }
    }
  }

  resetSearch() {
    this.awbNumber = '';
    this.isValidSearchStr = false;
    this.airwayBills = [];
    this.selectedAWBs = [];
    this.searchClicked = false;
    this.nextClicked = false;
    this.eta = null;
  }

  ngOnInit() {
    this.searchClicked = false;
    this.navMenu.setPageTitle(this.title);
    this.navMenu.mblBackImg(false);
    this.cols = [
      { field: 'aWBNumber', header: 'AWB Number' },
      { field: 'origin', header: 'Origin' },
      { field: 'destination', header: 'Destination' },
      { field: 'expectedNumberOfPieces', header: 'Number of Pieces' },
      { field: 'uld', header: 'ULDs' },
      { field: 'expectedWeight', header: 'Weight(kg)' }
    ];
    // doorOptions SelectItems
    this.doorOptions = [
      {label: 'Front', value: 'FRONT'},
      {label: 'Side', value: 'SIDE'},
      {label: 'Back', value: 'BACK'},
      {label: 'Ramp', value: 'RAMP'}
    ];

    if ( this.navMenu.initialLoad ) {
      this.spinner.show();
      this.navMenu.initialLoad = false;
      this.navMenu.initializeGroundHandlers();
    }
    else {
      this.spinner.hide();
    }
  }
}

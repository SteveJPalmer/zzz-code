import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { AwbService } from '../Services';
import { AirwayBill } from '../models';
import { NavMenuService } from '../nav-menu/nav-menu.service';
import { OrgsService } from '../Services';
import { VctService } from '../Services';

import { Table } from 'primeng/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { hlDetail, hlList, hlData } from '../shared';
import { MapToIterable } from '../shared';

import { Vehicle, Driver, VCTBooking, ImportVCTRequest, VCTManifest, Loose, DeliveryMethod, Appointment } from '../models';
import { IPickupList } from './IPickupList';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss'],
  animations: [ hlDetail, hlList, hlData ]
})

export class PickupComponent implements OnInit {
  title: string = 'Pick-up';
  cols: any[];
  awbNumber: string;
  isValidSearchStr: boolean = false;
  airwayBills: IPickupList[];
  selectedAWBs: any[];
  @ViewChild('mainTable') private mainTable: Table;
  appointment: Date;
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

  constructor(private awbService: AwbService,
              private spinner: NgxSpinnerService,
              public navMenu: NavMenuService,
              private router: Router,
              private orgsService: OrgsService,
              private vctService: VctService,
              private cdRef : ChangeDetectorRef) {
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
        this.awbService.searchPickupAWBs(this.awbNumber.trim(), this.navMenu.selectedGH, httpOptions ).then(resp => {
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
            if (ContinuationToken) {
              this.paginationFlag = true;
              this.nextContinuationToken = ContinuationToken;
              this.continuationTokens.push(ContinuationToken);
            }
            /* add derived properties */
            let tmpAirwayBills: IPickupList[] = [];
            for (let elem of body) {
              let tempWeight = Number(elem.consignmentInfo.expectedWeight).toFixed(1);
              let tmpAWB: IPickupList = {userProvidedAirwayBill: elem, pieces: elem.consignmentInfo.expectedNumberOfPieces, weight: tempWeight,
                aWBNumber: elem.awbNumber,
                origin: elem.origin,
                destination: elem.destination,
                expectedNumberOfPieces: elem.consignmentInfo.expectedNumberOfPieces,
                expectedWeight: tempWeight
              };
              tmpAirwayBills.push(tmpAWB);
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
    this.awbService.searchPickupAWBs(this.awbNumber.trim(), this.navMenu.selectedGH, httpOptions).then(resp => {
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
        let tmpAirwayBills: IPickupList[] = [];
        for (let elem of body) {
          let tempWeight = Number(elem.consignmentInfo.expectedWeight).toFixed(1);
          let tmpAWB: IPickupList = {userProvidedAirwayBill: elem, pieces: elem.consignmentInfo.expectedNumberOfPieces, weight: tempWeight,
            aWBNumber: elem.awbNumber,
            origin: elem.origin,
            destination: elem.destination,
            expectedNumberOfPieces: elem.consignmentInfo.expectedNumberOfPieces,
            expectedWeight: tempWeight
          };
          tmpAirwayBills.push(tmpAWB);
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
    let index = tmpSelectedAWBs.findIndex(awb => awb.awbNumber === $event);
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
    // let selectedAWB = $event;
    this.selectedAWB = $event;
    this.selectedAWBIndex = rowIndex;
    this.adjustedNumberOfPieces = parseInt(this.selectedAWBs[rowIndex].pieces);
    this.maxValue = parseInt(this.selectedAWBs[rowIndex].expectedNumberOfPieces);
    this.displayEditModal = true;  //show modal
  }

  updatePieces() {
    this.displayEditModal = false;
    this.selectedAWBs[this.selectedAWBIndex].pieces = this.adjustedNumberOfPieces;
    //derive new weight
    let $awb = this.selectedAWBs[this.selectedAWBIndex];
    let calcWeight = Number(($awb.expectedWeight / $awb.expectedNumberOfPieces ) * $awb.pieces).toFixed(1);
    this.selectedAWBs[this.selectedAWBIndex].weight = calcWeight;
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

  importVCTRequest() {
    this.driverDetailView = false;
    this.spinner.show();
    this.nextClicked = true;
    this.vehicleInfo.driverInfo = this.driverInfo;
    //console.log('vehicle: ' + JSON.stringify(this.vehicleInfo, null, 2) );

    /* Note: PrimeNg Calender does not support Unix time at this time - need to convert */
    let unixTime = this.appointment ? Math.round(this.appointment.getTime() / 1000) : null;   //convert form js Epoch Time to standard Unix Time
    let appointment: Appointment = new Appointment(unixTime);
    // console.info('>>importVCTRequest - appointment: ' + appointment);

    let vctBookings: Array<VCTBooking> = [];
    for (let booking of this.selectedAWBs) {
      /* construct each booking for request */
      let tmpBooking: VCTBooking = { userProvidedAirwayBill: booking.userProvidedAirwayBill,
        pieces: booking.pieces,
        weight: booking.weight,
        rejectReason: null };
      delete tmpBooking.userProvidedAirwayBill['_ts'];
      delete tmpBooking.userProvidedAirwayBill['_rid'];
      delete tmpBooking.userProvidedAirwayBill['_self'];
      delete tmpBooking.userProvidedAirwayBill['_etag'];
      vctBookings.push(tmpBooking);
    }
    //console.log('vctBookings: ' + JSON.stringify(vctBookings, null, 2) );
    let looseCargoInfo: Array<Loose> = [new Loose( vctBookings )];
    let manifestInfo: VCTManifest = new VCTManifest( looseCargoInfo );
    //construct final importVCTRequest for POST request
    let deliveryMethodValue: number = DeliveryMethod[this.selectedDeliveryMethod];
    let importVCTRequest: ImportVCTRequest = new ImportVCTRequest( appointment, this.vehicleInfo, manifestInfo, deliveryMethodValue);
    console.log('ImportVCTRequest: ' + JSON.stringify(importVCTRequest, null, 2) );

    this.vctService.importVCTRequest( importVCTRequest, this.navMenu.selectedGH )
      .then(res => {
        this.spinner.hide();
        if (res == null) {
          //non-blocking notification & redirect
          toastr.info(`<b>Success</b>: VCT Request for Pick-up Submitted
                     <i style="font-size: 0.85em;">(Check status in E-Ticket section. It may take some time for status to appear there.)</i>`)
            .css("width","400px");
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
    this.appointment = null;
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
      { field: 'expectedWeight', header: 'Weight(kg)' }
    ];
    //doorOptions SelectItems
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


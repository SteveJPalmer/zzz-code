import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { AwbService } from '../Services/awb.service';
import { AirwayBill } from '../models/airwaybill';
import { NavMenuService } from '../nav-menu/nav-menu.service';
import { OrgsService } from '../Services/orgs.service';
import { VctService } from '../Services/vct.service';

import { Table } from 'primeng/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { hlDetail, hlList, hlData } from '../shared';
import { MapToIterable } from '../shared/map-to-iterable.pipe';

import { ExportVCTRequest, VCTRequestStatus,
         Vehicle, Manifest, Loose,
         UserAWB, Booking, Delivery, Agent, Commodity } from '../models';
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
  airwayBills: AirwayBill[];
  selectedAWBs: any[];
  @ViewChild('mainTable') private mainTable: Table;
  dateValue: Date;
  groundHandlers: any;
  selectedGroundHandler: any;

  //flow control
  searchClicked: boolean = false;
  searchReturned: boolean = false;
  nextClicked: boolean = false;
  dataFetched: boolean = false;
  noGroundHandlerWarning: boolean = false;
  ghSelected: boolean = false;
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
  vehicleInfo: Vehicle = new Vehicle();

  constructor(private awbService: AwbService,
              private spinner: NgxSpinnerService,
              private navMenu: NavMenuService,
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
        this.awbService.searchAWBs(this.awbNumber.trim(), this.selectedGroundHandler.key, httpOptions ).then(resp => {
          // parse response obj
          this.searchReturned = true;
          const body: Array<AirwayBill> = resp.body;
          // check no error thrown by interceptor
          if (resp.body.error == true) {
            this.errorRaised = true;
            this.spinner.hide();
            this.awbNumber = '';
            this.isValidSearchStr = false;
          }
          else {
            //console.log('Successful call.');
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
              let tempWeight = Number(elem.weight).toFixed(1);
              let tmpAWB: IDropoffList = {...elem, _selectedPieces:elem.numberOfPieces, _selectedWeight:tempWeight };
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
    this.awbService.searchAWBs(this.awbNumber, this.selectedGroundHandler.key, httpOptions).then(resp => {
      // parse response obj
      const body: Array<AirwayBill> = resp.body;
      // check no error was thrown by interceptor
      if (resp.body.error == true) {
        this.errorRaised = true;
        this.spinner.hide();
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
          let tempWeight = Number(elem.weight).toFixed(1);
          let tmpAWB: IDropoffList = {...elem, _selectedPieces:elem.numberOfPieces, _selectedWeight:tempWeight };
          tmpAirwayBills.push(tmpAWB);
        }
        this.airwayBills = tmpAirwayBills;
        this.searchClicked = true;
        this.spinner.hide();
      }
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
    this.adjustedNumberOfPieces = parseInt(this.selectedAWBs[rowIndex]._selectedPieces);
    this.maxValue = parseInt(this.selectedAWBs[rowIndex].numberOfPieces);
    this.displayEditModal = true;  //show modal
  }

  updatePieces() {
    this.displayEditModal = false;
    this.selectedAWBs[this.selectedAWBIndex]._selectedPieces = this.adjustedNumberOfPieces;
    //derive new weight
    let $awb = this.selectedAWBs[this.selectedAWBIndex];
    let calcWeight = Number(($awb.weight / $awb.numberOfPieces ) * $awb._selectedPieces).toFixed(1);
    this.selectedAWBs[this.selectedAWBIndex]._selectedWeight = calcWeight;
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
    setTimeout( () => (document.querySelector('#hl-pieces-input input') as HTMLElement).focus() , 0 );
  }

  exportVCTRequest() {
    this.driverDetailView = false;
    this.spinner.show();
    this.nextClicked = true;
    // construct userProvidedAWBs array
    var userProvidedAWBs: UserAWB[] = [];
    let selectedCount = this.selectedAWBs.length;

    for (let awb of this.selectedAWBs ) {
      /* construct each UserAWB */
      let delivery: Delivery = new Delivery( String(selectedCount) );
      let agent: Agent = new Agent('12345678','AA/BB/00001-01','TestAgent');
      let commodity: Commodity = new Commodity('Test value');
      let awbNumber: string[] = awb.awbNumber.split('-');
      let booking: Booking = new Booking(awb._selectedPieces, awb._selectedWeight, awbNumber[0], awb.destination, commodity, agent, []);
      let userAWB: UserAWB = new UserAWB( awbNumber[0], awbNumber[1], delivery, booking);
      userProvidedAWBs.push(userAWB);
    }

    // construct manifestInfo obj
    let looseCargoInfo: Array<Loose> = [new Loose( userProvidedAWBs )];
    let manifestInfo: Manifest = new Manifest( looseCargoInfo );

    //construct final exportVCTRequest for POST request
    let exportVCTRequest: ExportVCTRequest = new ExportVCTRequest(undefined, VCTRequestStatus["Waiting for VCT"],'customer1', this.vehicleInfo, manifestInfo);

    // this.vctService.exportVCTRequest(this.mockExportVCT, this.selectedGroundHandler.key)
    this.vctService.exportVCTRequest( exportVCTRequest, this.selectedGroundHandler.key )
      .then(res => {
        this.spinner.hide();
        if (res == null) {
          //non-blocking notification & redirect
          toastr.info(`<b>Success</b>: VCT Request for Drop-Off Submitted
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
    this.dateValue = null;
  }

  ghChanged(event) {
    this.resetSearch();
    this.ghSelected = true;
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.searchClicked = false;
    this.navMenu.setPageTitle(this.title);
    this.navMenu.mblBackImg(false);
    this.cols = [
      { field: 'awbNumber', header: 'AWB Number' },
      { field: 'origin', header: 'Origin' },
      { field: 'destination', header: 'Destination' },
      { field: 'numberOfPieces', header: 'Number of Pieces' },
      { field: 'weight', header: 'Weight(kg)' }
    ];

    this.dataFetched = false;
    this.orgsService.getThisUserGroundHandlers().then(res => {
      this.groundHandlers = new MapToIterable().transform(res,null);
      this.dataFetched = true;
      this.ghSelected = false;
      this.spinner.hide();
      if (this.groundHandlers.length == 0) {
        this.noGroundHandlerWarning = true;
      }
      else if (this.groundHandlers.length == 1) {
        this.selectedGroundHandler = this.groundHandlers[0];
        this.ghSelected = true;
        this.ghDefaulted = true;
        setTimeout( () => {
          (document.querySelector('.hl-awb-input') as HTMLElement).focus();
        },0 );
      }
    });
    //doorOptions SelectItems
    this.doorOptions = [
      {label: 'Front', value: 'FRONT'},
      {label: 'Side', value: 'SIDE'},
      {label: 'Back', value: 'BACK'}
    ];
  }
}

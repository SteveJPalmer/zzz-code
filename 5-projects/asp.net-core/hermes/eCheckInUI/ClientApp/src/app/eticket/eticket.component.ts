import { Component, OnInit } from '@angular/core';

import { VctService } from '../Services';
import { NavMenuService } from '../nav-menu/nav-menu.service';
import { ExportVCTRequest, VCTRequestStatus  } from "../models";
import { NgxSpinnerService } from "ngx-spinner";
import { hlDetail, hlList } from '../shared';
import { OrgsService } from '../Services';
import { SortEvent } from 'primeng/components/common/sortevent';

@Component({
  selector: 'app-eticket',
  templateUrl: './eticket.component.html',
  styleUrls: ['./eticket.component.scss'],
  animations: [ hlDetail, hlList ]
})

export class EticketComponent implements OnInit {
  title: string = 'E-Ticket(s)';
  listCols: any[];
  detailCols: any[];
  vctRequests: ExportVCTRequest[];
  selectedVctRequest: ExportVCTRequest;
  groundHandlers: any;
  selectedGroundHandler: any;
  showQRCode: boolean = false;
  codeValue: any;

  //flow control
  detailView: boolean;
  selectedVctIndex: number;
  selectedVctNumber: string;
  dataFetched: boolean = false;
  errorRaised: boolean = false;

  //filter panel
  stime: Date = null;
  etime: Date = null;
  filterActive: boolean = false;
  noVctsMsg: boolean = false;

  constructor( private vctService: VctService,
               private spinner: NgxSpinnerService,
               private orgsService: OrgsService,
               public navMenu: NavMenuService) { }

  viewVctRequest(rowIndex, $event) {
    this.detailView = true;
    this.selectedVctIndex = rowIndex;
    this.selectedVctRequest = this.vctRequests[rowIndex];
    this.selectedVctNumber = (this.selectedVctRequest.vctRequestStatus <= VCTRequestStatus.Submitted) ? "< awaiting.. >" : $event;
    // show QRCode if VCT Number available and no errors
    if (   this.selectedVctRequest.vctRequestStatus > VCTRequestStatus.Submitted
        && this.selectedVctRequest.vctRequestStatus != VCTRequestStatus["Retry or Contact Support"] ) {
       this.showQRCode = true;
       this.codeValue = this.vctRequests[rowIndex].vctNumber;
    }
    else {
      this.showQRCode = false;
    }
  }

  back() {
    this.detailView = false;
    this.selectedVctRequest = null;
  }

  ghChanged(event) {
    //refresh Vct Request table
    this.dataFetched = false;
    this.vctRequests = null;
    this.filterActive = false;
    this.retrieveVctRequests();
  }

  retrieveVctRequests(sTime?: Date, eTime?: Date) {
    //retrieve VCT requests
    this.spinner.show();
    this.dataFetched = false;
    if (sTime || eTime) {
      eTime ? eTime.setHours(23,59,59,999): eTime;
      // eTime ? eTime.setDate(eTime.getDate() + 1): eTime;
      let sUnixTime = sTime ? Math.round(sTime.getTime() / 1000) : null;
      let eUnixTime = eTime ? Math.round(eTime.getTime() / 1000) : null;
      this.vctService.searchVCTs( this.navMenu.selectedGH, sUnixTime, eUnixTime )
        .then(
          res => {
            this.displayVCTs(res);
          }
        );
    }
    else {
      this.vctService.searchVCTs( this.navMenu.selectedGH, )
        .then(
          res => {
            this.displayVCTs(res);
          }
        );
    }
  }

  displayVCTs(res) {
    this.vctRequests = res;
    if (res[0] !== undefined && res[0].id !== undefined) {
      this.dataFetched = true;
    }
    if (this.vctRequests.length == 0) {
      this.noVctsMsg = true;     //filtering no results message
    }
    else {
      this.noVctsMsg = false;
    }
    this.spinner.hide();
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
    if ( this.stime == null && this.etime == null) {
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
      { field: 'vctNumber', header: 'VCT Number', width: '20' },
      { field: 'domain', header: 'Domain', width: '13' },
      { field: 'reg_s', header: 'Vehicle Reg', width: '16' },
      { field: 'requestDateTime', header: 'VCT Date', width: '15' },
      { field: 'vctRequestStatus', header: 'Status', width: '20' }
    ];
    this.detailCols = [
      { field: 'awbNumber', header: 'AWB Number' },
      { field: 'domain', header: 'Domain' },
      { field: 'airline', header: 'Airline' },
      { field: 'pieces', header: 'Pieces' },
      { field: 'weight', header: 'Weight(kg)' },
      { field: 'destination', header: 'Destination' }
    ];
    this.retrieveVctRequests();
  }
}

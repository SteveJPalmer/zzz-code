import { Injectable, Output, EventEmitter, Inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { ServiceBase } from './service-base.service';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AirwayBill } from '../models/airwaybill';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'
import {ExportVCTRequest} from "../models";


@Injectable()
export class AwbService extends ServiceBase {

  private _baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super();
    this._baseUrl = baseUrl;
  }

  getFilesystem() {
    return this.http.get('awbs.json');
  }

  // async has to return Promise  - Error handling in HTTPInterceptor
  async searchDropoffAWBs(awbPrefix: string, gh: string, httpOptions? ): Promise<any> {
    const response = await this.http.get<string>(this._baseUrl + 'api/airwaybills/getdropoffairwaybills/' + gh + '/' + awbPrefix, httpOptions )
      //.do(resp => {
        //console.log(resp);
      //})
      .toPromise();
    return response;
  }

  async searchPickupAWBs(awbPrefix: string, gh: string, httpOptions? ): Promise<any> {
    const response = await this.http.get<string>(this._baseUrl + 'api/airwaybills/getpickupairwaybills/' + gh + '/' + awbPrefix, httpOptions )
      //.do(resp => {
        //console.log(resp);
      //})
      .toPromise();
    return response;
  }

}

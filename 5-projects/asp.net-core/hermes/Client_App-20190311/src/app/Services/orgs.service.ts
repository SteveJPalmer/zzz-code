import { Injectable, Output, EventEmitter, Inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { TreeNode } from 'primeng/api';
import { ServiceBase } from './service-base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AirwayBill } from '../models/airwaybill';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'
import { ExportVCTRequest } from "../models";


@Injectable()
export class OrgsService extends ServiceBase {

  private _baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super();
    this._baseUrl = baseUrl;
  }

  // async has to return Promise  - Error handling in HTTPInterceptor
  async getThisUserGroundHandlers(): Promise<any> {
    const response = await this.http.get<string>(this._baseUrl + 'api/orgsgraph/getthisusergroundhandlers')
      .map(res => JSON.parse(JSON.stringify(res)))
      .toPromise();
    return response;
  }

}

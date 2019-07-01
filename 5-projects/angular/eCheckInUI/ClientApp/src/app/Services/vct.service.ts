import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RestEndpoints } from './rest-endpoints';
import 'rxjs/add/operator/map';
import { ExportVCTRequest, ImportVCTRequest } from '../models';

@Injectable()
export class VctService {

  private _baseUrl: string;
  private _restUrl = RestEndpoints;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  // search VCTs (GET)  - Error handling in HTTPInterceptor
  async searchVCTs(gh: string, domain: string, sTime?: number, eTime?: number, token?: string): Promise<any> {
    let endpoint: string;
    if ( domain === 'pickup' ) {
      endpoint = this._restUrl.vct.getimportvctrequests;
    } else if ( domain === 'dropoff' ) {
      endpoint = this._restUrl.vct.getexportvctrequests;
    }
    // var params;
    // if (sTime) {
    //   params = new HttpParams()
    //     .set('stime', sTime.toString());
    // }
    // if (eTime) {
    //   params = new HttpParams()
    //     .set('etime', eTime.toString());
    // }
    // if (sTime && eTime) {
    //   params = new HttpParams()
    //     .set('stime', sTime.toString())
    //     .set('etime', eTime.toString());
    // }

    /* refactored for additional token param */
    let params;
    if (sTime || eTime || token) {
      params = new HttpParams();
      if (sTime) {
        params = params.set('stime', sTime.toString());
      }
      if (eTime) {
        params = params.set('etime', eTime.toString());
      }
      if (token) {
        params = params.set('ctkn', token);
      }
    }
    const httpOptions: any = { observe: 'response', params : params };
    const response = await this.http.get<string>(this._baseUrl + endpoint + gh, httpOptions )
      .map((res) => this.extractData( res, domain ))
      .toPromise();
    return response;
  }

  extractData: any = (res: any, domain: string) => {
    for (let i = 0; i < res.body.length; i++) {
      res.body[i].domain = domain;
    }
    // return JSON.parse(JSON.stringify(res));
    return res;
  }

  // export VCT (POST)  - Error handling in HTTPInterceptor
  async exportVCTRequest(data: ExportVCTRequest, gh: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const response = await this.http.post<string>(this._baseUrl + this._restUrl.vct.requestexportvct + gh, data, httpOptions)
      .do(data => {
        //console.log('>>VCTService.exportVCTRequest - resp: ' + JSON.stringify(data,null,2));
      })
      .toPromise();
    return response;
  }

  // import VCT (POST)  - Error handling in HTTPInterceptor
  async importVCTRequest(data: ImportVCTRequest, gh: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const response = await this.http.post<string>(this._baseUrl + this._restUrl.vct.requestimportvct + gh, data, httpOptions)
      .do(data => {
        //console.log('>>VCTService.importVCTRequest - resp: ' + JSON.stringify(data,null,2));
      })
      .toPromise();
    return response;
  }

}

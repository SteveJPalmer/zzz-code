import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import 'rxjs/add/operator/map';

import { ExportVCTRequest } from "../models";

@Injectable()
export class VctService {

  private _baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }


  async searchVCTs(gh: string, sTime?: number, eTime?: number): Promise<Array<ExportVCTRequest>> {
    var params;
    if (sTime) {
      params = new HttpParams()
        .set('stime', sTime.toString())
    }
    if (eTime) {
      params = new HttpParams()
        .set('etime', eTime.toString());
    }
    if (sTime && eTime) {
      params = new HttpParams()
        .set('stime', sTime.toString())
        .set('etime', eTime.toString());
    }
    const response = await this.http.get<string>(this._baseUrl + 'api/vct/getexportvctrequests/' + gh, params ? {params} : {} )
      .map(res => JSON.parse(JSON.stringify(res)))
      .toPromise();
    return response;
  }

  // export VCT (POST)  - Error handling in HTTPInterceptor
  async exportVCTRequest(data: ExportVCTRequest, gh: string): Promise<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    const response = await this.http.post<string>(this._baseUrl + 'api/vct/requestexportvct/' + gh, data, httpOptions)
      .do(data => {
        //console.log('>>AWBService.exportVCTRequest - resp: ' + JSON.stringify(data,null,2));
      })
      .toPromise();
    return response;
  }

}

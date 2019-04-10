import { Injectable, Inject } from '@angular/core';
import { ServiceBase } from './service-base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ExportVCTRequest } from "../models";

@Injectable()
export class OrgsService extends ServiceBase {

  private _baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super();
    this._baseUrl = baseUrl;
  }

  // GET - User Ground Handlers
  async getThisUserGroundHandlers(): Promise<any> {
    const response = await this.http.get<string>(this._baseUrl + 'api/orgsgraph/getthisusergroundhandlers')
      .map(res => JSON.parse(JSON.stringify(res)))
      .toPromise();
    return response;
  }

  // GET - User Profile
  async getThisUserProfile(): Promise<any> {
    const response = await this.http.get<string>(this._baseUrl + 'api/orgsgraph/getthisuserprofile')
      .map(res => JSON.parse(JSON.stringify(res)))
      .toPromise();
    return response;
  }

  // POST - update user profile for GH
  async updateThisUserDefaultGroundHandler( gh: string ): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const response = await this.http.post<string>(this._baseUrl + 'api/orgsgraph/updatethisuserdefaultgroundhandler/' + gh, null, httpOptions)
      .toPromise();
    return response;
  }

}

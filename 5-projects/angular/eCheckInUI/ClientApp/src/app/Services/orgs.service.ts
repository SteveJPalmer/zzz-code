import { Injectable, Inject } from '@angular/core';
import { ServiceBase } from './service-base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestEndpoints } from './rest-endpoints';
import 'rxjs/add/operator/map';
import { ExportVCTRequest } from "../models";

@Injectable()
export class OrgsService extends ServiceBase {

  private _baseUrl: string;
  private _restUrl = RestEndpoints;
  constructor( private http: HttpClient,
               @Inject('BASE_URL') baseUrl: string ) {
    super();
    this._baseUrl = baseUrl;
  }

  // GET - User Ground Handlers
  async getThisUserGroundHandlers(): Promise<any> {
    const response = await this.http.get<string>(this._baseUrl + this._restUrl.orgs.getthisusergroundhandlers )
      .map(res => JSON.parse(JSON.stringify(res)))
      .toPromise();
    return response;
  }

  // GET - User Profile
  async getThisUserProfile(): Promise<any> {
    const response = await this.http.get<string>(this._baseUrl + this._restUrl.orgs.getthisuserprofile )
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
    const response = await this.http.post<string>(this._baseUrl + this._restUrl.orgs.updatethisuserdefaultgroundhandler + gh, null, httpOptions)
      .toPromise();
    return response;
  }

}

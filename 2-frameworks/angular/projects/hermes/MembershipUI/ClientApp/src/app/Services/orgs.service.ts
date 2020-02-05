import { Injectable, Inject } from '@angular/core';
import { ServiceBase } from './service-base.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { RestEndpoints } from './rest-endpoints';
import 'rxjs/add/operator/map';
import { OrganizationType, User, UserOrganization } from '../models';

@Injectable()
export class OrgsService extends ServiceBase {

  private _baseUrl: string;
  private _restUrl = RestEndpoints;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super();
    this._baseUrl = baseUrl;
  }

  // GET - User Profile
  async getThisUserProfile(): Promise<any> {
    const response = await this.http.get<string>(this._baseUrl + this._restUrl.orgs.getthisuserprofile )
      .map(res => JSON.parse(JSON.stringify(res)))
      .toPromise();
    return response;
  }

  // GET - User Ground Handlers
  async getThisUserGroundHandlers(): Promise<any> {
    const response = await this.http.get<string>(this._baseUrl + this._restUrl.orgs.getthisusergroundhandlers )
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

  // GET - User Orgs
  async getUserOrgs(): Promise<any> {
    const response = await this.http.get<string>(this._baseUrl + this._restUrl.orgs.getuserorgs )
      .map(res => JSON.parse(JSON.stringify(res)))
      .toPromise();
    return response;
  }

  // POST - Create Organization
  async CreateOrganization(userOrg: UserOrganization): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const response = await this.http.post<string>(this._baseUrl + this._restUrl.orgs.createorganization, userOrg, httpOptions)
      .do(data => {
        // console.log('>>Orgs Service.createOrganization - resp: ' + JSON.stringify(data,null,2));
      })
      .toPromise();
    return response;
  }

  // POST - invite User
  async inviteUser(invitedAs: OrganizationType, email: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const response = await this.http.post<string>(this._baseUrl + this._restUrl.orgs.inviteuser + OrganizationType[invitedAs], { email : email }, httpOptions)
      .do(data => {
        // console.log('>>Orgs Service.inviteUser - resp: ' + JSON.stringify(data,null,2));
      })
      .toPromise();
    return response;
  }

  // GET - incoming invites
  async getIncomingInvites(): Promise<any> {
    const response = await this.http.get<string>(this._baseUrl + this._restUrl.orgs.getincominginvites )
      .toPromise();
    return response;
  }

  // POST - Accept invite
  async acceptInvite(orgId: string, invitedAs: OrganizationType, passcode: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const response = await this.http.post<string>(`${this._baseUrl}${this._restUrl.orgs.acceptInvite}${orgId}/${OrganizationType[invitedAs]}/${passcode}`, null, httpOptions)
      .do(data => {
        // console.log('>>Orgs Service.acceptInvite - resp: ' + JSON.stringify(data,null,2));
      })
      .toPromise();
    return response;
  }

  // POST - Reject invite
  async rejectInvite(orgId: string, invitedAs: OrganizationType): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const response = await this.http.post<string>(`${this._baseUrl}${this._restUrl.orgs.rejectInvite}${orgId}/${OrganizationType[invitedAs]}`, null, httpOptions)
      .do(data => {
        // console.log('>>Orgs Service.rejectInvite - resp: ' + JSON.stringify(data,null,2));
      })
      .toPromise();
    return response;
  }

  // GET - incoming invites
  async getInvitedUsers(): Promise<any> {
    const response = await this.http.get<string>(this._baseUrl + this._restUrl.orgs.getinvitedUsers )
      .toPromise();
    return response;
  }

  // search Users (GET)
  async searchUsers(searchAs: string, SearchFor: string, name?: string, email?: string): Promise<any> {
    let params;
    if (name || email ) {
      params = new HttpParams();
      if (name) {
        params = params.set('name', name);
      }
      if (email) {
        params = params.set('email', email);
      }
    }
    const httpOptions: any = { params : params };
    const response = await this.http.get<string>(`${this._baseUrl}${this._restUrl.orgs.searchUsers}${searchAs}/${SearchFor}`, httpOptions )
      .toPromise();
    return response;
  }


}

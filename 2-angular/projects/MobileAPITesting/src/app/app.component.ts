import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) { }

  title = 'MobileAPITesting';
  clientsApiHealth = '';
  clientsApiData = '';
  assetsApiHealth = '';
  assetsApiData = '';
  dataApiHealth = '';
  dataApiData = '';
  metaApiHealth = '';
  metaApiData = '';
  planningApiHealth = '';
  processesApiHealth = '';
  reportsApiHealth = '';
  ratesApiHealth = '';
  sorApiHealth = '';
  settingsApiHealth = '';
  auditApiHealth = '';

  config = {
    clientsApiUrlHealth: 'https://localhost:44305/api/v1.0/HealthCheck',
    clientsApiUrl: 'https://localhost:44305/api/v1.0/Teams',
    assetsApiUrlHealth: 'https://localhost:44310/api/v1.0/healthcheck',
    assetsApiUrl: 'https://localhost:44310/api/v1.0/assettypes',
    dataApiUrlHealth: 'https://localhost:44349/api/v0.5/healthcheck',
    dataApiUrl: 'https://localhost:44349/api/v0.5/forms',
    metaApiUrlHealth: 'https://localhost:44396/api/v0.1/healthcheck',
    metaApiUrl: 'https://localhost:44396/api/v0.1/AssetTypeMetadata',
    planningApiUrlHealth: 'https://localhost:44321/api/v0.1/healthcheck',
    processesApiUrlHealth: 'https://localhost:44375/api/v0.3/healthcheck',
    reportsApiUrlHealth: 'https://localhost:44376/api/v0.1/healthcheck',
    ratesApiUrlHealth: 'https://localhost:44351/api/v0.1/healthcheck',
    sorApiUrlHealth: 'https://localhost:44388/api/v0.1/healthcheck',
    settingsApiUrlHealth: 'https://localhost:44361/api/v0.1/healthcheck',
    auditApiUrlHealth: 'https://localhost:44317/api/v0.1/healthcheck',

    authToken: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNEODMwRjQ1RkM2MDgxOEY2QzIyOEU2RjVCMDg0OTcwMjEwN0VBMjAiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJQWU1QUmZ4Z2dZOXNJbzV2V3doSmNDRUg2aUEifQ.eyJuYmYiOjE2NjYzNTA0MDMsImV4cCI6MTY5Nzg4NjQwMywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMDAiLCJhdWQiOlsiY2xhcml0eXBpbXNzYXBpIiwiY2xpZW50c2FwaSIsImdlbmVyaWNhcGkiLCJpZGVudGl0eWFwaSIsInZpYWJpbGl0eWFwaSJdLCJjbGllbnRfaWQiOiJyZXNvdXJjZW93bmVycGFzc3dvcmQuY2xpZW50Iiwic3ViIjoiQzBDMzgxOUMtMTc4QS00QUU0LTg1OTgtMEZENzUzNzVEMDdDIiwiYXV0aF90aW1lIjoxNjY2MzUwNDAzLCJpZHAiOiJsb2NhbCIsImNvbXBhbnlfaWQiOiIzIiwiY29tcGFueV9uYW1lIjoiSFdUMiBIZWF0aGVycyBUZXN0IERhdGFiYXNlIC0gREVWIiwiY29tcGFueV90eXBlIjoiU3VwcG9ydCIsImNvbXBhbnlfY29kZSI6IkhXVDIiLCJ1c2VyX2ZsYWdzIjoiQ29tcGFueUFkbWluaXN0cmF0b3IsIFN1cHBvcnQiLCJwcm9kdWN0X2ZsYWdzIjoiVmlhYmlsaXR5LCBDbGFyaXR5IiwibmFtZSI6ImFkbWluQEhXVDIuY29tIiwiZW1haWwiOiJhZG1pbkBod3QyLmNvbSIsInNjb3BlIjpbImNvbXBhbnkucHJvZmlsZS5zY29wZSIsIm9wZW5pZCIsImNsYXJpdHkucGltc3NhcGkuc2NvcGUiLCJjbGllbnRzLmFwaS5zY29wZSIsImdlbmVyaWMuYXBpLnNjb3BlIiwiaWRlbnRpdHkuYXBpLnNjb3BlIiwic3VwcG9ydC5zdGFmZi5zY29wZSIsInZpYWJpbGl0eS5hcGkuc2NvcGUiXSwiYW1yIjpbInB3ZCJdfQ.EuOjdZawSxl0B9NMo98d6yC4iOjbi7X3hWc4wEfviFvihwIioxsou0YDQnJnhnGT5nZ0mzo4sZb7Fnt91b_dH0rNxqRnogc1MX6plgRm_ooTkK-lAj7QpvLj0xp2vSMojJfIGdY5jQumdhcwsLcSQ0wDH7BlQgsZ8engcAEeQSMcIcH8Lj2tWFFoTnuADVA2HIg4iq87T7kKQKavLhqeqc26fsrOoaUbXeSRuR3HoVjnbAg0hsoTbE2PD96UEl8aFW3KkSGi5cN_W0r6hdWEsWH7iJy7_WNzxtp8HWfuVSJkv2tOpHKUvgrVRDMcS1xn-Ex66EqVTN9iKoUg4tmAoTROBvknJ1tGqdb8LGpldQaUyfneOMaCiVq1AuwqR1oeiMJdJgLFT1z-dTSYQ0-2rqPF-_v3_u0iIZzLfo1-W4ipA3G_Po8aUECbnRKSj6XcXWcGgjL_Xgao3Xii5wnAedrm-c6hf8BwwiMMmeRFfMvwu1tNXsQSdT07llw_SnjDprLw_CO2021lDm8l_Vq-Tnd_7fPTkN0vXDjxMkHInAoqURIUVkjMNfuRVAATowpIfpvniQITSCOsQNgUX1Ed0HOoG5VmABB-4vgTgzjgDWncg8PwUPCnkC3AOk3Blr06b9SnU3pIh60nlxpbrXFXrF3HpiDRrgKeNWUMRbmJALk'
  };

  getStuff(url : string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.config.authToken
      })
    };

    let res = this.http.get<any>(url, options);
    return res;
  }

  ngOnInit() {
    this.getStuff(this.config.clientsApiUrlHealth).subscribe(res => {
      this.clientsApiHealth = res;
    });
    this.getStuff(this.config.clientsApiUrl).subscribe(res => {
      this.clientsApiData = res;
    });
    this.getStuff(this.config.assetsApiUrlHealth).subscribe(res => {
      this.assetsApiHealth = res;
    });
    this.getStuff(this.config.assetsApiUrl).subscribe(res => {
      this.assetsApiData = res;
    });
    this.getStuff(this.config.dataApiUrlHealth).subscribe(res => {
      this.dataApiHealth = res;
    });
    this.getStuff(this.config.dataApiUrl).subscribe(res => {
      this.dataApiData = res;
    });
    this.getStuff(this.config.metaApiUrlHealth).subscribe(res => {
      this.metaApiHealth = res;
    });
    this.getStuff(this.config.metaApiUrl).subscribe(res => {
      this.metaApiData = res;
    });

    this.getStuff(this.config.planningApiUrlHealth).subscribe(res => {
      this.planningApiHealth = res;
    });
    this.getStuff(this.config.processesApiUrlHealth).subscribe(res => {
      this.processesApiHealth = res;
    });
    this.getStuff(this.config.reportsApiUrlHealth).subscribe(res => {
      this.reportsApiHealth = res;
    });
    this.getStuff(this.config.ratesApiUrlHealth).subscribe(res => {
      this.ratesApiHealth = res;
    });

    this.getStuff(this.config.sorApiUrlHealth).subscribe(res => {
      this.sorApiHealth = res;
    });
    this.getStuff(this.config.settingsApiUrlHealth).subscribe(res => {
      this.settingsApiHealth = res;
    });
    this.getStuff(this.config.auditApiUrlHealth).subscribe(res => {
      this.auditApiHealth = res;
    });

  }

}

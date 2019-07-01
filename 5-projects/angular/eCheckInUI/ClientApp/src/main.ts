import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function getBaseUrl() {
  //console.info('>>environment: ' + JSON.stringify(environment));
  //return "https://hngcoreapis-dev-wa.azurewebsites.net/";
  //return "https://ngcoreapis-dev-wa.azurewebsites.net/";
  //return "https://localhost:44392/"
  var baseUrl = environment.baseUrl;
  return baseUrl;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}
//console.info('>>environment' + JSON.stringify(environment, null, 2));
//Add comment for commit
//More test commit
platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.log(err));

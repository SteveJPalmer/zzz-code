import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getVersionElem() {
    return element(by.css('app-root app-nav-menu span')).getText();
  }

}

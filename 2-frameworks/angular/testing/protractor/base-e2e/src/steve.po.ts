import { browser, by, element } from 'protractor';

export class StevePage {
  navHome() {
    return browser.get('http://localhost:4200/');
  }

  getPageNameElem() {
    return element(by.css('.page-name'));
    // return $('.page-name');   // alternative short syntax
  }
}

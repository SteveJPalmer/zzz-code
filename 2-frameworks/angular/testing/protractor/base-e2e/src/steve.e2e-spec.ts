import { browser, element, by } from "protractor";
import { StevePage } from "./steve.po";

describe('Protractor Base App', function() {
  let page: StevePage;

  beforeEach(() => {
    page = new StevePage();
  });

  it('should have a title', function() {
    //browser.get('http://localhost:4200/');      // original
    page.navHome();                               // replace with page obj
    expect(browser.getTitle()).toEqual('BaseApp');
  });


  it('should check page name', function() {
    page.navHome();
    // var firstElem = element(by.css('.page-name'));               // original ('.page-name' or '#p1' or 'p')
    //var firstElem = element(by.id('p1'));                         // alternative via id
    var firstElem = page.getPageNameElem();                       // replace with page obj
    expect(firstElem.getText()).toEqual('This is Page1');
  });

  it('should check page name - debug output version (async await)', async function() {
    page.navHome();
    var firstElem = page.getPageNameElem();                        // replace with page obj
    let steve = await firstElem.getText();                         // await  (async before cb fn)
    console.log('>>debug Async: ' + steve);
    expect(firstElem.getText()).toEqual('This is Page1');
  });

  it('should check page name - debug output version (promised)', function() {
    page.navHome();
    var firstElem = page.getPageNameElem();                        // replace with page obj
    firstElem.getText().then(function(text) {        // .then cb fn
      console.log('>>debug Promise: ' + text);
    });
    expect(firstElem.getText()).toEqual('This is Page1');
  });


});

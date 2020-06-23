import { browser, element, by } from "protractor";
import { StevePage } from "./steve.po";

describe('Protractor Base App', function() {
  let page: StevePage;

  beforeEach(() => {
    page = new StevePage();
  });

  it('should have a title', async function() {
    //browser.get('http://localhost:4200/');      // original
    await page.navHome();
    expect(await browser.getTitle()).toEqual('BaseApp');
  });


  it('should check page name', async function() {
    await page.navHome();
    // var firstElem = element(by.css('.page-name'));           // original ('.page-name' or '#p1' or 'p')
    //var firstElem = element(by.id('p1'));                     // alternative via id
    var firstElem = page.getPageNameElem();                     // replace with page obj
    expect(await firstElem.getText()).toEqual('This is Page1');
  });

  it('should check page name - debug output version (async await)', async function() {
    await page.navHome();
    var firstElem = page.getPageNameElem();
    let steve = await firstElem.getText();                      // await (async before cb fn)
    console.log('>>debug Async: ' + steve);
    expect(await firstElem.getText()).toEqual('This is Page1');
  });

  it('should check page name - debug output version (promised)', function() {
    page.navHome();                                             // async in method
    var firstElem = page.getPageNameElem();
    firstElem.getText().then(function(text) {     // .then cb fn
      console.log('>>debug Promise: ' + text);
    });
    expect(firstElem.getText()).toEqual('This is Page1');
  });

});

//test remote app url
describe('Calculator', function() {

  //alternative - pull nav into beforeEach
  // beforeEach(function() {
  //   browser.get('http://juliemr.github.io/protractor-demo/');
  // });

  it('should have a title', function() {
    //navigates to app url
    browser.get('http://juliemr.github.io/protractor-demo/');
    //check title
    expect(browser.getTitle()).toEqual('Super Calculator');   //pass
  });

  it('should add two numbers', function() {
    // browser.get('http://juliemr.github.io/protractor-demo/');
    element(by.model('first')).sendKeys(1);
    element(by.model('second')).sendKeys(2);

    element(by.id('gobutton')).click();

    expect(element(by.binding('latest')).getText()).toEqual('3');   //pass
  });

  it('should have a history', function() {
    var history = element.all(by.repeater('result in memory'));
    expect(history.count()).toEqual(1);                           //pass
    expect(history.last().getText()).toContain('1 + 2');          //pass
  });
});

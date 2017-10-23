//base test  - ES6 arrow fns
describe('1st tests', () => {
  it('true is true', () => expect(true).toBe(true));
});

//myTests  - ES5 fns
describe('myTests', function () {
  it('test1: true: should be truthy', function () {
    expect(true).toBeTruthy();
  });
});

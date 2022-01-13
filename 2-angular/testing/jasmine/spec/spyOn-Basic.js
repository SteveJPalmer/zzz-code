describe("a spy", function() {
  let foo, bar = null, fetchedBar;

  beforeEach(function() {
    //create obj for our test
    foo = {
      getBar: function() {
        return bar;
      },
      setBar: function(value) {
        bar = value;
      }
    };

    spyOn(foo, 'getBar').and.returnValue(111);   //chain so all calls to fn return specific value

    spyOn(foo, 'setBar');
    // spyOn(foo, 'setBar').and.callThrough();   //chain to also call through to original method

    fetchedBar = foo.getBar();
    foo.setBar(123);
    foo.setBar(456, 'another param');
  });

  it("spy returns specified value", function() {
    expect(fetchedBar).toEqual(111);    //if chained to .and.returnValue() will equal specified value
  });

  it("tracks that spy was called", function() {
    expect(foo.setBar).toHaveBeenCalled();
  });

  it("tracks that spy was called 2 times", function() {
    expect(foo.setBar).toHaveBeenCalledTimes(2);
  });

  it("tracks all arguments of its calls", function() {
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });

  it("no call made to original fn", function() {
    expect(bar).toBeNull();         //bar never set as spy stubs fn (cf and.callThrough)
    // expect(bar).toEqual(456);    //if chained to .and.callThrough() will equal last call
  });

});
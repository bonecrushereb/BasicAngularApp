var angular = require('angular');

describe('spHandleError service', function() {
  var spHandleError;
  beforeEach(angular.mock.module('angApp'));

  it('should return a function', angular.mock.inject(function(spHandleError) {
    expect(typeof spHandleError).toBe('function');
  }));

  it('should add an error to the errors array', angular.mock.inject(function(spHandleError) {
    var testArr = [];
    spHandleError(testArr, 'test message')();
    expect(testArr.length).toBe(1);
    expect(testArr[0] instanceof Error).toBe(true);
    expect(testArr[0].message).toBe('test message');
  }));
});

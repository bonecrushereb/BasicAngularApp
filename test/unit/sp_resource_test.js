const angular = require('angular');

describe('spResource service', function() {
  var spResource;
  beforeEach(angular.mock.module('angApp'));

  it('should return a function', angular.mock.inject(function(spResource) {
    expect(typeof spResource).toBe('function');
  }));
});

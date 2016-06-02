var angular = require('angular');

describe('spStore service', function() {
  var spStore;
  beforeEach(angular.mock.module('angApp'));

  it('should return an object', angular.mock.inject(function(spStore) {
    expect(typeof spStore).toBe('object');
  }));
  describe('spStore functions', function() {


    beforeEach(angular.mock.inject(function(spStore) {
      var sharks = [];
      var preys = [];
      spStore.addShark('test shark');
      spStore.addPrey('test prey');
    }));

    it('should increment a shark when addShark is called', angular.mock.inject(function(spStore) {
      expect(spStore.sharks.length).toBe(1);
    }));

    it('should increment a prey when addPrey is called', angular.mock.inject(function(spStore) {
      expect(spStore.preys.length).toBe(1);
    }));

    it('should add the total of sharks and preys', angular.mock.inject(function(spStore) {
      spStore.total();
      expect(spStore.total()).toBe(2);
    }));
  });
});

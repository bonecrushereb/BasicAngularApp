var angular = require('angular');
require('angular-mocks');

describe('preys controller', function() {
  var $controller;

  beforeEach(angular.mock.module('angApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var preysctrl = $controller('PreysController');
    expect(typeof preysctrl).toBe('object');
    expect(typeof preysctrl.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    var $httpBackend;
    var preysctrl;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      preysctrl = $controller('PreysController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to recieve preys', function() {
      $httpBackend.expectGET('http://localhost:5555/api/preys')
      .respond(200, [{ name: 'test prey' }]);
      preysctrl.getAll();
      $httpBackend.flush();
      expect(preysctrl.preys.length).toBe(1);
      expect(preysctrl.preys[0].name).toBe('test prey');
    });

    it('should create a prey', function() {
      $httpBackend.expectPOST('http://localhost:5555/api/preys', { name: 'human' })
      .respond(200, { name: 'some prey' });
      expect(preysctrl.preys.length).toBe(0);
      preysctrl.newPrey = { name: 'human' };
      preysctrl.createPrey();
      $httpBackend.flush();
      expect(preysctrl.preys[0].name).toBe('some prey');
      expect(preysctrl.newPrey).toBe(null);
    });

    it('should update a prey', function() {
      $httpBackend.expectPUT('http://localhost:5555/api/preys/1',
      { name: 'changed prey!', editing: true, _id: 1 }).respond(200);

      preysctrl.preys = [{ name: 'test prey', editing: true, _id: 1 }];
      preysctrl.preys[0].name = 'changed prey!';
      preysctrl.updatePrey(preysctrl.preys[0]);
      $httpBackend.flush();
      expect(preysctrl.preys[0].editing).toBe(false);
    });

    it('should delete a prey', function() {
      $httpBackend.expectDELETE('http://localhost:5555/api/preys/1').respond(200);
      preysctrl.preys = [{ name: 'human', _id: 1 }];
      preysctrl.removePrey(preysctrl.preys[0]);
      $httpBackend.flush();
      expect(preysctrl.remote.data.length).toBe(0);
    });
  });
});

var angular = require('angular');
require('angular-mocks');

describe('sharks controller', function() {
  var $controller;

  beforeEach(angular.mock.module('angApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var sharksctrl = $controller('SharksController');
    expect(typeof sharksctrl).toBe('object');
    expect(typeof sharksctrl.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    var $httpBackend;
    var sharksctrl;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      sharksctrl = $controller('SharksController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to recieve sharks', function() {
      $httpBackend.expectGET('http://localhost:5555/api/sharks')
      .respond(200, [{ name: 'test shark' }]);
      sharksctrl.getAll();
      $httpBackend.flush();
      expect(sharksctrl.sharks.length).toBe(1);
      expect(sharksctrl.sharks[0].name).toBe('test shark');
    });

    it('should create a shark', function() {
      $httpBackend.expectPOST('http://localhost:5555/api/sharks', { name: 'great white' })
      .respond(200, { name: 'some shark' });
      expect(sharksctrl.sharks.length).toBe(0);
      sharksctrl.newShark = { name: 'great white' };
      sharksctrl.createShark();
      $httpBackend.flush();
      expect(sharksctrl.sharks[0].name).toBe('some shark');
      expect(sharksctrl.newShark).toBe(null);
    });

    it('should update a shark', function() {
      $httpBackend.expectPUT('http://localhost:5555/api/sharks/1',
      { name: 'change sharks!', editing: true, _id: 1 }).respond(200);

      sharksctrl.sharks = [{ name: 'test shark', editing: true, _id: 1 }];
      sharksctrl.sharks[0].name = 'change sharks!';
      sharksctrl.updateShark(sharksctrl.sharks[0]);
      $httpBackend.flush();
      expect(sharksctrl.sharks[0].editing).toBe(false);
    });

    it('should delete a shark', function() {
      $httpBackend.expectDELETE('http://localhost:5555/api/sharks/1').respond(200);
      sharksctrl.sharks = [{ name: 'great white', _id: 1 }];
      sharksctrl.removeShark(sharksctrl.sharks[0]);
      $httpBackend.flush();
      expect(sharksctrl.sharks.length).toBe(0);
    });
  });
});

const angular = require('angular');

describe('spResource service', function() {
  var spResource;
  var sharksctrl;

  beforeEach(angular.mock.module('angApp'));

  beforeEach(angular.mock.inject(function(_$httpBackend_){
    $httpBackend = _$httpBackend_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should return a function', angular.mock.inject(function(spResource) {
    expect(typeof spResource).toBe('function');
  }));

  it('should get all the resources', angular.mock.inject(function(spResource, $httpBackend) {
    $httpBackend.expectGET('http://localhost:5555/api/sharks').respond(200, [{ name: 'greate white' }]);

    var resourceArray = [{}, {}, {}];
    var errorsArray = [];
    var resource = new spResource(resourceArray, errorsArray, 'http://localhost:5555/api/sharks');

    resource.getAll();
    $httpBackend.flush();
    expect(resourceArray.length).toBe(1);
    expect(resourceArray[0].name).toBe('greate white');
  }));

  it('should add to the test array', angular.mock.inject(function(spResource, $httpBackend) {
    $httpBackend.expectPOST('localhost:5555/api/sharks', { name: 'test shark' }).respond(200, { name: 'another test', _id: 0 });
    var baseUrl = 'localhost:5555/api/sharks';
    var testArray = [];
    var errorTest = [];
    var testRemote = new spResource(testArray, errorTest, baseUrl);

    testRemote.create({ name: 'test shark' });
    $httpBackend.flush();
    var baseUrl = 'localhost:5555';
    expect(testArray.length).toBe(1);
    expect(errorTest.length).toBe(0);
    expect(testArray[0].name).toBe('another test');
  }));

  it('should have update functionality', angular.mock.inject(function(spResource, $q) {
    var testShark = { name: 'not test', _id: 1 };
    var testArray = [testShark];
    var errorsArray = [];
    var resource = new spResource(testArray, errorsArray, 'http://localhost:5555/api/sharks');

    $httpBackend.expectPUT('http://localhost:5555/api/sharks/1', testShark).respond(200);
    var result = resource.update(testShark);
    $httpBackend.flush();

    expect(errorsArray.length).toBe(0);
    expect(result instanceof $q).toBe(true);
  }));

  it('should remove a resouce', angular.mock.inject(function(spResource, $httpBackend) {
    $httpBackend.expectDELETE('http://localhost:5555/api/sharks/1').respond(200);
    var testShark = [{ name: 'testy', _id: 1 }];
    var baseUrl = 'http://localhost:5555/api/sharks';
    var errorsArray = [];
    var resource = new spResource(testShark, errorsArray, baseUrl);
    resource.remove(testShark[0]);
    $httpBackend.flush();
    expect(testShark.length).toBe(0);
  }));
});

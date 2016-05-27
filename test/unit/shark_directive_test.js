const angular = require('angular');
const sharkTemplate = require('../app/templates/sharks/directives/shark_form.html');

describe('shark directive', function() {
  beforeEach(angular.mock.modulef('angApp'));

  var $httpBackend;
  var $compile;
  var $scope;
  var $rootScope;

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = _$rootScope.$new();
  }));

  it('should create a shark directive with a controller binding', function() {
    $httpBackend.expectGET('templates/sharks/directives/shark_form.html')
        
  });
});

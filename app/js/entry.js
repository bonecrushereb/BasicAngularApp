const angular = require('angular');
const angApp = angular.module('angApp', [require('angular-route')]);

require('./services')(angApp);
require('./auth')(angApp);
require('./sharks')(angApp);
require('./preys')(angApp);

angApp.config(['$routeProvider', function($rp) {
  $rp
    .when('/sharks', {
      templateUrl: 'templates/sharks/views/sharks_view.html',
      controller: 'SharksController',
      controllerAs: 'sharksctrl'
    })
    .when('/preys', {
      templateUrl: 'templates/preys/views/preys_view.html',
      controller: 'PreysController',
      controllerAs: 'preysctrl'
    })
    .when('/results', {
      templateUrl: 'templates/results/views/results_view.html',
      controller: 'SharksController',
      controllerAs: 'sharksctrl'
    })
    .when('/signup', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignUpController',
      controllerAs: 'authctrl'
    })
    .when('/signin', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignInController',
      controllerAs: 'authctrl'
    })
    .otherwise({
      redirectTo: '/signup'
    })
}]);

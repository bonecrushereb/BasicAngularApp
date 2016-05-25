const angular = require('angular');
const angApp = angular.module('angApp', []);

require('./services')(angApp);
require('./sharks')(angApp);
require('./preys')(angApp);

const angular = require('angular');
require(__dirname + '/../css/style.css');
const angApp = angular.module('angApp', []);

require('./sharks')(angApp);
require('./preys')(angApp);

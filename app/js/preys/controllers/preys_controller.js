const angular = require('angular');
var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {

  app.controller('PreysController', ['$http', function($http) {
    this.preys = [];

    this.getAll = function() {
      $http.get(baseUrl + '/api/preys')
        .then((res) => {
          this.preys = res.data;
        }, handleError.bind(this));
    };

    this.createPrey = () => {
      $http.post(baseUrl + '/api/preys', this.newPrey)
        .then((res) => {
          this.preys.push(res.data);
          this.newPrey = null;
        }, handleError.bind(this));
    };

    this.editPrey = (prey) => {
      prey.editing = true;
      this.original = angular.copy(prey);
    };

    this.cancelPrey = (prey) => {
      prey.editing = false;
      for (var key in this.original) {
        if(this.original.hasOwnProperty(key)) {
           prey[key] = this.original[key];
         }
       }
    };

    this.updatePrey = (prey) => {
      $http.put(baseUrl + '/api/preys/' + prey._id, prey)
        .then(() => {
          prey.editing = false;
        }, handleError.bind(this));
    };

    this.removePrey = (prey) => {
      $http.delete(baseUrl + '/api/preys/' + prey._id)
        .then(() => {
          this.preys.splice(this.preys.indexOf(prey), 1);
        }, handleError.bind(this));
    };
  }]);
};

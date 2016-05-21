var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;

module.exports = function(app) {

  app.controller('PreysController', ['$http', function($http) {
    this.preys = [];
    this.getAll = function() {
      $http.get(baseUrl + '/api/preys', this.newPrey)
        .then((res) => {
          this.preys = res.data;
        }, handleError.bind(this));
    };

    this.createPrey = function() {
      $http.post(baseUrl + '/api/preys', this.newPrey)
        .then((res) => {
          this.preys.push(res.data);
          this.newPrey = null;
        }, handleError.bind(this));
    };

    this.editPrey = function(prey) {
      prey.editing = true;
      this.original = copy(prey);
      console.log('prey', this.original)
    };

    this.cancelPrey = function(prey) {
      prey.editing = false;
      for (var key in this.original) {
           prey[key] = this.original[key];
         }
    };

    this.updatePrey = function(prey) {
      $http.put(baseUrl + '/api/preys/' + prey._id, prey)
        .then(() => {
          prey.editing = false;
        }, handleError.bind(this));
    };

    this.removePrey = function(prey) {
      $http.delete(baseUrl + '/api/preys/' + prey._id)
        .then(() => {
          this.preys.splice(this.preys.indexOf(prey), 1);
        }, handleError.bind(this));
    };
  }]);
};

const angular = require('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {

  app.controller('PreysController', ['$http', 'spHandleError', function($http, spHandleError) {
    this.preys = [];
    this.errors = [];
    this.getAll = function() {
      $http.get(baseUrl + '/api/preys')
        .then((res) => {
          this.preys = res.data;
        }, spHandleError(this.errors, 'could not retrive preys'));
    }.bind(this);

    this.createPrey = function() {
      var preyName = this.newPrey.name;
      $http.post(baseUrl + '/api/preys', this.newPrey)
        .then((res) => {
          this.preys.push(res.data);
          this.newPrey = null;
        }, spHandleError(this.errors, 'could not create prey' + prey.name));
    }.bind(this);

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

    this.updatePrey = function(prey) {
      $http.put(baseUrl + '/api/preys/' + prey._id, prey)
        .then(() => {
          prey.editing = false;
        }, spHandleError(this.errors, 'could not update prey' + prey.name));
    }.bind(this);

    this.removePrey = function(prey) {
      $http.delete(baseUrl + '/api/preys/' + prey._id)
        .then(() => {
          this.preys.splice(this.preys.indexOf(prey), 1);
        }, spHandleError(this.errors, 'could not delete prey' + prey.name));
    }.bind(this);
  }]);
};

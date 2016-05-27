const angular = require('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {

  app.controller('PreysController', ['spResource', function(Resource) {
    this.preys = [];
    this.errors = [];
    this.remote = new Resource(this.preys, this.errors, baseUrl + '/api/preys');
    this.getAll = this.remote.getAll.bind(this.remote);

    this.createPrey = function() {
      this.remote.create(this.newPrey)
        .then(() => {
          this.newPrey = null;
        });
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
      this.remote.update(prey)
        .then(() => {
          prey.editing = false;
        });
    };

    this.removePrey = this.remote.remove.bind(this.remote);
  }]);
};

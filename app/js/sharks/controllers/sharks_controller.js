const angular = require('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {

  app.controller('SharksController', ['spResource', function(Resource) {
    this.sharks = [];
    this.errors = [];
    this.remote = new Resource(this.sharks, this.errors, baseUrl + '/api/sharks');
    this.getAll = this.remote.getAll.bind(this.remote);

    this.createShark = function() {
      this.remote.create(this.newShark)
        .then(() => {
          this.newShark = null;
        });
    }.bind(this);

    this.editShark = (shark) => {
      shark.editing = true;
      this.original = angular.copy(shark);
    };

    this.cancelShark = (shark) => {
      shark.editing = false;
      for (var key in this.original) {
        if(this.original.hasOwnProperty(key)) {
           shark[key] = this.original[key];
         }
      }
    };

    this.updateShark = function(shark) {
      this.remote.update(shark)
        .then(() => {
          shark.editing = false;
        });
    };

    this.removeShark = this.remote.remove.bind(this.remote);
  }]);
};

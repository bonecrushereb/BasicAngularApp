const angular = require('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SharksController', ['spResource','spStore', function(Resource, spStore) {
    this.spStore = spStore;
    this.sharks = spStore.sharks;
    this.addSharks = spStore.addShark.bind(spStore);
    this.errors = [];
    this.remote = new Resource(this.sharks, this.errors, baseUrl + '/api/sharks');
    this.total = spStore.total();

    this.getAll = this.remote.getAll.bind(this.remote);

    this.createShark = function() {
      this.remote.create(this.newShark)
        .then(() => {
          this.newShark = null;
        });
    }.bind(this);

    this.editShark = function(shark) {
      shark.editing = true;
      this.original = angular.copy(shark);
    }.bind(this);

    this.cancelShark = function(shark) {
      shark.editing = false;
      for (var key in this.original) {
        if(this.original.hasOwnProperty(key)) {
           shark[key] = this.original[key];
         }
      }
    }.bind(this);

    this.updateShark = function(shark) {
      this.remote.update(shark)
        .then(() => {
          shark.editing = false;
        });
    };

    this.removeShark = this.remote.remove.bind(this.remote);
  }]);
};

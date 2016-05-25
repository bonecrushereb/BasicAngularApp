const angular = require('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {

  app.controller('SharksController', ['$http','spHandleError', function($http, spHandleError) {
    this.sharks = [];
    this.errors = [];
    this.getAll = function() {
      $http.get(baseUrl + '/api/sharks')
        .then((res) => {
          this.sharks = res.data;
        }, spHandleError(this.errors, 'could not retreive sharks'));
    }.bind(this);

    this.createShark = function() {
      var sharkName = this.newShark.name;
      $http.post(baseUrl + '/api/sharks', this.newShark)
        .then((res) => {
          this.sharks.push(res.data);
          this.newShark = null;
        }, spHandleError(this.errors, 'could not create shark' + this.newShark.name));
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
      $http.put(baseUrl + '/api/sharks/' + shark._id, shark)
        .then(() => {
          shark.editing = false;
        }, spHandleError(this.errors, 'could not update shark' + shark.name));
    }.bind(this);

    this.removeShark = function(shark) {
      $http.delete(baseUrl + '/api/sharks/' + shark._id)
        .then(() => {
          this.sharks.splice(this.sharks.indexOf(shark), 1);
        }, spHandleError(this.errors, 'chould not delete this shark' + shark.name));
    }.bind(this);
  }]);
};

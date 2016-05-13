const angular = require('angular');
require(__dirname + '/../css/style.css');
const angApp = angular.module('angApp', []);
const baseUrl = 'http://localhost:5555';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

angApp.controller('SharksController', ['$http', function($http) {
  this.sharks = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/sharks', this.newShark)
      .then((res) => {
        this.sharks = res.data;
      }, handleError.bind(this));
  };

  this.createShark = () => {
    $http.post(baseUrl + '/api/sharks', this.newShark)
      .then((res) => {
        this.sharks.push(res.data);
        this.newShark = null;
      }, handleError.bind(this));
  };

  this.updateShark = (shark) => {
    $http.put(baseUrl + '/api/sharks' + shark._id, shark)
      .then(() => {
        shark.editing = false;
      }, handleError.bind(this));
  };

  this.removeShark = (shark) => {
    $http.delete(baseUrl + '/api/sharks/' + shark._id)
      .then(() => {
        this.sharks.splice(this.sharks.indexOf(shark), 1);
      }, handleError.bind(this));
  };
}]);

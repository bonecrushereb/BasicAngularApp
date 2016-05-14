const angular = require('angular');
require(__dirname + '/../css/style.css');
const angApp = angular.module('angApp', []);
const baseUrl = 'http://localhost:5555';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

var deeplyclone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

angApp.controller('SharksController', ['$http', function($http) {
  this.sharks = [];
  this.original = {};
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

  this.editShark = (shark) => {
    shark.editing = true;
    this.original = deeplyclone(shark);
  };

  this.cancelShark = (shark) => {
    shark.editing = false;
    shark.name = this.original.name;
    shark.speed = this.original.speed;
    shark.preyPreference = this.original.preyPreference;
  };

  this.updateShark = (shark) => {
    $http.put(baseUrl + '/api/sharks/' + shark._id, shark)
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

angApp.controller('PreysController', ['$http', function($http) {
  this.preys = [];
  this.original = {};
  this.getAll = () => {
    $http.get(baseUrl + '/api/preys', this.newPrey)
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
    this.original = deeplyclone(prey);
  };

  this.cancelPrey = (prey) => {
    prey.editing = false;
    prey.name = this.original.name;
    prey.speed = this.original.speed;
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

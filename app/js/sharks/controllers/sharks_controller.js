var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;
var deeplyClone = require('../../lib').deeplyClone;

module.exports = function(app) {

  app.controller('SharksController', ['$http', function($http) {
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
};

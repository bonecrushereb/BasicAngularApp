var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;

module.exports = function(app) {
  app.controller('SharksController', ['$http', function($http) {
    this.sharks = [];
    this.getAll = function() {
      $http.get(baseUrl + '/api/sharks')
        .then((res) => {
          this.sharks = res.data;
          console.log(this.sharks);
        }, handleError.bind(this));
    };

    this.createShark = () => {
      console.log('hello from create shark');
      $http.post(baseUrl + '/api/sharks', this.newShark)
        .then((res) => {
          this.sharks.push(res.data);
          this.newShark = null;
        }, handleError.bind(this));
    };

    this.editShark = (shark) => {
      shark.editing = true;
      this.original = copy(shark);
      console.log('shark', this.original);
    };

    this.cancelShark = (shark) => {
      shark.editing = false;
      for (var key in this.original) {
           shark[key] = this.original[key];
         }
    };

    this.updateShark = (shark) =>{
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

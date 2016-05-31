module.exports = function(app) {
  app.factory('spStore', function() {
    return {
      sharks: [],
      preys: [],
      addShark: function(shark) {
        this.sharks.push(shark);
      },
      addPrey: function(prey) {
        this.preys.push(prey);
      }
    };
  });
};

// angApp.controller('PreysController', ['spStore', function(spStore) {
//   this.spStore = spStore;
//   this.addPreys = spStore.addPreys.bind(spStore);
//   this.preys = spStore.preys.length;
// }]);

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
      },
      total: function() {
        return this.sharks.length + this.preys.length;
      }
    };
  });
};

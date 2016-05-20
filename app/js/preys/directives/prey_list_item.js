module.exports = function(app) {
  app.directive('preyListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: 'templates/preys/directives/prey_list_item.html',
      scope: {
        prey: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removePrey;
      }
    };
  });
};

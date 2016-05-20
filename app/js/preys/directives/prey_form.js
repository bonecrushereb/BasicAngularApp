module.exports = function(app) {
  app.directive('preyForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/preys/directives/prey_form.html',
      scope: {
        prey: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updatePrey,
          create: controller.createPrey
        };
        scope.save = actions[scope.action];
      }
    };
  });
};

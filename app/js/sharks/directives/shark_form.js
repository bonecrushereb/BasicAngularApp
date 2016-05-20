module.exports = function(app) {
  app.directive('sharkForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/sharks/directives/shark_form.html',
      scope: {
        shark: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateShark,
          create: controller.createShark
        };
        scope.save = actions[scope.action];
      }
    };
  });
};

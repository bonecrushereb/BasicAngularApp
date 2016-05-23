module.exports = function(app) {
  app.directive('sharkListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: 'templates/sharks/directives/shark_list_item.html',
      scope: {
        shark: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeShark;
        scope.edit = controller.editShark;
      }
    };
  });
};

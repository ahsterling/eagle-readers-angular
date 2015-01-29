var badgesControllerModule = angular.module('badgesControllerModule', []);

badgesControllerModule.controller('badgesController', ['$scope', function($scope) {
  $scope.badges = [
    {title: "Genre Explorer",
    description: "Read three books from the same genre"},
    {title: "Poetry Slam",
    description: "Read a poetry book"},
    {title: "Eagles Read",
    description: "Read a book from the Eagles Read list"}
  ]
}]);

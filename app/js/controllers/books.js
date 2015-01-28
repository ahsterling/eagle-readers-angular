var booksControllerModule = angular.module('booksControllerModule', []);

booksControllerModule.controller('booksController', ['$scope', '$http', function($scope, $http) {
  $scope.hello = "hi";
}]);

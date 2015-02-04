var usersControllerModule = angular.module('usersControllerModule', []);

usersControllerModule.controller('userController', ['$scope', '$http', function($scope, $http) {
  $scope.user = {id: 6, email: 'a@a.com'}

  $http.get("http://localhost:3000/users/" + $scope.user.id + "/books")
    .success(function(data) {
      $scope.books = data;
    });

  $http.get("http://localhost:3000/users/" + $scope.user.id + "/badges")
    .success(function(data) {
      $scope.badges = data;
    });

}]);

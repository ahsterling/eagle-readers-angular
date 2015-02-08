var usersControllerModule = angular.module('usersControllerModule', []);

usersControllerModule.controller('userController', ['$scope', '$http', function($scope, $http) {
  $scope.user = {id: 1, email: 'a@a.com'}

  $http.get("http://localhost:3000/users/" + $scope.user.id + "/books")
    .success(function(data) {
      $scope.books = data;
    });

  $http.get("http://localhost:3000/users/" + $scope.user.id + "/badges")
    .success(function(data) {
      $scope.badges = data;
    });


  $scope.bookSearch = function() {
    var url = "http://localhost:3000/books/search?";

    var titleParams, authorParams;

    if ($scope.query.title) {
      titleParams = $scope.query.title;
      url = url + "title=" + titleParams;
    }

    if ($scope.query.author) {
      authorParams = $scope.query.author;
      url = url + "&author=" + authorParams;
    }

    console.log(url);
    $http.get(url).success(function(data) {
      console.log(data)
      // $scope.books = data;
      // $scope.results = true;
    });
  }

}]);

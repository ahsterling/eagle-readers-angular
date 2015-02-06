var usersControllerModule = angular.module('usersControllerModule', []);

usersControllerModule.controller('userController', ['$scope', '$rootScope', '$http', '$auth', function($scope, $rootScope, $http, $auth) {
  console.log($rootScope.user);
  $scope.user = $rootScope.user;
  // $rootScope.on('auth:validation-success', function(ev, user) {
  //   console.log('hey');
  // });

  // $rootScope.on('auth:validation-success', function(ev, user) {
  //   $scope.auth = user;
  // })

  // $scope.user = {id: 1, email: 'email@email.com'}
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

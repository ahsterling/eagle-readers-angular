var usersControllerModule = angular.module('usersControllerModule', []);

usersControllerModule.controller('userController', ['$scope', '$rootScope', '$http', '$auth', function($scope, $rootScope, $http, $auth) {
  // $scope.user = $rootScope.user;
  $auth.validateUser().then(function(resp) {

  })
  // $rootScope.on("auth:vl")
  $rootScope.$on('auth:validation-success', function(ev, user) {
    console.log('auth validation');
  });

  $rootScope.$on('auth:validation-error', function(ev) {
    console.log('errrrooorr');
  })

  $rootScope.$on('auth:invalid', function(ev) {
    console.log('auth:invalid')
  })


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

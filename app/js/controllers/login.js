var loginControllerModule = angular.module('loginControllerModule', []);

loginControllerModule.controller('loginController', ['$scope', '$http', '$auth', "$location", function($scope, $http, $auth, $location) {
  $scope.loginForm = {email: null, password: null};

  // $scope.login = function() {
  //   $auth.submitLogin($scope.loginForm)
  //     .then(function(resp) {
  //       console.log("blargh");
  //     })
  // };

  $scope.handleLoginBtnClick = function() {
    $auth.authenticate('email')
    $auth.submitLogin($scope.loginForm)
      .then(function(resp) {

        // handle success response
      })
      .catch(function(resp) {
        // handle error response
      });
  };

  $scope.$on('auth:login-success', function(ev, user) {
    console.log("Hey!");
    $location.path("/dashboard")
  })
  $scope.handleRegBtnClick = function() {
      $auth.submitRegistration($scope.registrationForm)
        .then(function(resp) {
          console.log("hey! new user!")
          // handle success response
        })
        .catch(function(resp) {
          console.log("broken :(")
          // handle error response
        });
    };

}]);

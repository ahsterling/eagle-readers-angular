var loginControllerModule = angular.module('loginControllerModule', []);

loginControllerModule.controller('loginController', ['$scope', '$rootScope', '$http', '$auth', "$location", function($scope, $rootScope, $http, $auth, $location) {
  $scope.loginForm = {email: null, password: null};

  // $scope.login = function() {
  //   $auth.submitLogin($scope.loginForm)
  //     .then(function(resp) {
  //       console.log("blargh");
  //     })
  // };

  $scope.handleLoginBtnClick = function() {
    $auth.submitLogin($scope.loginForm)
      .then(function(resp) {

        // handle success response
      })
      .catch(function(resp) {
        // handle error response
      });
  };

  $rootScope.$on('auth:login-success', function(ev, user) {
    $rootScope.user = user;
    localStorage.setItem('user_id', user.id)
    console.log(user);
    console.log(ev);
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

  $rootScope.$on('auth:registration-email-success', function(ev, user) {
    $rootScope.user = user;
    console.log("registered!");
  })
}]);

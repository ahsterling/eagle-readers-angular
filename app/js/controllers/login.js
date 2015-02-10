var loginControllerModule = angular.module('loginControllerModule', []);

loginControllerModule.controller('loginController', ['$scope', '$state', '$rootScope', '$http', '$auth', "$location", function($scope, $state, $rootScope, $http, $auth, $location) {
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
    console.log('login success')
    $rootScope.user = user;
    $state.go('app.dashboard', {}, {reload: true})
    // $location.path("/dashboard");
  });
  $rootScope.$on('auth:login-failure', function(ev, reason) {
    console.log("failllll");
  });


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

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
  $rootScope.$on('auth:login-error', function(ev, reason) {
    $scope.loginError = reason.errors[0];
  });



  $scope.handleRegBtnClick = function() {
    if ($scope.registrationForm.password === $scope.registrationForm.password_confirmation) {
      $auth.submitRegistration($scope.registrationForm)
      .then(function(resp) {
          // handle success response
      })
      .catch(function(resp) {
      });
    } else {
      $scope.regError = "passwords do not match"
    };

  }

  $rootScope.$on('auth:registration-email-success', function(ev, user) {
    $rootScope.user = user;
    console.log("registered!");
  });

  $rootScope.$on('auth:registration-email-error', function(ev, reason) {
    console.log(reason);
    if (reason.errors.email[0] = "This email address is already in use") {
      $scope.regError = "This username is already in use"
    }
  });
}]);

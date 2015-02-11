
var indexControllerModule = angular.module('indexControllerModule', []);

indexControllerModule.controller('indexController', [
  '$scope',
  '$rootScope',
  '$http',
  '$auth',
  '$state',

  function($scope, $rootScope, $http, $auth, $state) {



    $scope.handleSignOutBtnClick = function() {
      $auth.signOut().then(function() {

      })
      .catch(function(resp) {

      })
    };

    $rootScope.$on('auth:logout-success', function() {
      console.log('sign out');
      $state.go('app', {}, {reload: true});
    });

    // $scope.user_id = localStorage.getItem('user_id')
    // $scope.user_id = 1
    // $http.get('http://localhost:3000/users/'+ $scope.user_id)
    //   .success(function(data) {
    //     $scope.user = data;
    //   })


  $rootScope.$on('auth:validation-succcess', function(ev, user) {
    $scope.loggedIn = true;
    console.log("logged in" + $scope.loggedIn);
  });

  $auth.validateUser().then(function(resp) {
    console.log("auth validate user");


    $scope.loggedIn = true;
    console.log($scope.loggedIn);
    console.log(resp);


  })
  .catch(function(resp) {
    $scope.loggedIn = false;
    console.log($scope.loggedIn);
  });


  // $rootScope.$on('auth:validation-error', function(ev, reason) {
  //   $scope.loggedIn = false;
  // })

  // $scope.handleSignOutBtnClick = function() {
  //   $auth.signOut()
  //     .then(function(resp) {
  //       // handle success response
  //     })
  //     .catch(function(resp) {
  //       // handle error response
  //
  //   });
  //
  // };
  //
  // $rootScope.$on('auth:logout-success', function(ev) {
  //   console.log("goodbye");
  // });
  //
  // $rootScope.$on('auth:logout-error', function(ev, reason) {
  //   console.log("error");
  // });
}]);


var indexControllerModule = angular.module('indexControllerModule', []);

indexControllerModule.controller('indexController', ['$scope', '$rootScope', '$http', '$auth', function($scope, $auth, $rootScope, $http) {
  // $scope.user_id = localStorage.getItem('user_id')
  // $scope.user_id = 1
  // $http.get('http://localhost:3000/users/'+ $scope.user_id)
  //   .success(function(data) {
  //     $scope.user = data;
  //   })

  // $auth.$validateUser().then(function(resp) {
  //
  // });

  // $rootScope.$on('auth:validation-succcess', function(ev, user) {
  //   $scope.loggedIn = true;
  // });
  //
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

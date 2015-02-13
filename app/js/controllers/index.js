
var indexControllerModule = angular.module('indexControllerModule', []);

indexControllerModule.controller('indexController', [
  '$scope',
  '$rootScope',
  '$http',
  '$auth',
  '$state',

  function($scope, $rootScope, $http, $auth, $state) {

    $scope.isCollapsed = true;

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

    $rootScope.$on('auth:validation-succcess', function(ev, user) {
      $scope.loggedIn = true;
    });

    $auth.validateUser().then(function(resp) {
      $scope.loggedIn = true;
    })
    .catch(function(resp) {
      $scope.loggedIn = false;
    });

}]);

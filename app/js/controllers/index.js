var indexControllerModule = angular.module('indexControllerModule', []);

indexControllerModule.controller('indexController', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.user = $rootScope.user;

  $scope.handleSignOutBtnClick = function() {
    $auth.signOut()
      .then(function(resp) {
        // handle success response
      })
      .catch(function(resp) {
        // handle error response

    });

  };

  $rootScope.on('auth:logout-success', function(ev) {
    alert("goodbye");
  });

  $rootScope.on('auth:logout-error', function(ev, reason) {
    alert(reason);
  });
}]);

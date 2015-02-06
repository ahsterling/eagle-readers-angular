var indexControllerModule = angular.module('indexControllerModule', []);

indexControllerModule.controller('indexController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
  $scope.user_id = localStorage.getItem('user_id')
  $http.get('http://localhost:3000/users/'+ $scope.user_id)
    .success(function(data) {
      $scope.user = data;
    })

  $scope.handleSignOutBtnClick = function() {
    $auth.signOut()
      .then(function(resp) {
        // handle success response
      })
      .catch(function(resp) {
        // handle error response

    });

  };

  $rootScope.$on('auth:logout-success', function(ev) {
    console.log("goodbye");
  });

  $rootScope.$on('auth:logout-error', function(ev, reason) {
    console.log("error");
  });
}]);

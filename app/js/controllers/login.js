var loginControllerModule = angular.module('loginControllerModule', []);

loginControllerModule.controller('loginController', ['$scope', '$http', function($scope, $http) {
  $scope.login_user = {email: null, password: null};
  $scope.login_error = {message: null, errors: {}};

  $scope.login = function() {
    $http.post('http://localhost:3000/api/users/sign_in.json', {user: {email:$scope.login_user.email, password: $scope.login_user.password}})
      .success(function() {
        console.log("success");
      });
  };

  $scope.logout = function() {
    $http.delete('http://localhost:3000/api/users/sign_out')
      .success(function() {
        console.log("sign out success");
      });
  };
}]);

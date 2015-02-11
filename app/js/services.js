var servicesModule = angular.module('servicesModule', []);

servicesModule.factory('currentUser', ['$auth', '$rootScope', function($auth, $rootScope) {

  var currentUser = {loggedIn: false};

  $auth.validateUser().then(function(resp) {
    console.log("auth validate user");
  });

  $rootScope.$on('auth:validation-succcess', function(ev, user) {
    currentUser.loggedIn = true;
    console.log('auth-validation-success');
  });


  return currentUser;

}]);

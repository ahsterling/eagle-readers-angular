var usersControllerModule = angular.module('usersControllerModule', []);

usersControllerModule.controller('userController', ['$state', '$scope', '$rootScope', '$http', '$auth', '$location', function($state, $scope, $rootScope, $http, $auth, $location) {

  $http.get('http://localhost:3000/users/' + $rootScope.user.id)
    .success(function(data) {
      $scope.user = data;
      getUserBooks();
      getUserBadges();
  });


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
    $location.path('/');
  });

  $rootScope.$on('auth:logout-error', function(ev, reason) {
    $scope.logoutError = "Sorry, something went wrong.  Please try again."
  });

  // $rootScope.$on('auth:login-success', function(ev, user) {
  //   $http.get('http://localhost:3000/users/' + $rootScope.user.id)
  //     .success(function(data) {
  //       $scope.user = data;
  //       getUserBooks();
  //       getUserBadges();
  //   });
  //
  // })

  // $scope.user = $rootScope.user;

  // $rootScope.$on('auth:validation-success', function(ev, user) {
  //   console.log('auth validation');
  //   console.log('getting books . . . ')
  //   $http.get('http://localhost:3000/users/' + $rootScope.user.id)
  //     .success(function(data) {
  //       $scope.user = data;
  //       getUserBooks();
  //       getUserBadges();
  //   });
  // });

  $rootScope.$on('auth:validation-error', function(ev) {
    console.log('errrrooorr');
  })

  $rootScope.$on('auth:invalid', function(ev) {
    console.log('auth:invalid')
  })


  // $scope.user = {id: 1, email: 'email@email.com'}
  var getUserBooks = function() {
    $http.get("http://localhost:3000/users/" + $scope.user.id + "/books")
      .success(function(data) {
        $scope.books = data;
      });
  }

  var getUserBadges = function() {
    $http.get("http://localhost:3000/users/" + $scope.user.id + "/badges")
      .success(function(data) {
        $scope.badges = data;
    });
  }

  $scope.bookSearch = function() {
    var url = "http://54.213.100.80/books/search?";

    var titleParams, authorParams;

    if ($scope.query.title) {
      titleParams = $scope.query.title;
      url = url + "title=" + titleParams;
    }

    if ($scope.query.author) {
      authorParams = $scope.query.author;
      url = url + "&author=" + authorParams;
    }

    console.log(url);
    $http.get(url).success(function(data) {
      console.log(data)
      // $scope.books = data;
      // $scope.results = true;
    });
  }

  $scope.passwordChange = false;

  $scope.handleUpdatePasswordBtnClick = function() {
      $auth.updatePassword($scope.updatePasswordForm)
        .then(function(resp) {
          // handle success response
        })
        .catch(function(resp) {
          // handle error response
        });
    };

  $rootScope.$on('auth:password-change-success', function(ev) {
    console.log("password successfully changed");
    $scope.passwordChange = false;
  });

  $rootScope.$on('auth:password-change-error', function(ev) {
    console.log('error updating password');
  });

}]);

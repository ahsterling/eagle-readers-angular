var usersControllerModule = angular.module('usersControllerModule', []);

usersControllerModule.controller('userController', [
  '$state',
  '$scope',
  '$rootScope',
  '$http',
  '$auth',
  '$location',
  'currentUser',

  function($state, $scope, $rootScope, $http, $auth, $location, currentUser) {
    $scope.query = {};
    $scope.filterBooks = false;
    $scope.userGenres = [];
    $scope.loadingBooks = true;
    $scope.loadingBadges = true;

    $http.get('http://54.213.100.80/users/' + $rootScope.user.id)
      .success(function(data) {
        $scope.user = data;
        getUserBooks();
        getUserBadges();
    });

    $http.get('http://54.213.100.80/users/' + $rootScope.user.id + '/books/genres')
      .success(function(data) {
        $scope.userGenres = data;
      });

    $rootScope.$on('auth:validation-error', function(ev) {
      console.log('errrrooorr');
    })

    $rootScope.$on('auth:invalid', function(ev) {
      console.log('auth:invalid')
    })

    var getUserBooks = function() {
      $http.get("http://54.213.100.80/users/" + $scope.user.id + "/books")
        .success(function(data) {
          $scope.books = data;
          $scope.loadingBooks = false;
          if ( $scope.books.length === 0 ) {
            $scope.noBooks = true;
          }
        });
    }

    var getUserBadges = function() {
      $http.get("http://54.213.100.80/users/" + $scope.user.id + "/badges")
        .success(function(data) {
          $scope.badges = data;
          $scope.loadingBadges = false;
          if ( $scope.badges.length === 0 ) {
            $scope.noBadges = true;
          }
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

    $scope.changePasswordForm = {};

    $scope.handleUpdatePasswordBtnClick = function() {
      if ($scope.changePasswordForm.password === $scope.changePasswordForm.password_confirmation) {
        $auth.updatePassword($scope.changePasswordForm)
          .then(function(resp) {
            // handle success response
          })
          .catch(function(resp) {
            // handle error response
          });
      } else {
        $scope.passChangeError = "Sorry, passwords did not match";
      }

      };

    $rootScope.$on('auth:password-change-success', function(ev) {
      console.log("password successfully changed");
      $scope.passwordChange = false;
    });

    $rootScope.$on('auth:password-change-error', function(ev, reason) {
      $scope.passChangeError =
      console.log('error updating password');
    });

}]);

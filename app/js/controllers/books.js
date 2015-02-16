var booksControllerModule = angular.module('booksControllerModule', []);

booksControllerModule.controller('booksController', ['$scope', '$http', '$location', '$rootScope', "$auth", function($scope, $http, $location, $rootScope, $auth) {

  $scope.books = [];
  $scope.genres = [];

  $http.get('http://54.213.100.80/users/' + $scope.user.id)
    .success(function(data) {
      $scope.user = data;
  });

  $http.get("http://54.213.100.80/genres").success(function(data) {
    console.log("genres!");
    $scope.genres = data;
  });

  $scope.results = false;

  $scope.bookSearch = function() {

    var url = "http://54.213.100.80/books/search?";

    var titleParams, authorParams, genreParams;

    if ($scope.search.title) {
      titleParams = $scope.search.title;
      url = url + "title=" + titleParams;
    }

    if ($scope.search.author) {
      authorParams = $scope.search.author;
      url = url + "&author=" + authorParams;
    }

    if ($scope.search.genre) {
      genreParams = $scope.search.genre;
      url = url + "&genre=" + genreParams;
    }

    $http.get(url).success(function(data) {
      console.log("books!");
      $scope.books = data;
      if ($scope.books.length === 0) {
        $scope.noResults = true;
      }
      $scope.results = true;
    });
    $scope.book = {};
    $scope.search = {};
    $location.path('/books');
  };

  $scope.resetSearch = function() {
    $scope.results = false;
    $scope.books = [];
    $scope.search = undefined;
    $location.path('/books');
  }

}]);

booksControllerModule.controller('bookController', [
  '$scope',
  '$http',
  '$stateParams',
  '$rootScope',
  'flashService',
  '$modal',

  function($scope, $http, $stateParams, $rootScope, flashService, $modal) {

    $scope.book = {};

    $http.get("http://54.213.100.80/books/" + $stateParams.id).success(function(data) {
      $scope.book = data;
      getBookSubjects();
    });

    $scope.userBooks = [];

    $scope.user = $rootScope.user;

    $http.get('http://54.213.100.80/users/' + $scope.user.id)
      .success(function(data) {
        $scope.user = data;
        getUserBooks();
      });

    var getUserBooks = function() {
      $http.get('http://54.213.100.80' + $scope.user.id + '/books')
        .success(function(data) {
          $scope.userBooks = data;
          $scope.hasBook = $scope.userHasBook();
        });
    };

    $scope.subjects = [];

    getBookSubjects = function() {
      $http.get('http://54.213.100.80/books/' + $scope.book.id + '/subjects')
        .success(function(data) {
          $scope.subjects = data;
        });
    };

    $scope.userHasBook = function() {
      var userHasBook = false;
      for (var i = 0; i < $scope.userBooks.length; i++) {
        if ( $scope.userBooks[i].id === $scope.book.id ) {
          userHasBook = true;
        }
      };
      return userHasBook;
    };

    $scope.addBook = function() {

      $http.post("http://54.213.100.80/users/"+$scope.user.id+"/books/new", {book_id: $scope.book.id, user_id: $scope.user.id})
        .success(function(data) {
          if (data.badges.length !== 0) {
            flashService.show(data.badges[0]);
            $scope.modalInstance = $modal.open({
              templateUrl: 'app/views/badges/badge_notice.html',
              controller: 'badgeModalController'
            });

            $scope.modalInstance.closeModal = function() {
              $scope.modalInstance.close();
            };

        };
        $scope.hasBook = true;

    });
  };

}]);

booksControllerModule.controller('badgeModalController', [
  '$scope',
  '$rootScope',
  '$modalInstance',

  function($scope, $rootScope, $modalInstance) {

    $scope.closeModal = function() {
      $modalInstance.close();
    };

  }])

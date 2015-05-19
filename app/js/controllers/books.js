var booksControllerModule = angular.module('booksControllerModule', []);

booksControllerModule.controller('booksController', ['$scope', '$http', '$location', '$rootScope', "$auth", function($scope, $http, $location, $rootScope, $auth) {

  $scope.books = [];
  $scope.genres = [];

  $http.get('http://54.213.100.80/users/' + $scope.user.id)
    .success(function(data) {
      $scope.user = data;
  });

  $http.get("http://54.213.100.80/genres", {cache: true}).success(function(data) {
    console.log("genres!");
    $scope.genres = data;
  });

  $scope.results = false;



  $scope.bookSearch = function() {
    $scope.books = [];
    $scope.noResults = false;
    $scope.loadingResults = true;
    $scope.searchTitle = $scope.search.title;
    $scope.searchAuthor = $scope.search.author;
    $scope.searchGenre = $scope.search.genre;
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

    $http.get(url, {cache: true}).success(function(data) {
      console.log("books!");
      $scope.loadingResults = false;
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
    $scope.noResults = false;
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
    $scope.bookLoading = true;
    $scope.buttonLoading = true;

    $http.get("http://localhost:3000/books/" + $stateParams.id, {cache: true}).success(function(data) {
      $scope.book = data;
      getBookSubjects();
      $scope.bookLoading = false;
    });


    $scope.userBooks = [];

    $scope.user = $rootScope.user;

    $http.get('http://localhost:3000/users/' + $scope.user.id)
      .success(function(data) {
        $scope.user = data;
        getUserBooks();
      });

    var getUserBooks = function() {
      $http.get('http://localhost:3000/users/' + $scope.user.id + '/books')
        .success(function(data) {
          $scope.userBooks = data;
          $scope.hasBook = $scope.userHasBook();
          $scope.buttonLoading = false;
        });
    };

    $scope.subjects = [];

    getBookSubjects = function() {
      $http.get('http://localhost:3000/books/' + $scope.book.id + '/subjects', {cache: true})
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

      $http.post("http://localhost:3000/users/" + $scope.user.id + "/books/new", {book_id: $scope.book.id, user_id: $scope.user.id})
        .success(function(data) {
          console.log(data);
          $scope.badges = data.badges;

          if (data.badges.length !== 0) {
            // flashService.show(data.badges[0]);
            $modal.open({
              templateUrl: 'app/views/badges/badge_notice.html',
              controller: 'badgeModalController',
              resolve: {
                badges: function() {
                  return $scope.badges;
                }
              }
            });


            $scope.closeModal = function() {
              $scope.modalInstance.close();
            };

        };
        $scope.hasBook = true;

    });
  };

}]);

booksControllerModule.controller('badgeModalController', [
  '$scope',
  '$modalInstance',
  'badges',

  function($scope, $modalInstance, badges) {

    $scope.badges = badges;

    $scope.closeModal = function() {
      $modalInstance.close();
    };

  }])

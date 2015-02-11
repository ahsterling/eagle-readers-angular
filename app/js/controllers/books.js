var booksControllerModule = angular.module('booksControllerModule', []);

booksControllerModule.controller('booksController', ['$scope', '$http', '$location', '$rootScope', "$auth", function($scope, $http, $location, $rootScope, $auth) {

  $scope.books = [];
  $scope.genres = [];

  $http.get('http://localhost:3000/users/' + $scope.user.id)
    .success(function(data) {
      $scope.user = data;
  });

  $http.get("http://localhost:3000/genres").success(function(data) {
    $scope.genres = data;
  });

  $scope.results = false;

  $scope.bookSearch = function() {
    var url = "http://localhost:3000/books/search?";

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
      $scope.books = data;
      if ($scope.books.length === 0) {
        $scope.noResults = true;
      }
      $scope.results = true;
    });

  };

  $scope.resetSearch = function() {
    $scope.results = false;
    $scope.books = [];
    $scope.search = undefined;
    // $location.path('/books');
  }

}]);

booksControllerModule.controller('bookController', ['$scope', '$http', '$stateParams', '$rootScope', function($scope, $http, $stateParams, $rootScope) {

  $scope.book = {};

  $http.get("http://localhost:3000/books/" + $stateParams.id).success(function(data) {
    $scope.book = data;
    getBookSubjects();
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
      });
  };

  $scope.subjects = [];

  getBookSubjects = function() {
    $http.get('http://localhost:3000/books/' + $scope.book.id + '/subjects')
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
    console.log($scope.book.id);
    console.log($scope.user.id);
    $http.post("http://localhost:3000/users/"+$scope.user.id+"/books/new", {book_id: $scope.book.id, user_id: $scope.user.id})
      .success(function(status) {
        console.log("woo");
        $scope.hasBook = true;
      });
  };

}]);

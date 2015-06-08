var adminControllerModule = angular.module('adminControllerModule', []);

adminControllerModule.controller('adminController', [
  '$scope',
  '$http',
  '$location',
  '$auth',

  function($scope, $http, $location, $auth) {
    $scope.books = [];
    $scope.genres = [];

    $scope.results = false;

    $http.get("http://54.213.100.80/genres", {cache: true}).success(function(data) {
      console.log("genres!");
      $scope.genres = data;
    });

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

  }
]);

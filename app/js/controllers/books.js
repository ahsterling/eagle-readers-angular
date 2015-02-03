var booksControllerModule = angular.module('booksControllerModule', []);

booksControllerModule.controller('booksController', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.books = [];
  $scope.subjects = [];

  $http.get("http://localhost:3000/subjects").success(function(data) {
    $scope.subjects = data;
  });
  // $http.get("http://localhost:3000/books", {cache: true}).success(function(data) {
  //   $scope.books = data
  // });
  // $scope.books = [
  //     {'id': 1,
  //       'title': 'The Grapes of Wrath',
  //       'author': 'Steinbeck, John',
  //       'isbn': 0143039431,
  //       'description': 'First published in 1939, Steinbeck’s Pulitzer Prize-winning epic of the Great Depression chronicles the Dust Bowl migration of the 1930s and tells the story of one Oklahoma farm family, the Joadsdriven from their homestead and forced to travel west to the promised land of California. Out of their trials and their repeated collisions against the hard realities of an America divided into Haves and Have-Nots evolves a drama that is intensely human yet majestic in its scale and moral vision, elemental yet plainspoken, tragic but ultimately stirring in its human dignity. A portrait of the conflict between the powerful and the powerless, of one man’s fierce reaction to injustice, and of one woman’s stoical strength, the novel captures the horrors of the Great Depression and probes into the very nature of equality and justice in America. At once a naturalistic epic, captivity narrative, road novel, and transcendental gospel, Steinbeck’s powerful landmark novel is perhaps the most American of American Classics.',
  //       'pages': 464,
  //       'pub_date': "04-06-14",
  //       'subject_array': ['fiction', 'history'] },
  //     {'id': 2,
  //       'title': "Harry Potter and the Sorcerer's Stone",
  //      'author': "Rowling, J.K.",
  //      'isbn': 473847549,
  //      'description': "Harry heads off to magic boarding school.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //      'pages': 244,
  //      'pub_date': "05-04-98",
  //      'subject_array': ['fiction', 'fantasy', 'magic'] },
  //     {'id': 3,
  //       'title': "Freakonomics",
  //      'author': 'Levitt, Steven D., Dubner, Stephen J.',
  //      'isbn': 0060731338,
  //      'description': "Freakonomics is a groundbreaking collaboration between Levitt and Stephen J. Dubner, an award-winning author and journalist. They set out to explore the inner workings of a crack gang, the truth about real estate agents, the secrets of the Ku Klux Klan, and much more. ",
  //      'pages': 315,
  //      'pub_date': "08-15-2009",
  //      'subject_array': ['economics', 'nonfiction']
  //     }
  // ]

  // $scope.subject = "";
  $scope.results = false;

  $scope.bookSearch = function() {
    var url = "http://localhost:3000/books/search?";

    var titleParams, authorParams, subjectParams;

    if ($scope.search.title) {
      titleParams = $scope.search.title;
      url = url + "title=" + titleParams;
    }

    if ($scope.search.author) {
      authorParams = $scope.search.author;
      url = url + "&author=" + authorParams;
    }

    if ($scope.search.subject) {
      subjectParams = $scope.search.subject;
      url = url + "&subject=" + subjectParams;
    }

    console.log(url);
    $http.get(url).success(function(data) {
      console.log(data)
      $scope.books = data;
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

booksControllerModule.controller('bookController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
  $scope.control = "the Book Controller";
  $scope.id = $stateParams.id;

  $scope.book = {}

  $http.get("http://localhost:3000/books/" + $stateParams.id).success(function(data) {
    $scope.book = data
  });

  //
  // $scope.books = [
  //     {'id': 1,
  //       'title': 'The Grapes of Wrath',
  //       'author': 'Steinbeck, John',
  //       'isbn': 0143039431,
  //       'description': 'First published in 1939, Steinbeck’s Pulitzer Prize-winning epic of the Great Depression chronicles the Dust Bowl migration of the 1930s and tells the story of one Oklahoma farm family, the Joadsdriven from their homestead and forced to travel west to the promised land of California. Out of their trials and their repeated collisions against the hard realities of an America divided into Haves and Have-Nots evolves a drama that is intensely human yet majestic in its scale and moral vision, elemental yet plainspoken, tragic but ultimately stirring in its human dignity. A portrait of the conflict between the powerful and the powerless, of one man’s fierce reaction to injustice, and of one woman’s stoical strength, the novel captures the horrors of the Great Depression and probes into the very nature of equality and justice in America. At once a naturalistic epic, captivity narrative, road novel, and transcendental gospel, Steinbeck’s powerful landmark novel is perhaps the most American of American Classics.',
  //       'pages': 464,
  //       'pub_date': "04-06-14",
  //       'subject_array': ['fiction', 'history'] },
  //     {'id': 2,
  //       'title': "Harry Potter and the Sorcerer's Stone",
  //      'author': "Rowling, J.K.",
  //      'isbn': 473847549,
  //      'description': "Harry heads off to magic boarding school.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //      'pages': 244,
  //      'pub_date': "05-04-98",
  //      'subject_array': ['fiction', 'fantasy', 'magic'] },
  //     {'id': 3,
  //       'title': "Freakonomics",
  //      'author': 'Levitt, Steven D., Dubner, Stephen J.',
  //      'isbn': 0060731338,
  //      'description': "Freakonomics is a groundbreaking collaboration between Levitt and Stephen J. Dubner, an award-winning author and journalist. They set out to explore the inner workings of a crack gang, the truth about real estate agents, the secrets of the Ku Klux Klan, and much more. ",
  //      'pages': 315,
  //      'pub_date': "08-15-2009",
  //      'subject_array': ['economics', 'nonfiction']
  //     }
  // ]
  //
  // $scope.getBook = function(book_id) {
  //   for (var i = 0; i < $scope.books.length; i++) {
  //     if ($scope.books[i].id == book_id) {
  //       return $scope.books[i];
  //     };
  //   };
  // };
  //
  //
  // $scope.book = $scope.getBook($stateParams.id);

}]);

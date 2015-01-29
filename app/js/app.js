
var eagleReadersApp = angular.module('eagleReadersApp', [
  'ui.router',
  'booksControllerModule'
]);

eagleReadersApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('books', {
      url: '/books',
      templateUrl: 'app/views/books.html',
    })
    .state('show', {
      url: '/book/:id',
      templateUrl: 'app/views/books/show.html',

    })
  $urlRouterProvider.otherwise('/');
});

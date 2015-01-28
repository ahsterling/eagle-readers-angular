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
  $urlRouterProvider.otherwise('/');
});

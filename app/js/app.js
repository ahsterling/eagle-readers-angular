
var eagleReadersApp = angular.module('eagleReadersApp', [
  'ui.router',
  'booksControllerModule',
  'usersControllerModule',
  'badgesControllerModule',
  'filtersModule'
]);

eagleReadersApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
      url: '/',
      views: {
        'header': {
          templateUrl: 'app/views/layout/header.html'
        },
        'content': {
            templateUrl: 'app/views/users/login.html'
        }
      }
    })
    .state('app.dashboard', {
      url: 'dashboard',
      views: {
        'content@': {
          templateUrl: 'app/views/users/dashboard.html'
        }
      }
    })
    .state('app.badges', {
      url: 'badges',
      views: {
        'content@': {
          templateUrl: 'app/views/badges/badges.html'
        }
      }
    })
    .state('app.books', {
      url: 'books',
      views: {
        'content@': {
          templateUrl: 'app/views/books.html'
        }
      }
    })
    .state('app.books.detail', {
      url: '/:id',
      views: {
        'content@': {
          templateUrl: 'app/views/books/show.html'
        }
      }
    })
  $urlRouterProvider.otherwise('/');
});

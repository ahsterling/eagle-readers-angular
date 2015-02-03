
var eagleReadersApp = angular.module('eagleReadersApp', [
  'ui.router',
  'booksControllerModule',
  'usersControllerModule',
  'badgesControllerModule',
  'userSessionsModule',

  'ng-token-auth',
  'ipCookie'
]);

eagleReadersApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
      url: '/',
      views: {
        'header': {
          templateUrl: 'app/views/layout/header.html',
          controller: 'userSessionsController'
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
    .state('app.badges.detail', {
      url: '/:id',
      views: {
        'show': {
          templateUrl: 'app/views/badges/badge_show.html'
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
        'show': {
          templateUrl: 'app/views/books/show.html'
        }
      }
    })
  $urlRouterProvider.otherwise('/');
});

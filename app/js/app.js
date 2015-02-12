
var eagleReadersApp = angular.module('eagleReadersApp', [
  'ui.router',
  'ui.bootstrap',
  'booksControllerModule',
  'usersControllerModule',
  'badgesControllerModule',
  'loginControllerModule',
  'indexControllerModule',
  'filtersModule',
  'ng-token-auth',
  'ipCookie',
  'matchMedia',
  'servicesModule'
]);

eagleReadersApp.config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $authProvider.configure({
      apiUrl:  'http://54.213.100.80',
      storage: 'cookies'
    })
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
      },
      resolve: {
        auth: function($auth) {
          return $auth.validateUser()
        }
      }
    })
    .state('app.badges', {
      url: 'badges',
      views: {
        'content@': {
          templateUrl: 'app/views/badges/badges.html'
        }
      },
      resolve: {
        auth: function($auth) {
          return $auth.validateUser()
        }
      }
    })
    .state('app.badges.detail', {
      url: '/:id',
      views: {
        'show': {
          templateUrl: 'app/views/badges/badge_show.html'
        }
      },
      resolve: {
        auth: function($auth) {
          return $auth.validateUser()
        }
      }

    })
    .state('app.books', {
      url: 'books',
      views: {
        'content@': {
          templateUrl: 'app/views/books.html'
        }
      },
      resolve: {
        auth: function($auth) {
          return $auth.validateUser();
        }
      }

    })
    .state('app.books.detail', {
      url: '/:id',
      views: {
        'show': {
          templateUrl: 'app/views/books/show.html'
        }
      },
      resolve: {
        auth: function($auth) {
          return $auth.validateUser()
        }
      }

    })
  $urlRouterProvider.otherwise('/');
});

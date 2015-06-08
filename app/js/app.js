
var eagleReadersApp = angular.module('eagleReadersApp', [
  'ui.router',
  'ui.bootstrap',
  'booksControllerModule',
  'usersControllerModule',
  'badgesControllerModule',
  'loginControllerModule',
  'indexControllerModule',
  'adminControllerModule',
  'filtersModule',
  'ng-token-auth',
  'ipCookie',
  'servicesModule'
]);

eagleReadersApp.config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $authProvider.configure([
      {
        default: {
          apiUrl:  'http://54.213.100.80',
          // apiUrl: 'http://localhost:3000',
          storage: 'cookies'
        }
      }, {
      admin: {
        apiUrl:                'http://54.213.100.80',
        proxyIf:               function() { window.isOldIE() },
        signOutUrl:            '/admin_auth/sign_out',
        emailSignInPath:       '/admin_auth/sign_in',
        emailRegistrationPath: '/admin_auth',
        accountUpdatePath:     '/admin_auth',
        accountDeletePath:     '/admin_auth',
        passwordResetPath:     '/admin_auth/password',
        passwordUpdatePath:    '/admin_auth/password',
        tokenValidationPath:   '/admin_auth/validate_token',
      }
    }
    ]);
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
    .state('app.admin_dashboard', {
      url: 'admin_dashboard',
      views: {
        'content@': {
          templateUrl: 'app/views/admin/admin_dashboard.html'
        }
      },
      resolve: {
        auth: function($auth) {
          return $auth.validateUser({config: 'admin'})
        }
      }
    })
    .state('app.admin_dashboard.edit_book', {
      url: 'edit_book',
      views: {
        'content@': {
          templateUrl: 'app/views/edit_book.html'
        }
      },
      resolve: {
        auth: function($auth) {
          return $auth.validateUser({config: 'admin'})
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

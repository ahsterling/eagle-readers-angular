'use strict';

describe('userController', function() {

  var scope, ctrl, $httpBackend;
  // beforeEach(function() { module('eagleReadersApp'); });
  beforeEach(module('eagleReadersApp'));
  beforeEach(module('usersControllerModule'));

//   beforeEach(inject(function($controller) {
//    scope = {};
//    ctrl = $controller('booksController', {$scope: scope});
//  }));

 beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $stateParams) {
   $httpBackend = _$httpBackend_;
   $stateParams.id = 1;
   $httpBackend.when('GET', 'http://54.213.100.80/users/' + $stateParams.id + "/books").
      respond([{title: 'The Great Gatsby'}, {title: 'Looking for Alaska'}]);
    $httpBackend.when('GET', 'http://54.213.100.80/users/' + $stateParams.id + "/badges").
      respond([{genre_name: "Mystery"}])
   scope = $rootScope.$new();
   ctrl = $controller('userController', {$scope: scope});
 }));

 it('should create books model with 2 books', function() {
   $httpBackend.flush();
   expect(scope.books.length).toBe(2);
 });


});

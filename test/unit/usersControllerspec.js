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
   $httpBackend.when('GET', 'http://localhost:3000/users/' + $stateParams.id + "/books").
      respond([{title: 'The Great Gatsby'}, {title: 'Looking for Alaska'}]);
   scope = $rootScope.$new();
   ctrl = $controller('userController', {$scope: scope});
 }));

 it('should create books model with 2 books', function() {
   $httpBackend.flush();
   expect(scope.books.length).toBe(2);
 });


});

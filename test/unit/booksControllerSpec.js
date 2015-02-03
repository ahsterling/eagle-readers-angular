'use strict';

describe('Books Controller', function() {


  describe('booksController', function() {


    var scope, ctrl, $httpBackend;
    // beforeEach(function() { module('eagleReadersApp'); });
    beforeEach(module('eagleReadersApp'));
    beforeEach(module('booksControllerModule'));

  //   beforeEach(inject(function($controller) {
  //    scope = {};
  //    ctrl = $controller('booksController', {$scope: scope});
  //  }));

   beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
     $httpBackend = _$httpBackend_;
     $httpBackend.when('GET', 'http://localhost:3000/books').
        respond([{title: 'The Great Gatsby'}, {title: 'Looking for Alaska'}]);
     $httpBackend.when('GET', 'http://localhost:3000/subjects').
        respond([{name: "Fiction"}, {name: "History"}]);
     scope = $rootScope.$new();
     ctrl = $controller('booksController', {$scope: scope});
   }));


   it('should create "subjects" model with 2 subjects', function() {

    //  expect(scope.books).toEqualData([]);
     $httpBackend.flush();
     expect(scope.subjects.length).toBe(2);
    //  expect(scope.books).toEqualData(
    //      [{title: 'The Great Gatsby'}, {title: 'Looking for Alaska'}]);

   });

 })

 describe('bookController', function() {
   var scope, ctrl, $httpBackend;

   beforeEach(module('eagleReadersApp'));
   beforeEach(module('booksControllerModule'));

   beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $stateParams) {
     $httpBackend = _$httpBackend_;
     $stateParams.id = 1;

     $httpBackend.when('GET', 'http://localhost:3000/books/'+ $stateParams.id).
        respond({title: 'The Great Gatsby'});
     scope = $rootScope.$new();
     ctrl = $controller('bookController', {$scope: scope});
   }));


  //  beforeEach(inject(function($controller, $stateParams) {
  //    scope = {};
  //    $stateParams.id = 1;
  //    ctrl = $controller('bookController', {$scope: scope});
  //  }));

   it('should create "book" model', function() {
     $httpBackend.flush();
     expect(scope.book.title).toBe("The Great Gatsby");
   })
 })
});

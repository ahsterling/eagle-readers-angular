'use strict';

describe('Books Controller', function() {


  describe('booksController', function() {

    var scope, ctrl;
    // beforeEach(function() { module('eagleReadersApp'); });
    beforeEach(module('eagleReadersApp'));
    beforeEach(module('booksControllerModule'));

    beforeEach(inject(function($controller) {
     scope = {};
     ctrl = $controller('booksController', {$scope: scope});
   }));

   it('should create "books" model with 3 books', function() {
     expect(scope.books.length).toBe(3);
   });

 })

 describe('bookController', function() {
   var scope, ctrl;

   beforeEach(module('eagleReadersApp'));
   beforeEach(module('booksControllerModule'));

   beforeEach(inject(function($controller, $stateParams) {
     scope = {};
     $stateParams.id = 1;
     ctrl = $controller('bookController', {$scope: scope});
   }));

   it('should create "book" model', function() {
     expect(scope.book.title).toBe("The Grapes of Wrath");
   })
 })
});

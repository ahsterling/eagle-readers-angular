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
});

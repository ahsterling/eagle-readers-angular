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
     scope = $rootScope.$new();
     ctrl = $controller('booksController', {$scope: scope});

     $httpBackend = _$httpBackend_;
     $httpBackend.when('GET', 'http://54.213.100.80/books').
        respond([{title: 'The Great Gatsby'}, {title: 'Looking for Alaska'}]);
    //  $httpBackend.when('GET', 'http://localhost:3000/subjects').
    //     respond([{name: "Fiction"}, {name: "History"}]);
     $httpBackend.when('GET', 'http://54.213.100.80/genres').
        respond([{genre_name: 'fiction'}, {genre_name: 'history'}]);
   }));


   it('should create "genres" model with 2 genres', function() {

    //  expect(scope.books).toEqualData([]);
     $httpBackend.flush();
     expect(scope.genres.length).toBe(2);
    //  expect(scope.books).toEqualData(
    //      [{title: 'The Great Gatsby'}, {title: 'Looking for Alaska'}]);

   });

 })

 describe('bookController', function() {
   var scope, ctrl, user, $httpBackend;

   beforeEach(module('eagleReadersApp'));
   beforeEach(module('booksControllerModule'));

   beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $stateParams) {
     $httpBackend = _$httpBackend_;
     $stateParams.id = 1;
     user = {id: 6};

     $httpBackend.when('GET', 'http://54.213.100.80/users/' + user.id).
        respond(user);

     $httpBackend.when('GET', 'http://54.213.100.80/books/'+ $stateParams.id).
        respond({title: 'The Great Gatsby'});

     $httpBackend.when('GET', 'http://54.213.100.80/books/' + $stateParams.id + '/subjects').
        respond({name: "Fiction"});

     $httpBackend.when('GET', 'http://54.213.100.80/users/' + user.id + '/books').
        respond([{title: "The Great Gatsby"}, {title: "The Fault in Our Stars"}]);

     scope = $rootScope.$new();
     ctrl = $controller('bookController', {$scope: scope});
   }));

   it('should create "book" model', function() {
     $httpBackend.flush();
     expect(scope.book.title).toBe("The Great Gatsby");
   });

   it('should get that books subjects', function() {
     $httpBackend.flush();
     expect(scope.subjects.length).toBe(1);
   });
 });
});

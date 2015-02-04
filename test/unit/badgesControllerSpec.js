'use strict';

describe('badgesController',function() {
  var scope, ctrl, $httpBackend;
  // beforeEach(function() { module('eagleReadersApp'); });
  beforeEach(module('eagleReadersApp'));
  beforeEach(module('badgesControllerModule'));


 beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
   $httpBackend = _$httpBackend_;
   $httpBackend.when('GET', 'http://localhost:3000/genre_badges').
      respond([{genre_name: 'Mystery'}, {genre_name: 'Fiction'}]);
   scope = $rootScope.$new();
   ctrl = $controller('badgesController', {$scope: scope});
 }));




 it('should create "badges" model with 3 badges', function() {
   $httpBackend.flush();
   expect(scope.badges.length).toBe(2);
 });

});

describe('badgeController', function() {

  var scope, ctrl, $httpBackend;
  // beforeEach(function() { module('eagleReadersApp'); });
  beforeEach(module('eagleReadersApp'));
  beforeEach(module('badgesControllerModule'));


 beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $stateParams) {
   $stateParams.id = 1;
   $httpBackend = _$httpBackend_;
   $httpBackend.when('GET', 'http://localhost:3000/genre_badges/' + $stateParams.id).
      respond({genre_name: 'Mystery'});
   scope = $rootScope.$new();
   ctrl = $controller('badgeController', {$scope: scope});
 }));

 it('should create badge model', function() {
   $httpBackend.flush();
   expect(scope.badge.genre_name).toBe("Mystery");
 })



});

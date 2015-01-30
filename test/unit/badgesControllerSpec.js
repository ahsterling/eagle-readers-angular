'use strict';

describe('badgesController',function() {
  var scope, ctrl;
  // beforeEach(function() { module('eagleReadersApp'); });
  beforeEach(module('eagleReadersApp'));
  beforeEach(module('badgesControllerModule'));

  beforeEach(inject(function($controller) {
   scope = {};
   ctrl = $controller('badgesController', {$scope: scope});
 }));

 it('should create "badges" model with 3 badges', function() {
   expect(scope.badges.length).toBe(3);
 });

});

describe('badgeController', function() {

  var scope, ctrl;

  beforeEach(module('badgesControllerModule'));

  beforeEach(inject(function($controller) {
   scope = {};
   ctrl = $controller('badgeController', {$scope: scope, $stateParams: {"id": "1"}});
 }));

 it('sc')



})

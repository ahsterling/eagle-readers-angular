var navControllerModule = angular.module('navControllerModule', []);

navControllerModule.controller('navController', ['$scope','screenSize', function($scope, screenSize) {
  // $scope.isCollapsed = false;

  // screenSize.when('xs', function() {
  //   $scope.isCollapsed = true;
  // });
  //
  // screenSize.when('sm', 'md', 'lg', function() {
  //   $scope.isCollapsed = false;
  // })
  //
  // screenSize.when('sm, md, lg', function() {
  //   $scope.isCollapsed = false;
  // })

  screenSize.when('xs', function() {
    $scope.isCollapsed = true;
    $scope.showToggle = true;
  });

  screenSize.when('sm', 'md', 'lg', function() {
    $scope.isCollapsed = false;
    $scope.showToggle = false;
  })


  if (screenSize.is('xs')) {
    $scope.isCollapsed = true;
    $scope.smallScreen = true;
  } else {
    $scope.isCollapsed = false;
    $scope.smallScreen = false;
  }
}]);

var badgesControllerModule = angular.module('badgesControllerModule', []);

badgesControllerModule.controller('badgesController', [
  '$scope',
  '$http',
  '$modal',
  '$position',

  function($scope, $http, $modal, $position) {

    $scope.loadingBadges = true;

    $http.get('http://54.213.100.80/genre_badges')
      .success(function(data) {
        $scope.badges = data;
        $scope.loadingBadges = false;
      });


    $scope.badgeShow = function(badge_id) {

      $modal.open({
        templateUrl: 'app/views/badges/badge_show.html',
        controller: 'badgesController'
      })

    }


}]);

badgesControllerModule.controller('badgeController', [
  '$scope',
  '$http',
  '$stateParams',

  function($scope, $http, $stateParams) {

    $http.get('http://54.213.100.80/genre_badges/' + $stateParams.id)
      .success(function(data) {
        $scope.badge = data;
      });



    $scope.getBadge = function(badge_id) {

      for (var i = 0; i < $scope.badges.length; i++) {
        var badge_id_as_string = "" + $scope.badges[i].id;
        if (badge_id_as_string === badge_id) {
          return $scope.badges[i];
        };
      };
    };


}]);

var badgesControllerModule = angular.module('badgesControllerModule', []);

badgesControllerModule.controller('badgesController', ['$scope', '$http', function($scope, $http) {

  $http.get('http://localhost:3000/genre_badges')
    .success(function(data) {
      $scope.badges = data;
    });

//   $scope.badges = [
//     {title: "Genre Explorer",
//     description: "Read three books from the same genre",
//     id: 1},
//     {title: "Poetry Slam",
//     description: "Read a poetry book",
//     id: 2},
//     {title: "Eagles Read",
//     description: "Read a book from the Eagles Read list",
//     id: 3}
//   ]
}]);

badgesControllerModule.controller('badgeController', ['$scope', '$stateParams', function($scope, $stateParams) {
  $scope.badges = [
    {title: "Genre Explorer",
    description: "Read three books from the same genre",
    id: 1},
    {title: "Poetry Slam",
    description: "Read a poetry book",
    id: 2},
    {title: "Eagles Read",
    description: "Read a book from the Eagles Read list",
    id: 3}
  ]

  $scope.getBadge = function(badge_id) {

    for (var i = 0; i < $scope.badges.length; i++) {
      var badge_id_as_string = "" + $scope.badges[i].id;
      if (badge_id_as_string === badge_id) {
        return $scope.badges[i];
      };
    };
  };

  $scope.stateParams = $stateParams
  $scope.id = $stateParams.id;
  $scope.hello = "hey!"
  $scope.badge = $scope.getBadge($stateParams.id);

}]);

//this is defining the app module and the balancedBracecesTest directive within that module
angular.module('app', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.count = 0;
    $scope.myFunc = function() {
		//This is where the function that evaluates the string is going to go
      $scope.count++;
    };
  
}])
.directive('balancedBracesTest', function () {
	return {
		restrict: 'E',
		scope: false,
		templateUrl: 'balanced-braces.tmpl.html'
	};
});



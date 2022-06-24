//this is defining the app module and the balancedBracecesTest directive within that module
angular.module('app', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.count = "";
    $scope.myFunc = function(bracesArr) {
      
        let stack = [];
        let counter = 0;
  
        for(let i = 0; i < bracesArr.length; i++)
        {
            let x = bracesArr[i];
  
            if (x == '(' || x == '[' || x == '{')
            {
              
                stack.push(x);
                counter = counter + 1;
                continue;
            }
              
            let check;
            switch (x){
            case ')':
                check = stack.pop();
                counter = counter - 1;
                if (check == '{' || check == '['){
                    $scope.count = "This is not balanced";
			return;}
                break;
  
            case '}':
                check = stack.pop();
                counter = counter - 1;
                if (check == '(' || check == '['){
                    $scope.count = "This is not balanced";
			return;}
                break;
  
            case ']':
                check = stack.pop();
                counter = counter - 1;
                if (check == '(' || check == '{'){
                    $scope.count = "This is not balanced";
			return;}
                break;
            }
        }
        if ((stack.length == 0) && (counter == 0))
            $scope.count = "This is balanced";
        else
            $scope.count = "This is not balanced";
    };
    $scope.changeFace = function() {
        $scope.count = "";
    };
  
}])
.directive('balancedBracesTest', function () {
	return {
		restrict: 'E',
		scope: false,
		templateUrl: 'balanced-braces.tmpl.html'
	};
});

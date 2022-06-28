//this is defining the app module and the balancedBracecesTest directive within that module
angular.module('app', [])
.controller('Controller', ['$scope', function($scope) {
  
  $scope.result = " ";
  
  $scope.count = [];
  
  $scope.bracks = [
     { id: 1, value: '[]', name: '[square]'}, 
     { id: 2, value: '{}', name: '{curly}'}, 
     { id: 3, value: '()', name: '(normal)'}, 
    ];
    
    $scope.myFunc = function(bracesArr) {
        
        $scope.checkVal();
        let tempGroup = $scope.count;
        const frontMap = new Map();
        const backMap = new Map();
        
        for(let i = 0; i < tempGroup.length ; i++){
            frontMap.set(tempGroup[i][0], tempGroup[i][1]);
            backMap.set(tempGroup[i][1], tempGroup[i][0]);
        }
        
        let stack = [];

        if (frontMap.size == 0){
            $scope.result = "Please check a box";
            return;
        }

        
        if((bracesArr == null) || (bracesArr == "")){
            $scope.result = "Please enter a String";
            return;
        }

        
        for(let i = 0; i < bracesArr.length; i++)
        {
            let x = bracesArr[i];
  
            if (frontMap.get(x) != null)
            {
                stack.push(x);
                continue;
            }
            
            let check;
            
            if(backMap.get(x) != null){
                check = stack.pop();
                
                if (check != backMap.get(x)){
                    $scope.result = "This is not balanced";
                    return;
                }
            }
        }

        if ((stack.length == 0))
            $scope.result = "This is balanced";
        else
            $scope.result = "This is not balanced";
    };
    
    $scope.changeFace = function() {
        $scope.result = " ";
    };

    $scope.checkVal = function(){
        $scope.count = [];
        var checkedUsers = '';
        $scope.bracks.forEach(function(brack) {

          if (brack.selected) {
            vals = [brack.value[0], brack.value[1]]
            $scope.count.push(vals);
          }
        });
   }
 
  
}])
.directive('balancedBracesTest', function () {
	return {
		restrict: 'E',
		scope: false,
		templateUrl: 'balanced-braces.tmpl.html'
	};
});


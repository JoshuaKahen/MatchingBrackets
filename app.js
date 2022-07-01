angular.module('app', [])
.controller('Controller', ['$scope', function($scope) {
  // result is used for the String that will be evaluated
  $scope.result = " ";
  // count is for the parenthesis that are being used
  $scope.count = [];
  // customer is for the custom parenthesis that are being used
  $scope.customer = "";
  $scope.frontCus = "";
  $scope.backCus = "";
  $scope.customModel;

  // this group contains all the parenthesis that can be used
  $scope.bracks = [
     { id: 1, value: '[]', name: '[square]'}, 
     { id: 2, value: '{}', name: '{curly}'}, 
     { id: 3, value: '()', name: '(normal)'}, 
    ];
    // this is the function that is used when the button is clicked
    // it contains the evaluations that determine if the string is balanced, if it is empty, or if any boxes are checked
    $scope.myFunc = function(bracesArr) {
        
        // creates maps that check if certain characters are parenthesis
        $scope.checkVal();
        let tempGroup = $scope.count;
        const frontMap = new Map();
        const backMap = new Map();


        // maps are created front-to-back and back-to-front 
        for(let i = 0; i < tempGroup.length ; i++){
            frontMap.set(tempGroup[i][0], tempGroup[i][1]);
            backMap.set(tempGroup[i][1], tempGroup[i][0]);
        }
        
        if ($scope.customModel.selected){
            if (!($scope.checkCus(frontMap, backMap))){
                $scope.result = "Custom parenthesis cannot be the same, already used, or blank";
                return;
            }
            frontMap.set($scope.frontCus, $scope.backCus);
            backMap.set($scope.backCus, $scope.frontCus);
                    
        }


        // stack is used to check if the parenthesis match each other
        let stack = [];

        if (frontMap.size == 0){
            $scope.result = "Please check a box";
            return;
        }

        // if the input is empty, it sends back a message for the user to enter in a String
        if((bracesArr == null) || (bracesArr == "")){
            $scope.result = "Please enter a String";
            return;
        }

        // for-loop checks each character to see if it is a selected parenthesis
        for(let i = 0; i < bracesArr.length; i++)
        {
            let x = bracesArr[i];
  
            // checks if character is a front-facing parenthesis
            if (frontMap.get(x) != null)
            {
                stack.push(x);
                continue;
            }
            
            // checks if character is a back-facing parenthesis
            let check;
            // sees if the character is able to get a non-null character which means that it is a parenthesis
            if(backMap.get(x) != null){
                check = stack.pop();
                // if the current back-facing parenthesis does not match the precious front-facing parenthesis, it will change the result and stop early
                if (check != backMap.get(x)){
                    $scope.result = "This is not balanced";
                    return;
                }
            }
        }

        // final check to see if the stack is empty to make sure that there are no unused parenthesis
        if ((stack.length == 0))
            $scope.result = "This is balanced";
        else
            $scope.result = "This is not balanced";
    };
    // function makes the result blank whenever the input is changed and not activated
    $scope.changeFace = function() {
        $scope.result = " ";
    };
    // this finds out which checkboxes are active and sends back a list 
    $scope.checkVal = function(){
        $scope.count = [];
        var checkedUsers = '';
        $scope.bracks.forEach(function(brack) {

        // makes mini-array that contains the parenthesis that are being activated and pushes it into another array to be used
          if (brack.selected) {
            vals = [brack.value[0], brack.value[1]]
            $scope.count.push(vals);
          }
        });
   }
   $scope.checkCus = function(frontMap, backMap) {
        if (frontMap.get($scope.frontCus) != null || backMap.get($scope.frontCus) != null || $scope.frontCus == " " || $scope.frontCus == ""){
            return false;}
        else if (backMap.get($scope.backCus) != null || frontMap.get($scope.backCus) != null || $scope.backCus == " " || $scope.backCus == ""){
            return false;}
        else if ($scope.frontCus == $scope.backCus){
            return false}

        return true;
    };

 
  
}])
.directive('balancedBracesTest', function () {
	return {
		restrict: 'E',
		scope: false,
		templateUrl: 'balanced-braces.tmpl.html'
	};
});




(function(){
    var app = angular.module('LunchCheck', []);
    var lunchCheckController = function($scope)
    {
        $scope.checkInput = function()
        {
            if (!isNotEmpty($scope.lunchItems))
            {
                $scope.lunchMessage = "Please enter data first";
            }
            else
            {
                var lunchItems = $scope.lunchItems.trim().split(',').filter(isNotEmpty);
                // PLEASE NOTE: Empty values within commas are not counted.
                // Therefore, an input of "  ,  " is considered an empty input and will
                // prompt for entering a valid input.
                // Specifying "a,b,  ,c" is counted as 3 instead of 4 items.
                if (lunchItems.length == 0)
                {
                    $scope.lunchMessage = "Please enter data first";
                }
                else if (lunchItems.length > 3)
                {
                    $scope.lunchMessage = "Too Much!";
                }
                else
                {
                    $scope.lunchMessage = "Enjoy!";
                } 
            }                       
        }

        $scope.clearMessage = function()
        {
            $scope.lunchMessage = '';
        }

        var isNotEmpty = function(item)
        {
            return item != undefined && item.trim() != '';
        }
    };

    lunchCheckController.$inject = ['$scope'];
    app.controller("LunchCheckController", lunchCheckController);

})();
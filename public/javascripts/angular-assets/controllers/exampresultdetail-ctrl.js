app.controller('exampresultDetailcontroller', function ($scope,$state, passingdataservice) {
    
    $scope.ListObj = passingdataservice.addObj;
    console.log($scope.ListObj);
    $scope.test = 123;
    // for(var i = 0; i < $scope.ListObj.Quiz.length; i++)
    // {
    //     $scope.ListObj.Quiz.No = i+1;
    //     console.log($scope.ListObj.Quiz.No);
    // }
});
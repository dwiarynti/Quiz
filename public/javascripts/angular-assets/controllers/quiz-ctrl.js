app.controller('quizcontroller', function ($scope, $state, quizResource) {
var quizresource  = new quizResource();
$scope.init = [];
quizresource.$init({}, function(data)
{
  
    angular.forEach(data.obj,function(item) {
        $scope.init.push(item);
    });
    var questionCount = $scope.init.length;
    
});
});
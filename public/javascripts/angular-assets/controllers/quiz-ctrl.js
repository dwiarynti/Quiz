app.controller('quizcontroller', function ($scope, $state,$filter, quizResource) {
var quizresource  = new quizResource();
$scope.init = [];
$scope.Questions = [];
$scope.Choices = [];
$scope.initData = [];

$scope.GetChoices = function(questionid)
{
    quizresource.$getchoices({_id:questionid},function(data)
    {
        return data.obj;
    });
}
quizresource.$getchoices({_id:"58f85f027f12da881796c8d2"},function(data)
{
     $scope.Choices = data.obj;
    // console.log($scope.Choices);
   
});

quizresource.$init({}, function(data)
{
    angular.forEach(data.obj,function(item) {
        $scope.Questions.push(item);
    });

    var Choices = [];

    for(var i = 0; i < $scope.Questions.length; i++)
    //angular.forEach($scope.Questions,function(item)
    {
        $scope.Questions[i].Choices = [];
        $scope.Questions[i].No = i+1;
        quizresource.$getchoices({_id:$scope.Questions[i]._id},function(data)
        {
            Choices = data.obj; 

            for(var i = 0; i < $scope.Questions.length; i++)
            //angular.forEach($scope.Questions,function(item)
            {
                $scope.Questions[i].Choices = $filter('filter')(Choices,function(item){
                    return item.Questions_id === $scope.Questions[i]._id
                });

            };
           // console.log(Choices);
        });
        
    };
   
  
    //console.log(Choices);
    console.log($scope.Questions);
});










// $scope.initQuiz = function()
// {
//     var datachoices = $scope.GetDataChoices();
//     angular.forEach($scope.Questions,function(item)
//     {
//       var getChoices = $filter('filter')(
//          datachoices,function(obj){ return obj.Questions_id === item._id}
//       )
//       item.Choices = [];
//       item.Choices = getChoices;
//     });
   
//  //console.log($scope.Questions);
// }
});
app.controller('exampresultIndexcontroller', function ($scope,$state,submitquizResource, passingdataservice) {
    
    var submitquizresource = new submitquizResource();
    $scope.initobj = [];

    submitquizresource.$init({},function(data)
    {
   
        $scope.initobj = data.obj;
        
        console.log(data);
    
    });

    $scope.btnDetailClick = function (obj){
        for(var i = 0; i < obj.Quiz.length; i++)
        {
            obj.Quiz[i].No = i+1;
            console.log(obj.Quiz);
        }
        passingdataservice.addObj = obj;
        $state.go('exampresult-detail');
    }
});
app.controller('exampresultIndexcontroller', function ($scope,$state, $rootScope,submitquizResource, passingdataservice) {
    
    var submitquizresource = new submitquizResource();
    $scope.initobj = [];

// questionresource.$add(function(data){
    if($rootScope.setting.role)
    submitquizresource._username = $rootScope.setting.role == "admin"?"":$rootScope.setting.username;
    submitquizresource.$init(function(data)
    {
        if(!data.authorize){
            $state.go('login');
        }
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
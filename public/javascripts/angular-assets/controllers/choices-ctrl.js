app.controller('choicescontroller', function ($scope, $state, $filter, choicesResource, passingdataservice) {

    var choicesresource = new choicesResource();
    $scope.choices =[];
    $scope.question_id =passingdataservice.addObj._id;
    $scope.question =passingdataservice.addObj.question;
    $scope.enableCorrectAnswerChoices = true;

    $scope.init = function(){
        console.log(passingdataservice.addObj)
            choicesresource.$init({_id:$scope.question_id}, function(data){
                console.log(data);
                $scope.choices = data.Obj;

                var getCorrectAnswer = $filter('filter')($scope.choices, function (choiceobj) { return choiceobj.isCorrectAnswer === true })[0];

                $scope.enableCorrectAnswerChoices = getCorrectAnswer != null ? false:true;

                console.log(getCorrectAnswer);
                console.log($scope.enableCorrectAnswerChoices);

            });
    }
    
    $scope.init();

    $scope.choicesObj = {'ChoicesName':"", 'isCorrectAnswer':false, 'isActive':true, 'Questions_id':$scope.question_id};

    $scope.btnAddClick = function(id){
        $scope.choicesObj = {'ChoicesName':"", 'isCorrectAnswer':false, 'isActive':true, 'Questions_id':$scope.question_id};
              
        $("#modal-add").modal('show');
    }

    $scope.insert = function(){
        var choicesresource = new choicesResource();
        // choicesresource.Subject_id = $scope.question_id;
        // choicesresource.choices = $scope.choicesObj.choices;
        choicesresource.choicesObj = $scope.choicesObj;
        choicesresource.$add(function(data){
            if(data.success){
                $("#modal-add").modal('hide');
                $scope.init();

            }
        });
    };
    


    $scope.updatedid = "";
    $scope.btnUpdateClick = function(id){
        $scope.choicesObj._id = id;
        $("#modal-update").modal('show');
        choicesresource.$getbyId({_id:id},function(data){
            $scope.choicesObj.choices = data.Obj.ChoicesName;
        });
    }
    $scope.UpdateClick = function()
    {
        $("#modal-update").modal('hide');
        choicesresource._id = $scope.choicesObj._id;
        choicesresource.choices = $scope.choicesObj.choices;
        choicesresource.$update(function(data)
        {
            $scope.init();
        });
    }
    
    $scope.btnDeleteClick = function(_id){
        $("#modal-delete").modal('show');
        $scope.choicesObj._id=_id;
    }    

    $scope.deleteClick = function(){
        $("#modal-delete").modal('hide');
        
        choicesresource._id = $scope.choicesObj._id;
        choicesresource.Subject_id = $scope.question_id;
        choicesresource.$delete(function(data)
        {
            if(data.success)
            {
                $scope.init();
                
            }
        });
    }
});
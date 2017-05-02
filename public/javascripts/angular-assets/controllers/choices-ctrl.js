app.controller('choicescontroller', function ($scope, $state, $filter, choicesResource, passingdataservice) {

    var choicesresource = new choicesResource();
    $scope.choices =[];
    $scope.question_id =passingdataservice.addObj._id;
    $scope.question =passingdataservice.addObj.question;
    $scope.subject_id =passingdataservice.addObj.Subject_id;
    $scope.subjectName =passingdataservice.addObj.subjectName;
    $scope.enableCorrectAnswerChoices = true;

    $scope.init = function(){
        console.log(passingdataservice.addObj)
       if($scope.question_id != null)
       {
            choicesresource.$init({_id:$scope.question_id}, function(data){
                console.log(data);
                if(!data.authorize)
                {
                $state.go('login');
                }
                else
                {
                    if(data.role == "user")
            {
                $state.go('login');
               
            }
            else
            {
                 $scope.choices = data.Obj;

                var getCorrectAnswer = $filter('filter')($scope.choices, function (choiceobj) { return choiceobj.isCorrectAnswer === true })[0];

                $scope.enableCorrectAnswerChoices = getCorrectAnswer != null ? false:true;

                console.log(getCorrectAnswer);
                console.log($scope.enableCorrectAnswerChoices);
            }
                }
            });
       }
       else
       {
           $state.go('question-index');
       }
    }
    
    $scope.init();

    $scope.choicesObj = {'ChoicesName':"", 'isCorrectAnswer':false, 'isActive':true, 'Questions_id':$scope.question_id};

    $scope.btnAddClick = function(id){
        $scope.choicesObj = {'ChoicesName':"", 'isCorrectAnswer':false, 'isActive':true, 'Questions_id':$scope.question_id};
              
        $("#modal-add").modal('show');
    }

    $scope.insert = function(){
        $scope.choicesObj.isCorrectAnswer = $scope.choicesObj.isCorrectAnswer == 1?true:false;
        var choicesresource = new choicesResource();
        
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
            $scope.choicesObj.ChoicesName = data.Obj.ChoicesName;
            $scope.choicesObj.isCorrectAnswer = data.Obj.isCorrectAnswer ? 1:0;
        });
    }
    $scope.UpdateClick = function()
    {
        $("#modal-update").modal('hide');
        choicesresource._id = $scope.choicesObj._id;
        choicesresource.ChoicesName = $scope.choicesObj.ChoicesName;
        choicesresource.isCorrectAnswer = $scope.choicesObj.isCorrectAnswer == 1?true:false;;
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
        choicesresource.Questions_id = $scope.choicesObj.Questions_id;
        choicesresource.$delete(function(data)
        {
            if(data.success)
            {
                $scope.init();
                
            }
        });
    }
    $scope.btnBackClick =function(){
        passingdataservice.addObj = {"_id":$scope.subject_id,"subjectName":$scope.subjectName};

        $state.go('question-index');
    }
});
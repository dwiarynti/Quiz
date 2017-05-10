app.controller('choicescontroller', function ($scope, $rootScope, $state, $filter, choicesResource, passingdataservice) {

    var choicesresource = new choicesResource();
    $scope.choices =[];
    $scope.question_id =passingdataservice.addObj._id;
    $scope.question =passingdataservice.addObj.question;
    $scope.subject_id =passingdataservice.addObj.Subject_id;
    $scope.subjectName =passingdataservice.addObj.subjectName;
    $scope.enableCorrectAnswerChoices = true;
    // $scope.openchoices = false;


    $scope.init = function(){
       if($scope.question_id != null)
       {
            choicesresource.$init({_id:$scope.question_id}, function(data){
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
                angular.forEach(data.Obj,function(item) {
                    item.editmode = false;   
                    item.temp_id=false;
                             
                });
                 $scope.choices = data.Obj;
                

                var getCorrectAnswer = $filter('filter')($scope.choices, function (choiceobj) { return choiceobj.isCorrectAnswer === true })[0];

                $scope.enableCorrectAnswerChoices = getCorrectAnswer != null ? false:true;

                // console.log(getCorrectAnswer);
                // console.log($scope.enableCorrectAnswerChoices);
            }
                }
            });
       }
       else
       {
           $state.go('question-index');
       }
    }
    $scope.$watch(function () {
        return passingdataservice.addObj;
    }, function () {
        console.log(passingdataservice.addObj);
        // $scope.openchoices = passingdataservice.addObj.openchoices;                
        $scope.question_id =passingdataservice.addObj._id;
        $scope.question =passingdataservice.addObj.question;
        $scope.subject_id =passingdataservice.addObj.Subject_id;
        $scope.subjectName =passingdataservice.addObj.subjectName;
        $scope.init();
        
    });
    $scope.init();

    $scope.choicesObj = {'ChoicesName':"", 'isCorrectAnswer':false, 'isActive':true, 'Questions_id':$scope.question_id};

    $scope.btnAddClick = function(id){
        $scope.choices.push({
            '_id':$scope.choices.length + 1,
            'ChoicesName':"", 
            'isCorrectAnswer':false, 
            'isActive':true, 
            'editmode' : false,
            'temp_id':true,     
            'Questions_id':$scope.question_id});
              
        // $("#modal-add").modal('show');
    }

    $scope.turnoffaddmode = function(index){
        $scope.choices.splice(index,1);
    }

    $scope.insert = function(obj){
        // $scope.choicesObj.isCorrectAnswer = $scope.choicesObj.isCorrectAnswer == 1?true:false;
        var choicesresource = new choicesResource();
        
        choicesresource.choicesObj = obj;
        choicesresource.$add(function(data){
            if(data.success){
                // $("#modal-add").modal('hide');
                $scope.init();

            }
        });
    };
    


    $scope.updatedid = "";
    $scope.btnUpdateClick = function(obj){
        obj.editmode = true;
        // $scope.choicesObj._id = id;
        // $("#modal-update").modal('show');
        // choicesresource.$getbyId({_id:id},function(data){
        //     $scope.choicesObj.ChoicesName = data.Obj.ChoicesName;
        //     $scope.choicesObj.isCorrectAnswer = data.Obj.isCorrectAnswer ? 1:0;
        // });
    }

    $scope.turnoffeditmode = function(obj){
        obj.editmode = false;    
    }

    $scope.UpdateClick = function(obj)
    {
        // $("#modal-update").modal('hide');
        choicesresource._id = obj._id;
        choicesresource.ChoicesName = obj.ChoicesName;
        choicesresource.isCorrectAnswer = obj.isCorrectAnswer;
        choicesresource.$update(function(data)
        {
            $scope.init();
        });
    }
    
    $scope.btnDeleteClick = function(_id){
        $("#modal-deletechoice").modal('show');
        $scope.choicesObj._id=_id;
    }    

    $scope.deleteClick = function(){
        $("#modal-deletechoice").modal('hide');
        
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

    $scope.closechoicespage = function(){
        $rootScope.openchoices = false;
    }
});
app.controller('questioncontroller', function ($scope, $rootScope, $state, questionResource, passingdataservice) {
    $scope.subject_id = {};
    var questionresource = new questionResource();
    $scope.questions =[];
    $scope.subject_id =passingdataservice.addObj._id;
    $scope.subjectName =passingdataservice.addObj.subjectName;
    $rootScope.openchoices = false;

    $scope.init = function(){
        if($scope.subject_id != null)
        {
            questionresource.$init({_id:$scope.subject_id}, function(data){

                if(!data.authorize)
                {
                    $state.go('login');
                }
                else
                {
                    if(data.role == "user")
                    {
                        $state.go('login')
                    }
                    else
                    {
                        angular.forEach(data.Obj,function(obj) {
                            obj.choicesobj = [];
                            obj.editmode = false;          
                        });
                        $scope.questions = data.Obj;
                        console.log($scope.questions);
                    }
                }          
            });
        }
        else
        {
            $state.go('subject-index')
        }
    
    }
    $scope.init();

    


    $scope.QuestionObj = {'_id':"",'question':""};

    $scope.btnAddClick = function(){
        console.log($scope.questions);
        $scope.questions.push({
            "_id":0,
            "Question":"",
            "Subject_id":$scope.subject_id,
            "Choices":[],
            "choicesobj" : [], 
            "isActive":true,
            "editmode" : false,
        });
    }

    $scope.turnoffaddmode = function(index){
        $scope.questions.splice(index,1);
    }

    $scope.insert = function(obj){
        var questionresource = new questionResource();
        questionresource.questionobj = {
            "_id":0,
            "Question":obj.Question,
            "Subject_id":obj.Subject_id,
            "Choices":obj.Choices,
            "isActive":obj.isActive
        };
        console.log(obj.choicesobj);
        questionresource.choicesobj = obj.choicesobj;
        questionresource.$add(function(data){
            console.log(data);
            if(data.success){
                // $("#modal-add").modal('hide');
                $scope.init();

            }
        });
    };
    


    $scope.updatedid = "";
    $scope.btnUpdateClick = function(obj){
        obj.editmode = true;
        // $scope.QuestionObj._id = id;
        // $("#modal-update").modal('show');
        // questionresource.$getbyId({_id:id},function(data){
        //     $scope.QuestionObj.question = data.Obj.Question;
        // });
    }

    $scope.turnoffeditmode = function(obj){
        obj.editmode = false;    
    }

    $scope.UpdateClick = function(obj)
    {
        // $("#modal-update").modal('hide');
        questionresource._id = obj._id;
        questionresource.question = obj.Question;
        questionresource.$update(function(data)
        {
            $scope.init();
        });
    }
    
    $scope.btnDeleteClick = function(_id){
        $("#modal-delete").modal('show');
        $scope.QuestionObj._id=_id;
    }    

    $scope.deleteClick = function(){
        $("#modal-delete").modal('hide');
        
        questionresource._id = $scope.QuestionObj._id;
        questionresource.Subject_id = $scope.subject_id;
        questionresource.$delete(function(data)
        {
            if(data.success)
            {
                $scope.init();
                
            }
        });
    }

    $scope.btnQuestionsClick =function(_id, question){
        $rootScope.openchoices = true;
        passingdataservice.addObj = {"_id":_id, "question":question, "Subject_id":$scope.subject_id, "subjectName":$scope.subjectName, "openchoices":true};
        
        // $state.go('choices-index');
    }

    $scope.btnBackClick =function(){
        $state.go('subject-index');
    }

    $scope.addchoices = function(obj){
        // obj.choiceobj = [];
        obj.choicesobj.push({"_id":obj.choicesobj.length + 1,'ChoicesName':"", 'isCorrectAnswer':false, 'isActive':true, 'Questions_id':obj._id});

    }
});
app.controller('questioncontroller', function ($scope, $state, questionResource) {

    var questionresource = new questionResource();
    $scope.questions =[];

$scope.init = function(){
        questionresource.$init({}, function(data){

            $scope.questions = data.Obj;
            console.log($scope.questions);
            console.log(data.Obj);

        });
    }
    $scope.init();

    


    $scope.QuestionObj = {'_id':"",'question':""};
    $scope.insert = function(){
        $scope.QuestionObj = {'_id':"",'question':""};
        // questionresource._id = $scope.QuestionObj._id;
        questionresource.Question = $scope.QuestionObj.question;
        questionresource.$add(function(data){
            if(data.success){
                $("#modal-add").modal('hide');
                $scope.init();

            }
        });
    };
    
    $scope.btnAddClick = function(id){
            $("#modal-add").modal('show');
    }

    $scope.updatedid = "";
    $scope.btnUpdateClick = function(id){
        $scope.QuestionObj._id = id;
        $("#modal-update").modal('show');
        questionresource.$getbyId({_id:id},function(data){
            $scope.QuestionObj.question = data.Obj.Question;
        });
    }
    $scope.UpdateClick = function()
    {
        $("#modal-update").modal('hide');
        questionresource._id = $scope.QuestionObj._id;
        questionresource.question = $scope.QuestionObj.question;
        questionresource.$update(function(data)
        {
            // $scope.initSubject = [];
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
        questionresource.$delete(function(data)
        {
            if(data.success)
            {
                $scope.init();
                
            }
        });
    }




    
});
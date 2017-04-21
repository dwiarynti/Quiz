app.controller('choicescontroller', function ($scope, $state, choicesResource, passingdataservice) {

    var choicesresource = new choicesResource();
    $scope.choices =[];
    $scope.question_id =passingdataservice.addObj._id;
    $scope.question =passingdataservice.addObj.question;

    $scope.init = function(){
        console.log(passingdataservice.addObj)
            choicesresource.$init({_id:$scope.question_id}, function(data){
                $scope.choices = data.Obj;
            });
    }
    
    $scope.init();

    $scope.choicesObj = {'_id':"",'choices':""};

    $scope.btnAddClick = function(id){
        $scope.choicesObj = {'_id':"",'choices':""};
        $("#modal-add").modal('show');
    }

    $scope.insert = function(){
        // $scope.choicesObj = {'_id':"",'choices':""};
        var choicesresource = new choicesResource();
        // choicesresource._id = $scope.choicesObj._id;
        choicesresource.Subject_id = $scope.question_id;
        choicesresource.choices = $scope.choicesObj.choices;
        // console.log(choicesresource);
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
            $scope.choicesObj.choices = data.Obj.choices;
        });
    }
    $scope.UpdateClick = function()
    {
        $("#modal-update").modal('hide');
        choicesresource._id = $scope.choicesObj._id;
        choicesresource.choices = $scope.choicesObj.choices;
        choicesresource.$update(function(data)
        {
            // $scope.initSubject = [];
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
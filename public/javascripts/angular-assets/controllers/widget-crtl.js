app.controller('widgetcontroller', function ($scope, $rootScope, $state, $filter, widgetResource) {
    var widgetresource = new widgetResource();
    $scope.widgetlist=[];
    $scope.init = function(){
        angular.forEach($rootScope.setting.widgetlist,function(item) {
            item.editmode = false;
        });
        $scope.widgetlist = $rootScope.setting.widgetlist;
    }
    $scope.init();

    $scope.btnUpdateClick = function(obj)
    {
        obj.editmode = true;
    }

    $scope.UpdateClick = function(obj)
    {
        widgetresource._id = obj._id;
        widgetresource.isActive = obj.isActive;
        widgetresource.$update(function(data)
        {
            obj.editmode = false;
            if(data.success){
                angular.forEach($rootScope.setting.widgetlist,function(item) {
                    item.isActive = item.WidgetName == obj.WidgetName ? obj.isActive: item.isActive;                
                });
            }

        });
    }
    $scope.turnoffeditmode = function(obj){
        obj.editmode = false;    
    }
});
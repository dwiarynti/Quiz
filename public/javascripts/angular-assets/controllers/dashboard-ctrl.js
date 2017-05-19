app.controller('dashboardadmincontroller', function ($scope, $rootScope, $state, $filter, $localStorage, $compile, $element,configurationformResource, passingdataservice) {

    $scope.gridsterOpts = {
                columns: 12,
                margins: [20, 20],
                outerMargin: false,
                pushing: true,
                floating: false,
                swapping: false
            };

    $scope.widgets = $localStorage.widgets || [
        {
                        title: 'Temperature',
                        settings: {
                            sizeX: 3,
                            sizeY: 3,
                            minSizeX: 2,
                            minSizeY: 2,
                            // template: '<wwa-temperature></wwa-temperature>',
                            template: $element.append('<div class="wwa-temperature-widget">test</div>'),
                            // widgetSettings: {
                            //     id: 1000,
                            //     templateUrl: 'app/dialogs/wwaSelectLocationTemplate.html',
                            //     controller: 'wwaSelectLocationController'
                            // }
                        }
                    },
                    {
                        title: 'Inventory',
                        settings: {
                            sizeX: 5,
                            sizeY: 3,
                            minSizeX: 2,
                            minSizeY: 2,
                            // template: '<wwa-inventory></wwa-inventory>',
                            template: '<div>test</div>',                            
                            // widgetSettings: {
                            //     id: 1002,
                            //     templateUrl: 'app/dialogs/wwaSelectLocationTemplate.html',
                            //     controller: 'wwaSelectLocationController'
                            // }
                        }
                    },
                    {
                        title: 'Employee',
                        settings: {
                            sizeX: 5,
                            sizeY: 3,
                            minSizeX: 2,
                            minSizeY: 2,
                            // template: '<wwa-employee></wwa-employee>',
                            template: '<div>test</div>',                            
                            // widgetSettings: {
                            //     id: 5000,
                            //     templateUrl: 'app/dialogs/wwaSelectEmployeeTemplate.html',
                            //     controller: 'wwaSelectEmployeeController'
                            // }
                        }
                    }
    ];


            $scope.$watch('widgets', function () {
                $localStorage.widgets = $scope.widgets;
            }, true);

});

app.controller('dashboardusercontroller', function ($scope, $rootScope, $state, $filter, $localStorage, configurationformResource, passingdataservice) {
        $scope.gridsterOpts = {
                columns: 12,
                margins: [20, 20],
                outerMargin: false,
                pushing: false,
                floating: false,
                swapping: false,
                resizable: {
                    enabled: false
                    },
                draggable: {
                    enabled: false
                    }
            };
        $scope.widgets = $localStorage.widgets;
        // $scope.$watch($localStorage.widgets, function () {
        //         // $localStorage.widgets = $scope.widgets;
        //     }, true);
});
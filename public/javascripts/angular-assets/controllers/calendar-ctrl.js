app.controller('calendarcontroller', function ($scope, $rootScope,$filter) {
  
    $calendar = $('[ui-calendar]');
    
    var date = new Date(),
      d = date.getDate(),
      m = date.getMonth(),
      y = date.getFullYear();

    
    $scope.changeView = function(view){      
       $calendar.fullCalendar('changeView',view);
    };
    
    $scope.changeView('month');
    /* config object */
    $scope.uiConfig = {
      calendar: {
        lang: 'eng',
        height: '100%',
        editable: true,
        header: {
          //left: 'month basicWeek basicDay',
          //center: 'title',
          right: 'prev,next'
        },
        eventClick: function(date, jsEvent, view) {
          $scope.alertMessage = (date.title + ' was clicked ');
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    $scope.events = [{
      title: 'All Day Event',
      start: new Date(y, m, 1)
    }, {
      title: 'Long Event',
      start: new Date(y, m, d - 5),
      end: new Date(y, m, d - 2)
    }, {
      id: 999,
      title: 'Repeating Event',
      start: new Date(y, m, d - 3, 16, 0),
      allDay: false
    }, {
      id: 999,
      title: 'Repeating Event',
      start: new Date(y, m, d + 4, 16, 0),
      allDay: false
    }, {
      title: 'Birthday Party',
      start: new Date(y, m, d + 1, 19, 0),
      end: new Date(y, m, d + 1, 22, 30),
      allDay: false
    }, {
      title: 'Click for Google',
      start: new Date(y, m, 28),
      end: new Date(y, m, 29),
      url: 'http://google.com/'
    }];

    $scope.eventSources = [$scope.events];

    $scope.showWidget = function(widgetname){
        var result = false;
        if($rootScope.setting.isAuthenticated && $rootScope.setting.widgetlist.length != 0){
            result = $filter('filter')($rootScope.setting.widgetlist,function(item){
                return item.WidgetName === widgetname
            })[0].isActive;
        }
        return result;
    }

});

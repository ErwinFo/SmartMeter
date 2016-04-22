(function () {
    'use strict';

    angular
        .module('smartmeter.datepicker', [])
        .controller('DatePicker', DatePicker, ['$scope']);

    function DatePicker($scope) {

        $scope.beforeRender = function ($view, $dates, $leftDate, $upDate, $rightDate) {
            
            
            console.log($upDate);
            // for (var i = 0 ; i < $dates.length; i++){
            //     if($dates[i].active === true){
            //         console.log($dates[i]);
            //     }
            // }
        }
    }
})();
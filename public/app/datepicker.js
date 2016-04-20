(function () {
    'use strict';

    angular
        .module('smartmeter.datepicker', [])
        .controller('DatePicker', DatePicker, ['$scope']);

    function DatePicker($scope) {

        $scope.beforeRender = function ($view, $dates, $leftDate, $upDate, $rightDate) {
            
            console.log($view);
        }
    }
})();
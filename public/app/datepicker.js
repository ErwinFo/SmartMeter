(function() {
    'use strict';

    angular
        .module('smartmeter.datepicker', [])
        .controller('DatePicker', DatePicker, ['$scope']);

    function DatePicker($scope) {
        var vm = this;
        
        $scope.beforeRender = function(date, $view, $dates, $leftDate, $upDate, $rightDate) {
            console.log(date);
            vm.date = date;
            vm.upDate = $upDate;

        }
    }
})();
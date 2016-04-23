(function () {
    'use strict';

    angular
        .module('smartmeter.datepicker', [])
        .controller('DatePicker', DatePicker, ['$scope']);

    function DatePicker($scope) {
        var vm = this; 

        $scope.beforeRender = function (date, $view, $dates, $leftDate, $upDate, $rightDate) {

            vm.selectedDay;
            vm.upDate;
            vm.date;

            if (date === undefined) {
                vm.upDate = $upDate.display;

            } else if (date != undefined && $upDate.display === vm.upDate) {
                
                vm.upDate = null;
                vm.selectedDay = date;

            } else if ($upDate.display != vm.upDate) {
                
                vm.selectedDay = null;
                vm.upDate = $upDate.display;
            }

            if(vm.upDate != null){
                
                var year = parseInt($upDate.display.substring(0, 4));
                var month;
                var dateString;
                             
                if (vm.upDate.length === 4) {
                    dateString = year + '-01' + '-01';
                    console.log(vm.upDate + ':' + dateString);
                } else if (vm.upDate.length === 8) {
                    month = $upDate.display.substring(5, 8);
                    dateString = year + '-' + month + '-01';   
                }
                vm.date = new Date(dateString);
            } else {
                vm.date = vm.selectedDay;
            }
        }
    }
})();

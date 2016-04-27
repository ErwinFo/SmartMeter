(function () {
    'use strict';

    angular
        .module('smartmeter.datepicker', [])
        .controller('DatePicker', DatePicker, ['$scope','$rootScope']);

    function DatePicker($scope) {

        var vm = this;
        $scope.beforeRender = function (date, $view, $dates, $leftDate, $upDate, $rightDate) {

            vm.activeDate = false;
            vm.date;

            for (var i = 0; i < $dates.length; i++) {
                if ($dates[i].active) {
                    vm.activeDate = true;
                    vm.date = new Date($dates[i].utcDateValue);
                    break;
                }
            }
            if (vm.activeDate) {
                console.log(vm.date);
            } else {
                var year = parseInt($upDate.display.substring(0, 4));
                var month;
                var dateString;
                if ($upDate.display.length === 4) {
                    dateString = year + '-01' + '-01';
                } else if ($upDate.display.length === 8) {
                    month = $upDate.display.substring(5, 8);
                    dateString = year + month + '-01';
                }
                vm.date = new Date(dateString);
            }
        }

        $scope.$emit('someEvent', args);
    }
})();

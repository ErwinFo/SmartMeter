(function () {
    'use strict';

    angular
        .module('smartmeter.datepicker', [])
        .controller('DatePicker', DatePicker, ['$scope', '$rootScope', 'NotifyService']);

    function DatePicker($scope, $rootScope, NotifyService) {

        var vm = this;
        $scope.beforeRender = function (date, $view, $dates, $leftDate, $upDate, $rightDate) {

            vm.date;

            var year = parseInt($upDate.display.substring(0, 4));
            var month;
            var dateString;
            var monthNumber;

            if ($upDate.display.length === 4) {
                vm.date = year;
            } else if ($upDate.display.length === 8) {
                month = $upDate.display.substring(5, 8);
                dateString = year + month + '-01';
                var date = new Date(dateString);
                
                monthNumber = String(date.getMonth() + 1);
                if (monthNumber.length < 2) {
                    monthNumber = '0' + String(monthNumber);
                }
                vm.date = year + '-' + monthNumber;
            }

            for (var i = 0; i < $dates.length; i++) {
                if ($dates[i].active) {

                    var prefix = '-';
                    if ($dates[i].display.length < 2) {
                        prefix += '0';  
                    } 
                    vm.date = vm.date + prefix + $dates[i].display;
                    console.log('check for fix' + vm.date);
                    break;
                }
            }
            // console.log('vm.date: ' + vm.date);
            NotifyService.addDate(vm.date);
            NotifyService.notify($scope, function somethingChanged(data) { });
        }
    }
})();

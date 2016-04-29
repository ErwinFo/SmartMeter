(function () {
    'use strict';

    angular
        .module('smartmeter.datepicker', [])
        .controller('DatePicker', DatePicker, ['$scope', '$rootScope', 'NotifyService']);

    function DatePicker($scope, $rootScope, NotifyService) {

        var vm = this;
        $scope.beforeRender = function (date, $view, $dates, $leftDate, $upDate, $rightDate) {

            vm.date;
            var activeDate = false;
            var year = parseInt($upDate.display.substring(0, 4));
            var month;
            var day;
            var dateString;

            // If there is no activeDate
            if ($upDate.display.length === 4) {
                dateString = year;
                vm.date = dateString;
            } else if ($upDate.display.length === 8) {

                month = $upDate.display.substring(5, 8);
                dateString = year + '-' + month;
                month = getMonthNumber(month, dateString);

                vm.date = year + '-' + month;
            }

            // If there is an activeDate
            for (var i = 0; i < $dates.length; i++) {
                if ($dates[i].active) {
                    if ($dates[i].display.length === 4) {

                        vm.date = $dates[i].display;

                    } else if ($dates[i].display.length === 3) {

                        month = $dates[i].display;
                        dateString = year + '-' + month;
                        month = getMonthNumber(month, dateString);

                        vm.date = year + '-' + month;
                    } else {

                        month = $upDate.display.substring(5, 8);
                        dateString = year + '-' + month + '-' + $dates[i].display;
                        month = getMonthNumber(month, dateString);

                        var prefix = '-';
                        if ($dates[i].display.length < 2) {
                            prefix += '0';
                        }
                        vm.date = year + '-' + month + prefix + $dates[i].display;
                    }
                    break;
                }
            }
            console.log('vm.date: ' + vm.date);
            NotifyService.addDate(vm.date);
            NotifyService.notify($scope, function somethingChanged(data) { });
        }

        function getMonthNumber(month, dateString) {

            var date = new Date(dateString);
            var monthNumber = String(date.getMonth() + 1);

            if (monthNumber.length < 2) {
                monthNumber = '0' + String(monthNumber);
            }
            return monthNumber
        }
    }
})();

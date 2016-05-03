(function () {
    'use strict';

    angular.module('smartmeter')
        .controller('datepickerController', datepickerController);

    datepickerController.$inject = ['$scope', '$rootScope', 'selectedDate.service'];

    function datepicker($scope, $rootScope, selecteddateservice) {

        var vm = this;
        vm.beforeRender = beforeRender;

        function beforeRender (date, $view, $dates, $leftDate, $upDate, $rightDate) {

            var activeDate = false,
                year = parseInt($upDate.display.substring(0, 4)),
                month,
                day,
                dateString,
                newDate;

            // If there is no activeDate
            if ($upDate.display.length === 4) {
                newDate = year;
            } else if ($upDate.display.length === 8) {

                month = $upDate.display.substring(5, 8);
                dateString = year + '-' + month;
                month = getMonthNumber(month, dateString);

                newDate = year + '-' + month;
            }

            // If there is an activeDate
            for (var i = 0; i < $dates.length; i++) {
                if ($dates[i].active) {
                    if ($dates[i].display.length === 4) {

                        newDate = $dates[i].display;

                    } else if ($dates[i].display.length === 3) {

                        month = $dates[i].display;
                        dateString = year + '-' + month;
                        month = getMonthNumber(month, dateString);

                        newDate = year + '-' + month;
                    } else {

                        month = $upDate.display.substring(5, 8);
                        dateString = year + '-' + month + '-' + $dates[i].display;
                        month = getMonthNumber(month, dateString);

                        var prefix = '-';
                        if ($dates[i].display.length < 2) {
                            prefix += '0';
                        }
                        newDate = year + '-' + month + prefix + $dates[i].display;
                    }
                    break;
                }
            }
            console.log('vm.date: ' + newDate);

            selecteddateservice.addDate(newDate);
            selecteddateservice.notify($scope, function somethingChanged(data) { });
        }

        function getMonthNumber(month, dateString) {

            var date = new Date(dateString),
                monthNumber = String(date.getMonth() + 1);

            if (monthNumber.length < 2) {
                monthNumber = '0' + String(monthNumber);
            }
            return monthNumber;
        }
    }
})();

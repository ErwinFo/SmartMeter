(function () {
    'use strict';

    angular
        .module('smartmeter.datepicker', [])
        .controller('DatePicker', DatePicker, ['$scope']);

    function DatePicker($scope) {
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.options = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function () {
            $scope.options.minDate = $scope.options.minDate ? null : new Date();
        };

        $scope.toggleMin();

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date(tomorrow);
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';


        }
    }
    })();

// $scope.beforeRender = function (date, $view, $dates, $leftDate, $upDate, $rightDate) {

//             if (date != undefined) {
//                 vm.date = date;
//                 console.log(date);
//             }
//             console.log($upDate.display);
//         }
// vm.selectedDay;
//             vm.upDate;
//             vm.date;
//  if (date === undefined) {
//                 vm.upDate = $upDate.display;
//             } else if (date != undefined && date != vm.selectedDay) {
//                 vm.selectedDay = date;
//                 vm.upDate = $upDate.display;  
//             } else if($upDate.display != vm.upDate){
//                 // vm.upDate = $upDate.display;
//                 vm.selectedDay = null;
//             }

//             // all good
//             if(vm.upDate != null && vm.selectedDay === undefined || vm.selectedDay === null){

//                 var year = parseInt($upDate.display.substring(0, 4));
//                 var month;
//                 var dateString;

//                 if (vm.upDate.length === 4) {
//                     dateString = year + '-01' + '-01';
//                     // console.log(vm.upDate + ':' + dateString);
//                 } else if (vm.upDate.length === 8) {
//                     month = $upDate.display.substring(5, 8);
//                     dateString = year  + month + '-01';   
//                     // console.log(dateString);
//                 }

//                 vm.date = new Date(dateString);

//             } else {

//                 vm.date = vm.selectedDay;
//             }
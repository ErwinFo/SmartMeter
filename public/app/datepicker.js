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
            } else if (date != undefined && date != vm.selectedDay) {
                vm.selectedDay = date;
                vm.upDate = $upDate.display;
                vm.date = vm.selectedDay;
            } else if ($upDate.display != vm.upDate) {
                console.log('vm.upDate: ' + vm.upDate);
                // vm.upDate = $upDate.display;
                vm.selectedDay = null;

                var year = parseInt($upDate.display.substring(0, 4));
                var month;
                var dateString;

                var activeDate;
                for(var i = 0 ; i < $dates.length ; i++){
                    if($dates[i].active){
                        console.log($dates[i].active + '' + $dates[i].display);
                        activeDate = true;
                    }else{
                        activeDate = false;
                    }
                }
                if(active){
                    if (vm.upDate.length === 4) {
                    dateString = year + '-01' + '-01';
                    // console.log(vm.upDate + ':' + dateString);
                } else if (vm.upDate.length === 8) {
                    month = $upDate.display.substring(5, 8);
                    dateString = year + month + '-01';
                    // console.log(dateString);
                }
                } else {
                    
                }
                

                vm.date = new Date(dateString);


            }

        }
    }
})();
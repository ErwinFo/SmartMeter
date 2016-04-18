(function() {
    'use strict';

    angular
        .module('smartmeter.yearpicker', [])
        .controller('YearPicker', YearPicker, ['$http']);

    /* @ngInject */
    // Make Service instead of using directly with Controller
    function YearPicker($http) {

        var vm = this;
        vm.years = [];

        $http.get("http://192.168.1.100:3000/availabledata")
            .then(function(response) {
                var firstDate = new Date(response.data.firstRecord.dateTime).getFullYear();
                var lastDate = new Date(response.data.lastRecord.dateTime).getFullYear();

                var numberOfYears = lastDate - firstDate;

                for (var i = firstDate; i <= lastDate; i++) {
                    vm.years.push(i);
                }

            }, function(response) {
                console.log('Bad');
                vm.records = "something went wrong";
            });
    }

})();
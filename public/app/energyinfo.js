(function () {
    'use strict';

    angular
        .module('smartmeter.energyinfo', [])
        .controller('EnergyInfo', energyinfo, ['$http', '$scope', 'selecteddateservice']);

    /* @ngInject */
    // Make Service instead of using directly with Controller
    function energyinfo($http, $scope, selecteddateservice) {
        var vm = this;

        selecteddateservice.subscribe($scope, function somethingChanged() {

            // Handle notification
            // var dal = 0.17293; // T1 daltarief 181 
            // var piek = 0.18743; // T2 piektarief 182
            // var gasCost = 0.63644 // per m3

            vm.dailyTotals = [];
            vm.measurements = [];

            vm.date = selecteddateservice.getDate();
            vm.title = 'dailyTotals';

            console.log(vm.date);

            $http.get("http://192.168.1.100:3000/calculatedmeasurement/" + vm.date)
                .then(function (response) {
                    //First function handles success
                    vm.dailyTotals = response.data.consumption;
                }, function (response) {
                    console.log(response);
                    //Second function handles error
                    vm.dailyTotals = "something went wrong";
                });

            // 2016-05-08   => 10
            // 2016-05      => 7
            // 2016         => 4

            var date = vm.date.toString();

            $http.get("http://192.168.1.100:3000/measurements/" + vm.date)
                .then(function (response) {
                    //First function handles success
                    vm.measurements = response.data;
                }, function (response) {
                    console.log('Bad');
                    //Second function handles error
                    vm.measurements = "something went wrong";
                });
        });
    }

    function getTodayAsDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        return today = yyyy + '-' + mm + '-' + dd;
    }
})();

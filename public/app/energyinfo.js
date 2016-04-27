(function () {
    'use strict';

    angular
        .module('smartmeter.energyinfo', [])
        .controller('EnergyInfo', EnergyInfo, ['$http', '$scope', 'dateservice', 'notifyservice']);

    /* @ngInject */
    // Make Service instead of using directly with Controller
    function EnergyInfo($http, $scope, NotifyService) {
        NotifyService.subscribe($scope, function somethingChanged() {
            // Handle notification
            console.log('NotifyService notification');
        });
       
        var dal = 0.17293; // T1 daltarief 181 
        var piek = 0.18743; // T2 piektarief 182
        var gasCost = 0.63644 // per m3

        var vm = this;
        vm.measurement = [];
        vm.date = $scope.date;
        vm.title = 'Measurement';

        $http.get("http://192.168.1.100:3000/calculatedmeasurement/2016-04-04")
            .then(function (response) {
                //First function handles success
                vm.measurement = response.data.consumption;

            }, function (response) {
                console.log('Bad');
                //Second function handles error
                vm.measurement = "something went wrong";
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

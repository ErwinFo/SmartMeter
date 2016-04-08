(function() {
    'use strict';

    angular
        .module('smartmeter.energyinfo',[])
        .controller('EnergyInfo', EnergyInfo, ['$http']);

    /* @ngInject */
    // Make Service instead of using directly with Controller
    function EnergyInfo($http) {

        var dal = 0.17293; // T1 daltarief 181 
        var piek = 0.18743; // T2 piektarief 182
        var gasCost = 0.63644 // per m3

        var vm = this;
        vm.measurement = [];
        vm.title = 'Measurement';

        $http.get("http://raspberrypi.local:3000/calculatedmeasurement/2016-04-04")
            .then(function(response) {
                console.log('Good');
                //First function handles success
                vm.measurement = response.data.consumption;
                console.log('asd');
                console.log(vm.measurement);
                
            }, function(response) {
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
        if(dd < 10) {
            dd = '0' + dd
        }
        if(mm < 10) {
            mm = '0' + mm
        }
        return today = yyyy + '-' + mm + '-' + dd;
    }

})();
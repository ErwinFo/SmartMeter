(function() {
    'use strict';

    angular
        .module('app.energyinfo')
        .controller('EnergyInfo', EnergyInfo, ['$http']);

    /* @ngInject */
    // Make Service instead of using directly with Controller
    function EnergyInfo($http) {

        var dal = 0.17293; // T1 daltarief 181 
        var piek = 0.18743; // T2 piektarief 182
        var gasCost = 0.63644 // per m3

        var energyInfo = this;
        var today = getTodayAsDate();
        var url = 'http://192.168.1.127:3000/measurements/' + today;

        $http.get(url).success(function(data) {

            energyInfo = data.slice().reverse();
            
            console.log(energyInfo);
            console.log('181: ' + energyInfo[0].meter181kWh);
            console.log('182: ' + energyInfo[0].meter182kWh);
            // if(data){
            //     var test = data;
            // }
        })
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

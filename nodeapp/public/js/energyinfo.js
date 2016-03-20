(function() {
    'use strict';

    angular
        .module('app.energyinfo')
        .controller('EnergyInfo', EnergyInfo, ['$http']);

    /* @ngInject */
    // Make Service instead of using directly with Controller
    function EnergyInfo($http) {

        var today = getTodayAsDate();
        var url = 'http://192.168.1.127:3000/measurements/' + today;

        $http.get(url).success(function(data) {
            console.log(data);

            var test = data[0].dateElectric;

            console.log(test);
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

/*
{  
    "dateElectric":1458375260000,
    "deviceElectric":"4530303034303031353733393431363134",
    "meter181kWh":"001758.022",
    "meter281kWh":"000000.000",
    "meter182kWh":"002222.679",
    "meter282kWh":"000000.000",
    "tariff":1,
    "powerDeliveredKw":"04.156",
    "powerReceivedKw":"00.000",
    "powerFailures":2,
    "powerFailuresLong":0,
    "deviceGas":4.7303032333536313e+33,
    "dateGas":1458374400000,
    "gasMeasurementm3":"03390.822",
    "date":"2016-03-19T00:00:00.000Z",
    "_id":"56ecfc3ec1751d5753b0aa4d",
    "__v":0
}
*/
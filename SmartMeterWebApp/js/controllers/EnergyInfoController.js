(function() {
    'use strict';

    angular.module('smartMeter')
        .controller('EnergyInfoController', ['$scope', '$http', function($scope, $http) {
            var energyInfo = this;

            var dal = 0.17293; // T1 daltarief 181 
            var piek = 0.18743; // T2 piektarief 182
            var gasCost = 0.63644 // per m3

            var today = getTodayAsDate();
            $scope.today = today;
            var urlEnergy = url + "ConvertMeterReading/listEnergy/";
            var json = "?callback=JSON_CALLBACK";
            var resultEnergy = urlEnergy.concat(today, json);

            /* 
            dateElectric, deviceElectric, 
            meter181, meter281, meter182, meter282 
            tarif, powerDelivered, powerReceived, powerFailures
            longPowerFailures, deviceGas, dateGas,  gasMeasurement

            Meter Reading electricity delivered to client (Tariff 1)    1-0:1.8.1
            Meter Reading electricity delivered by client (Tariff 1)    1-0:2.8.1
            Meter Reading electricity delivered to client (Tariff 2)    1-0:1.8.2
            Meter Reading electricity delivered by client (Tariff 2)    1-0:2.8.2
            */
            $http.jsonp(resultEnergy).success(function(data) {
                // Number of measurements
                energyInfo.energyMeasurements = data.energyMeasurement.slice().reverse();

                energyInfo.meter181First = data.energyMeasurement[0].meter181kWh;
                energyInfo.meter181Last = data.energyMeasurement[data.energyMeasurement.length - 1].meter181kWh;
                energyInfo.meter181Result = energyInfo.meter181Last - energyInfo.meter181First;
                energyInfo.meter181Cost = energyInfo.meter181Result * dal;

                // energyInfo.meter281First = data.energyMeasurement[0].meter281;
                // energyInfo.meter281Last = data.energyMeasurement[data.energyMeasurement.length - 1].meter281;
                // energyInfo.meter281Result = energyInfo.meter281Last - energyInfo.meter281First;

                energyInfo.meter182First = data.energyMeasurement[0].meter182kWh;
                energyInfo.meter182Last = data.energyMeasurement[data.energyMeasurement.length - 1].meter182kWh;
                energyInfo.meter182Result = energyInfo.meter182Last - energyInfo.meter182First;
                energyInfo.meter182Cost = energyInfo.meter182Result * piek;

                // energyInfo.meter282First = data.energyMeasurement[0].meter282;
                // energyInfo.meter282Last = data.energyMeasurement[data.energyMeasurement.length - 1].meter282;
                // energyInfo.meter282Result = energyInfo.meter282Last - energyInfo.meter282First;

                energyInfo.gasMeasurementFirst = data.energyMeasurement[0].gasMeasurementm3;
                energyInfo.gasMeasurementLast = data.energyMeasurement[data.energyMeasurement.length - 1].gasMeasurementm3;
                energyInfo.gasMeasurementResult = energyInfo.gasMeasurementLast - energyInfo.gasMeasurementFirst;
                energyInfo.gasMeasurementCost = energyInfo.gasMeasurementResult * gasCost;

                energyInfo.totalCost = energyInfo.meter181Cost + energyInfo.meter182Cost + energyInfo.gasMeasurementCost;

            });

        }]);
})();
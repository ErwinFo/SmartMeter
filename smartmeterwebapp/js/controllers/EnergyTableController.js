(function() {

    'use strict';

    angular.module('smartMeter')
    .controller('EnergyTableController', ['$scope', '$http', function($scope, $http) {

    
    var energyTableInfo = this;
    energyTableInfo.measurement = [];

    var dal = 0.17293; // T1 daltarief 181 
    var piek = 0.18743; // T2 piektarief 182
    var gasCost = 0.63644; // per m3

    var today = getTodayAsDate();
    $scope.today = today;

    var urlEnergy = url + "ConvertMeterReading/listEnergy/";
    var listOfDates = url + "ConvertMeterReading/listOfDates/";

    var json = "?callback=JSON_CALLBACK";
    var resultDates = listOfDates.concat(json);

    

    $http.jsonp(resultDates).success(function(data) {

        console.log("listOfDates" + listOfDates);
        console.log("result" + resultDates);
        
        energyTableInfo.dates = data.dateObject;
        
        // Dates
        for (var i = 0; i < energyTableInfo.dates.length; i++) {

            var dateString = String(energyTableInfo.dates[i].date)
            energyTableInfo.dateRecord = urlEnergy.concat(dateString.substring(0, 10), json);

            // Measurement on Date
            $http.jsonp(energyTableInfo.dateRecord).success(function(data) {

                energyTableInfo.date = data.energyMeasurement[0].date;

                energyTableInfo.meter181First = data.energyMeasurement[0].meter181kWh;
                energyTableInfo.meter181Last = data.energyMeasurement[data.energyMeasurement.length - 1].meter181kWh;
                energyTableInfo.meter181Result = energyTableInfo.meter181Last - energyTableInfo.meter181First;
                energyTableInfo.meter181Cost = energyTableInfo.meter181Result * dal;

                // energyInfo.meter281First = data.energyMeasurement[0].meter281;
                // energyInfo.meter281Last = data.energyMeasurement[data.energyMeasurement.length - 1].meter281;
                // energyInfo.meter281Result = energyInfo.meter281Last - energyInfo.meter281First;

                energyTableInfo.meter182First = data.energyMeasurement[0].meter182kWh;
                energyTableInfo.meter182Last = data.energyMeasurement[data.energyMeasurement.length - 1].meter182kWh;
                energyTableInfo.meter182Result = energyTableInfo.meter182Last - energyTableInfo.meter182First;
                energyTableInfo.meter182Cost = energyTableInfo.meter182Result * piek;

                // energyInfo.meter282First = data.energyMeasurement[0].meter282;
                // energyInfo.meter282Last = data.energyMeasurement[data.energyMeasurement.length - 1].meter282;
                // energyInfo.meter282Result = energyInfo.meter282Last - energyInfo.meter282First;

                energyTableInfo.gasMeasurementFirst = data.energyMeasurement[0].gasMeasurementm3;
                energyTableInfo.gasMeasurementLast = data.energyMeasurement[data.energyMeasurement.length - 1].gasMeasurementm3;
                energyTableInfo.gasMeasurementResult = energyTableInfo.gasMeasurementLast - energyTableInfo.gasMeasurementFirst;
                energyTableInfo.gasMeasurementCost = energyTableInfo.gasMeasurementResult * gasCost;

                energyTableInfo.totalCost = energyTableInfo.meter181Cost + energyTableInfo.meter182Cost + energyTableInfo.gasMeasurementCost;

                var shortDate = String(energyTableInfo.date)
                shortDate = shortDate.substring(0, 10);

                var measurement = new Measurement(shortDate, energyTableInfo.totalCost, energyTableInfo.meter181Cost, 
                    energyTableInfo.meter182Cost,energyTableInfo.gasMeasurementCost);

                energyTableInfo.measurement.push(measurement);

                console.log(measurement);

                energyTableInfo.measurement.sort(function(a,b){
                  // Turn your strings into dates, and then subtract them
                  // to get a value that is either negative, positive, or zero.
                  return new Date(b.date) - new Date(a.date);
                });
            });
        }
    }).
    error(function(data, status, headers, config) {
        console.log($scope.error + " " + data + " " + headers);
        console.log("asdasdasdasd");
        $scope.error = true;
         });
}]);



function Measurement(date, totalCost, meter181Cost, meter182Cost, gasMeasurementCost){
        this.date = date,
        this.totalCost = totalCost,
        this.meter181Cost = meter181Cost,
        this.meter182Cost = meter182Cost,
        this.gasMeasurementCost = gasMeasurementCost

    };
})();
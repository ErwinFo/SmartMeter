(function() {
    'use strict';
    angular.module('smartMeter')
        .controller('GasChartController', function($scope, $http) {

            var today = getTodayAsDate();
            var json = "?callback=JSON_CALLBACK";

            var urlEnergy = url + "ConvertMeterReading/listEnergy/";
            var resultEnergy = urlEnergy.concat(today, json);

            $http.jsonp(resultEnergy).success(function(data, status) {

                // Data used in Charts
                var measurements = [];
                var measurementDate = [];

                for (var i = data.energyMeasurement.length - 1; i > 0; i--) {

                    if (data.energyMeasurement[i].gasMeasurementm3 != 0.0) {
                        if (data.energyMeasurement[i - 1].gasMeasurementm3 != 0.0) {
                            var difference = data.energyMeasurement[i].gasMeasurementm3 - data.energyMeasurement[i - 1].gasMeasurementm3;

                            if (difference != 0) {
                                measurements.push(difference);

                                var hour = new Date(data.energyMeasurement[i].time).getHours();
                                var minute = (Math.round(new Date(data.energyMeasurement[i].time).getMinutes() / 15) * 15) % 60;

                                if (hour < 10) {
                                    hour = '0' + hour
                                }
                                if (minute < 10) {
                                    minute = '0' + minute
                                }

                                measurementDate.push(hour + ":" + minute);
                            }
                        }
                    }
                }

                measurements.reverse();
                measurementDate.reverse();

                // console.log(measurements);

                $scope.labels = measurementDate;
                $scope.series = ['m3'];
                $scope.data = [measurements];


                $scope.onClick = function(points, evt) {
                    console.log(points, evt);
                };
            });
        });
})();
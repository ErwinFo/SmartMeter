(function () {
	'use strict';

	angular.module('smartMeter')
	.controller('EnergyChartController', EnergyChartController);

	function EnergyChartController($scope, $http) {

		var today = getTodayAsDate();

		var json = "?callback=JSON_CALLBACK";

		var urlEnergy = url + "ConvertMeterReading/listEnergy/";
		var resultEnergy = urlEnergy.concat(today, json);

		$http.jsonp(resultEnergy).success(function (data, status) {

			// Data used in Charts
			var measurements = [];
			var measurementDate = [];

			for (var i = 0; i < data.energyMeasurement.length; i++) {
				measurements.push(parseInt(data.energyMeasurement[i].powerDeliveredKw)); //powerDelivered
			}

			for (var j = 0; j < data.energyMeasurement.length; j++) {
				var hour = new Date(data.energyMeasurement[j].time).getHours();
				var minute = (Math.round(new Date(data.energyMeasurement[j].time).getMinutes() / 15) * 15) % 60;

				if (hour < 10) {
					hour = '0' + hour
				}
				if (minute < 10) {
					minute = '0' + minute
				}
				measurementDate.push(hour + ":" + minute);
			}
			//measurements.reverse();
			//measurementDate.reverse();

			// console.log(measurements);

			$scope.labels = measurementDate;
			$scope.series = ['kW'];
			$scope.data = [measurements];

			$scope.onClick = function (points, evt) {
				console.log(points, evt);
			};
		});
	};
})();
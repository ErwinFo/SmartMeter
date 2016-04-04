(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {
        var isPrimed = false;
        var primePromise;

        var service = {        
            getMeasurements: getMeasurements,
            ready: ready
        };

        return service;

        function getMeasurements() {
            return $http.get('http://192.168.1.127:3000/measurements/2016-04-04')
                .then(getMeasurementsComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getMeasurements')(message);
                    $location.url('/');
                });

            function getMeasurementsComplete(data, status, headers, config) {
                return data.data[0].data.results;
            }
        }

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }

    }
})();
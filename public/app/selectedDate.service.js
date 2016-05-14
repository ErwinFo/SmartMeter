(function () {
    'use strict';

    angular.module('smartmeter')
        .factory('selecteDate.service', selectedDateService);

    selectedDateService.$inject = ['$rootScope'];

    function selectedDateService($rootScope) {

        var date;

        return {
            addDate: addDate,
            getDate: getDate,
            notify: notify,
            subscribe: subscribe
        };

        function subscribe (scope, callback) {
            var handler = $rootScope.$on('selecteddate-service-event', callback);
            scope.$on('$destroy', handler);
        }

        function notify () {
            $rootScope.$emit('selecteddate-service-event');
        }

        function addDate (newObj) {
            // console.log('In service addDate : ' + newObj);
            date = newObj;
        }

        function getDate () {
            // console.log('In service getDate: ' + date);
            return date;
        }


    }
})();

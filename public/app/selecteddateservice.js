(function () {
    'use strict';

    angular
        .module('smartmeter.selecteddateservice', [])
        .factory('SelectedDateService', SelectedDateService, ['$rootScope']);

    function SelectedDateService($rootScope) {

        var date;

        var subscribe = function (scope, callback) {
            var handler = $rootScope.$on('selecteddate-service-event', callback);
            scope.$on('$destroy', handler);
        };

        var notify = function () {
            $rootScope.$emit('notifying-service-event');
        };

        var addDate = function (newObj) {
            // console.log('In service addDate : ' + newObj);
            date = newObj;
        };

        var getDate = function () {
            // console.log('In service getDate: ' + date);
            return date;
        };
        
        return {
            subscribe: subscribe,
            notify: notify,
            getDate: getDate,
            addDate: addDate
        };
    }
})();

(function () {
    'use strict';

    angular
        .module('smartmeter.notifyservice', [])
        .factory('NotifyService', NotifyService, ['$rootScope']);

    function NotifyService($rootScope) {
        return {
            subscribe: function (scope, callback) {
                var handler = $rootScope.$on('notifying-service-event', callback);
                scope.$on('$destroy', handler);
            },

            notify: function () {
                $rootScope.$emit('notifying-service-event');
            }
        };
    }
})();

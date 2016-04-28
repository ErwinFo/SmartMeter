(function () {
    'use strict';

    angular
        .module('smartmeter.dateservice', [])
        .service('DateService', DateService, []);

    function DateService() {

        var date;

        var addDate = function (newObj) {
            date = newObj;
        };

        var getDate = function () {
            return date;
        };

        return {
            addDate: addDate,
            getDate: getDate
        };
    }
})();

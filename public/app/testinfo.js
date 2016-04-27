(function () {
    'use strict';

    angular
        .module('smartmeter.testinfo', [])
        .controller('TestInfo', TestInfo, ['$scope', '$rootScope']);

    function TestInfo($scope) {
        console.log('TestInfo');
        
        $scope.$on('someEvent', function(event, args) {});

    }
})();

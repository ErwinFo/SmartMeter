(function() {
    'use strict';

    angular
        .module('smartmeter.monthpicker', [])
        .controller('MonthPicker', MonthPicker, ['$scope']);

    /* @ngInject */
    // Make Service instead of using directly with Controller
    function MonthPicker($scope) {

        $scope.btns = [
            { label: "Jan", state: false },{ label: "Feb", state: false},{label: "Mar", state: false},
            { label: "Apr", state: false },{ label: "Mei", state: false},{label: "Jun", state: false},
            { label: "Jul", state: false },{ label: "Aug", state: false},{label: "Sep", state: false},
            { label: "Okt", state: false },{ label: "Nov", state: false},{label: "Dec", state: false}
        ];

        var previousState;
        $scope.toggle = function() {
            for (var i = 0; i < $scope.btns.length; i++) {
                $scope.btns[i].state = false
            }
            console.log(this.b.label);
            this.b.state = !this.b.state;
        };
    }
})();
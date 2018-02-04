var app = angular.module('myApp.headers', []);

app.controller('headersCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});
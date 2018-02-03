var app = angular.module('myApp.search', []);

app.controller('searchCtrl', function ($scope, HttpService) {

    $scope.search = {
        engine:'bing'
    };

    $scope.searchForData = function (key) {
        HttpService.searchKeyData(key, function (err, data) {
            if (!err) {
                alert('Success!')
            } else {
                console.log(err)
            }
        })
    }
});
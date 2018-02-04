var app = angular.module('myApp.home', []);

app.controller('homeCtrl', function ($scope, HttpService) {

    $scope.searched_data = [];
    $scope.images_data = [];


    HttpService.getAllSearchedData(function (err, data) {
        if (!err) {
            $scope.searched_data = data
        } else {
            console.log(err)
        }
    });

    $scope.getImageData = function (_id) {
        if (_id !== null) {
            HttpService.getRequestedData(_id, function (err, data) {
                if (!err) {
                    $scope.images_data = data
                } else {
                    console.log(err)
                }
            });
        }
    }
});
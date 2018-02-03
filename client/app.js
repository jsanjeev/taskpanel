var app = angular.module('myApp',
    [
        'ngRoute',
        'mainService',
        'myApp.headers',
        'myApp.home',
        'myApp.search'
    ]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html"
        })
        .when("/search", {
            templateUrl: "views/search.html"
        })
        .when("/list", {
            templateUrl: "views/list.html"
        })
        .otherwise({
            redirectTo: '/'
        });
});
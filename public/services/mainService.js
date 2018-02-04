var app = angular.module('mainService', []);

app.factory('apiSrv', function ($location) {
    var baseUrl = $location.protocol() + '://' + $location.host() + ':9000';
    var obj = this;
    this.path = function (url) {
        return baseUrl + url;
    };
    return obj;
});

app.service('HttpService', function ($http, apiSrv) {

    this.searchKeyData = function (key,callback) {
        $http.post(apiSrv.path('/api/common/search_images/'),key).then(function (resp) {
            if (resp.data.isError){
                callback(resp, null);
            }
            else {
                callback(null, resp.data.data);
            }
        }, function (err) {
            var res = {
                'status': false,
                'msg':err
            };
            callback(res,null);
        })
    };

    this.getAllSearchedData=function (callback) {
        $http.get(apiSrv.path('/api/common/get_searched_data/')).then(function (resp) {
            if (resp.data.isError){
                callback(resp, null);
            }
            else {
                callback(null, resp.data.data);
            }
        }, function (err) {
            var res = {
                'status': false,
                'msg':err
            };
            callback(res,null);
        })
    };

    this.getRequestedData=function (_id,callback) {
        $http.get(apiSrv.path('/api/docs/get_requested_data/?id='+_id)).then(function (resp) {
            if (resp.data.isError){
                callback(resp, null);
            }
            else {
                callback(null, resp.data.data);
            }
        }, function (err) {
            var res = {
                'status': false,
                'msg':err
            };
            callback(res,null);
        })
    };

    return this;
});

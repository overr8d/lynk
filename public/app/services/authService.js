// Authorization service, handles token operations, intercepts each req to attach the token
angular.module('authService', [])
    .factory('Auth', function ($http, $q, AuthToken) {
        var authFactory ={};
        authFactory.logOut = function () {
            AuthToken.setToken();
        };

        authFactory.isLoggedin = function () {
            if(AuthToken.getToken()){
                return true;
            } else {
                return false;
            }
        };

        authFactory.getUser = function () {
            if(AuthToken.getToken()){
                return $http.post('/api/me');
            } else {
                $q.reject({message: 'User has no token!'});
            }
        };
        return authFactory;
    })

    .factory('AuthInterceptor', function (AuthToken) {
        var interceptorFactory = {};
        interceptorFactory.request = function (config) {
            var token = AuthToken.getToken();
            if(token){
                config.headers['x-access-token'] = token;
            }
            return config;
        };
            return interceptorFactory;
    })
    
    .factory('AuthToken', function ($window) {
        var authTokenFactory = {};
        authTokenFactory.setToken = function (token) {
            if(token){
                $window.localStorage.setItem('token', token);
            } else {
                $window.localStorage.removeItem('token');
            }
        };

        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        return authTokenFactory;
    });
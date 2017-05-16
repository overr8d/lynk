// Main controller for app, determines each route change if the user is logged in, also orchestrate login and logout operations
angular.module('mainController',['authService'])
    .controller('loginController',function (Auth, AuthToken, $http, $timeout, $location, $rootScope) {
        var app = this;

        $rootScope.$on('$routeChangeStart', function () {
            if(Auth.isLoggedin()){
                app.isLoggedin = true;
                Auth.getUser().then(function (data) {
                    app.email = data.data.email;
                });
            } else {
                app.isLoggedin = false;
                app.email = '';
            }
        });

        this.doLogin = function () {
            app.errorMsg = false;
            $http.post('/api/login', app.data).then(function(data) {
                AuthToken.setToken(data.data.token);
                if(data.data.success){
                    app.successMsg = data.data.message;
                    $timeout(function() {
                        $location.path("/dashboard");
                        app.data = {};
                        app.successMsg = false;
                    }, 1000);
                } else{
                    app.errorMsg = data.data.message;
                }
            });
        };

        this.logOut = function () {
            Auth.logOut();
            $timeout(function () {
                $location.path('/');
            },300);
        };
    });
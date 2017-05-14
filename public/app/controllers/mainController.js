angular.module('mainController',['authService'])
    .controller('loginController',function (Auth, AuthToken, $http, $timeout, $location, $rootScope) {
        var app = this;

        $rootScope.$on('$routeChangeStart', function () {
            if(Auth.isLoggedin()){
                app.isLoggedin = true;
               // console.log('User logged in!');
                Auth.getUser().then(function (data) {
              //      console.log(data.data.email);
                    app.email = data.data.email;
                });
            } else {
              //  console.log('User not logged in!');
                app.isLoggedin = false;
                app.email = '';
            }
        });

        this.doLogin = function () {
            app.errorMsg = false;
            $http.post('/api/login', app.data).then(function(data) {
                //console.log(data);
                AuthToken.setToken(data.data.token);
                if(data.data.success){
                    //console.log(data);
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
angular.module('userController', ['authService'])
    .controller('signupController', function (AuthToken,$http, $location, $timeout) {
        var app = this;
        this.signupUser = function () {
            app.errorMsg = false;
            $http.post('/api/signup', app.data).then(function (data) {
                AuthToken.setToken(data.data.token);
                if(data.data.success){
                    app.successMsg = data.data.message;
                    $timeout(function() {
                        $location.path("/dashboard");
                    }, 1000);
                } else{
                    app.errorMsg = data.data.message;
                }

            });

        };
    });



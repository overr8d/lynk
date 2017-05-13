angular.module('appRoutes',["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/signup",{
                templateUrl: 'app/views/users/signup.html',
                controller: 'signupController',
                controllerAs: 'signup'
            })
            .when("/login",{
                templateUrl: 'app/views/users/login.html',
                controller: 'loginController',
                controllerAs: 'login'
            })
            .when("/dashboard",{
                templateUrl: 'app/views/users/dashboard.html'
            })
            .otherwise({redirectTo:"/"});
        $locationProvider.html5Mode({
            enabled:true,
            requireBase:true
        });

    });
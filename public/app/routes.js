var app = angular.module('appRoutes',["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/signup",{
                templateUrl: 'app/views/users/signup.html',
                controller: 'signupController',
                controllerAs: 'signup',
                authenticated: false
            })
            .when("/login",{
                templateUrl: 'app/views/users/login.html',
                controller: 'loginController',
                controllerAs: 'login',
                authenticated: false
            })
            .when("/dashboard",{
                templateUrl: 'app/views/users/dashboard.html',
                controller: 'projectsController',
                controllerAs: 'projects',
                authenticated: true
            })
            .when("/dashboard/:project_id",{
                templateUrl: 'app/views/users/project.html',
                controller: 'prjController',
                controllerAs: 'project',
                authenticated: true
            })
            .otherwise({redirectTo:"/login"});
        $locationProvider.html5Mode({
            enabled:true,
            requireBase:true
        });
    });


app.run(['$rootScope', 'Auth', '$location', function ($rootScope, Auth, $location) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if( next.$$route !== undefined){

            if(next.$$route.authenticated == true){
                if(!Auth.isLoggedin()){
                    event.preventDefault();
                    $location.path('/login');
                }
            } else if(next.$$route.authenticated == false) {
                if(Auth.isLoggedin()){
                    event.preventDefault();
                    $location.path('/dashboard');
                }
            } else{
                console.log('hello');
            }
        }

    });

}]);

angular.module('lynkApp',['appRoutes', 'userController', 'mainController', 'authService'])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });





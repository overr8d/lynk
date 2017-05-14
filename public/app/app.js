angular.module('lynkApp',['appRoutes', 'userController', 'mainController','dashboardController', 'projectController', 'authService', 'projectService'])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });





angular.module('lynkApp',['appRoutes', 'userController', 'mainController','dashboardController', 'projectController', 'historyController', 'authService', 'projectService'])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });





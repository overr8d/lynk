// dependency injection for Angular APP
angular.module('lynkApp',['appRoutes', 'userController', 'mainController','dashboardController', 'projectController', 'historyController', 'authService', 'projectService'])
    // intercepts each http req to attach the token
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });





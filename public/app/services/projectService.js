angular.module('projectService', [])
    .factory('Project', function ($http) {
       var projectFactory = {};

       projectFactory.get = function (project_id) {
           return $http.get('api/project/'+project_id);
       };

       projectFactory.all = function () {
           return $http.get('/api/dashboard');
       };

       projectFactory.update = function (project_id, data) {
           return $http.put('/api/project/'+project_id, data);
       };

       return projectFactory;
    });
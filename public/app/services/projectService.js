angular.module('projectService', [])
    .factory('Project', function ($http) {
       var projectFactory = {};

       projectFactory.get = function (project_id) {
           return $http.get('api/dashboard/'+project_id);
       };

       projectFactory.all = function () {
           return $http.get('/api/dashboard');
       };

       projectFactory.create = function (data) {
           return $http.post('/api/dashboard', data);
       };

       projectFactory.update = function (project_id, data) {
           return $http.put('/api/dashboard/'+project_id, data);
       };

       projectFactory.delete = function (project_id) {
           return $http.delete('/api/dashboard/'+project_id);
       };

       return projectFactory;
    });
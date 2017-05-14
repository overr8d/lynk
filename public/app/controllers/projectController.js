angular.module('projectController', ['projectService'])
    .controller('prjController', function (Project, $routeParams) {
       var app = this;
       Project.get($routeParams.project_id).then(function (data) {
           app.data = data.data.project;
       });
    });

angular.module('dashboardController', ['projectService'])
    .controller('projectsController', function (Project) {
       var app = this;
       Project.all().then(function (data) {
            app.data = data.data.projects;
       });
    });

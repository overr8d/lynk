// Controller for /projects, categorizes new, pending, expired projects
angular.module('dashboardController', ['projectService'])
    .controller('projectsController', function (Project) {
       var app = this;
       app.new = [];
       app.pending = [];
       app.expired = [];
       Project.all().then(function (data) {
            data.data.projects.forEach(function (e) {
                if(e.status == 'NEW'){
                    app.new.push(e);
                }  else if(e.status == 'PENDING'){
                    app.pending.push(e);
                } else {
                    app.expired.push(e);
                }
            });
       });
    });

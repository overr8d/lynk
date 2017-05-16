// Controller for project/:project_id, manages the toggle button actions, updates Project details and writes  the actions taken to history
angular.module('projectController', ['projectService'])
    .controller('prjController', function ($http, Project, $routeParams) {
       var app = this;
       app.approved = [];
       app.rejected = [];
        this.init = function(ind){
            app.approved[ind] = false;
            app.rejected[ind] = false;
        };
        // handles the rejection toggle button
        this.changeRejectedStatus = function(ind, email){
           app.rejected[ind] = !app.rejected[ind];
           app.approved[ind] = !app.rejected[ind];
           app.checkStatusAndSave(ind, email);
        };
        // handles the approve toggle button
        this.changeApprovedStatus = function(ind, email){
            app.approved[ind] = !app.approved[ind];
            app.rejected[ind] = !app.approved[ind];
            app.checkStatusAndSave(ind, email);
        };
        // handles writing/updating operations to DB
        this.checkStatusAndSave = function (ind, email) {
            if(app.approved[ind] && !app.rejected[ind]){
                app.data.experts[ind].status = "APPROVED";
            } else if (!app.approved[ind] && app.rejected[ind]){
                app.data.experts[ind].status = "REJECTED";
            }
            app.data.status = "PENDING";
            Project.update(app.data._id,app.data);
            var history={};
            history.email = email;
            history.projectTitle = app.data.title;
            history.expertName = app.data.experts[ind].name;
            history.expertStatus = app.data.experts[ind].status;
            $http.post('api/history/', history);
        };

        Project.get($routeParams.project_id).then(function (data) {
           app.data = data.data.project;

       });
    });




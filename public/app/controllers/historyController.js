// Controller for /history, fetches data from API and sorts the table
angular.module('historyController', [])
    .controller('hstryController', function ($http) {
        var app = this;
        this.data = [];
        this.sortType = 'expertName';
        this.sortReverse = false;
        this.init = function (ind) {
            $http.get('/api/history/').then(function (data) {
                data.data.history.forEach(function (e) {
                    if(e.email == ind){
                        app.data.push(e);
                    }
                })
            });
        };
    });
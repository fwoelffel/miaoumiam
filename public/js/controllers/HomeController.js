var HomeController = MiaouMiam.controller('HomeController', function($scope, $http) {

    /**
     * Functions
     */

    $scope.loadCfg = function() {
        $scope.loadingCfg = true;
        $http.get('/config')
            .then(function onSuccess(response) {
                if(response.status === 200) {
                    $scope.config = response.data;
                }
                else {
                    console.log('Error : ' + response.data);
                }
            })
            .catch(function onError(err){
                console.log('Error : ' + response.data);
            })
            .finally(function eitherWay(){
                $scope.loadingCfg = false;
            });
    }

    $scope.saveCfg = function() {
        $scope.savingCfg = true;
        $http.post('/config', {config: $scope.config})
            .then(function onSuccess(response) {
                if(response.status === 200) {
                    $scope.config = response.data;
                }
                else {
                    console.log('Error : ' + response.data);
                }
            })
            .catch(function onError(err){
                console.log('Error : ' + response.data);
            })
            .finally(function eitherWay(){
                $scope.savingCfg = false;
            });
    }

    $scope.feed = function() {
        console.log('Feeding in progress');
        $scope.feeding = true;
        $http.post('/feed', {times: $scope.config.quantity})
            .then(function onSuccess(response){
                if(response.status === 200) {
                    console.log('Feeding terminated');
                }
                else {
                    console.log('Error : ' + response.data);
                }
            })
            .catch(function onError(err){
                console.log('Error : ' + response.data);
            })
            .finally(function eitherWay(){
                $scope.feeding = false;
            });
    }

    $scope.updateTime = function() {
        $scope.date.hours = $scope.time.getHours();
        $scope.date.minutes = $scope.time.getMinutes();
    }

    $scope.addSchedule = function() {
        $scope.config.schedule.push($scope.date);
        $scope.saveCfg();
    }

    $scope.removeSchedule = function(idx) {
        $scope.config.schedule.splice(idx, 1); // TODO test
        $scope.saveCfg();
    }

    /**
     * Initialization
     */

    {
        $scope.feeding = false;
        $scope.loadingCfg = false;
        $scope.savingCfg = false;

        // Init default date
        var d = new Date();
        $scope.date = {
            hours: d.getHours(),
            minutes: d.getMinutes(),
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            satursday: false,
            sunday: false
        };

        $scope.loadCfg();
    }
});
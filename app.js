(function(){

var app = angular.module('pomodoro',[]);

app.factory('time', [function(){
  var timers = {
      cooldown: 5,
      session: 25,
  };
  return timers;
}]);//end of service

app.controller('MainCtrl', ['$scope', 'time', function($scope, time){
    $scope.timers = time;
    $scope.currentMode = "Session";
    $scope.timerOn = false;
    
    $scope.toggleTimer = function(){
        if ($scope.timerOn == false){
            $scope.timerOn = true;   
        }
        else {
            $scope.timerOn = false;   
        }
    }
    $scope.addBreak = function() {
      $scope.timers.cooldown += 1;
    };
    $scope.lowerBreak = function() {
      $scope.timers.cooldown -= 1;
    };
    $scope.addSession = function() {
      $scope.timers.session += 1;
    };
    $scope.lowerSession = function() {
      $scope.timers.session -= 1;
    };
    
}]);//end of controller

    
})();
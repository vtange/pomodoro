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
    $scope.addbreak = function() {
      timers.cooldown += 1;
    };
    $scope.lowerbreak = function() {
      timers.cooldown -= 1;
    };
    $scope.addsession = function() {
      timers.session += 1;
    };
    $scope.lowersession = function() {
      timers.session -= 1;
    };
    
}]);//end of controller

    
})();
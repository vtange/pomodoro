(function(){

var app = angular.module('pomodoro',[]);

app.factory('time', [function(){
  var timers = {
      cooldown: 5,
      session: 25,
  };
  return timers;
}]);//end of service

app.controller('MainCtrl', ['$scope', 'time', '$interval', function($scope, time, $interval){
    $scope.timers = time; // load service
    $scope.timeLeft = $scope.timers.session;//shown time
    $scope.currentMode = "Session";//session mode or break mode

    var timerOn = false;
    var secs = 60 * $scope.timeLeft;
    
  $scope.toggleTimer = function() {
    if (!timerOn) {

      updateTimer();
      timerOn = $interval(updateTimer, 1000);
    } else {
      $interval.cancel(timerOn);
      timerOn = false;
    }
  }
function updateTimer() {
    secs -= 1;
    if (secs < 0) {
      // countdown is finished
      
      // Play audio
      var wav = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
      var audio = new Audio(wav);
			audio.play();
      
      // toggle break and session during hit 0
      if ($scope.currentMode === 'Break!') {
        $scope.currentMode = 'Session';
        $scope.timeLeft = 60 * $scope.timers.session;
        $scope.originalSetTime = $scope.timers.session;
        secs = 60 * $scope.timers.session;
      } else {
        $scope.currentMode = 'Break!';
        $scope.timeLeft = 60 * $scope.timers.cooldown;
        $scope.originalSetTime = $scope.timers.cooldown;
        secs = 60 * $scope.timers.cooldown;
      }
    } else {
      if ($scope.currentMode === 'Break!') {
        //use and move red box
      } else {
        //use and move grn box
      }
	  $scope.timeLeft = secondsToHms(secs);//update time left
      
      var totalsecs = 60 * $scope.originalSetTime;
      var percentage = Math.abs((secs / totalsecs) * 100 - 100);
      //move the box with percentage
    }
  }
  

      
    $scope.addBreak = function() {
        if (!timerOn) {
      $scope.timers.cooldown += 1;
      $scope.timeLeft = $scope.timers.session;//update time
      secs = 60 * $scope.timeLeft;
        }
    };
    $scope.lowerBreak = function() {
        if (!timerOn) {
      $scope.timers.cooldown -= 1;
      $scope.timeLeft = $scope.timers.session;//update time
      secs = 60 * $scope.timeLeft;
        }
    };
    $scope.addSession = function() {
        if (!timerOn) {
      $scope.timers.session += 1;
      $scope.timeLeft = $scope.timers.session;//update time
      secs = 60 * $scope.timeLeft;
        }
    };
    $scope.lowerSession = function() {
        if (!timerOn) {
      $scope.timers.session -= 1;
      $scope.timeLeft = $scope.timers.session;//update time
      secs = 60 * $scope.timeLeft;
        }
    };
    
    
    
      
  function secondsToHms(sec) {
    sec = Number(sec);
    var h = Math.floor(sec / 3600);
    var m = Math.floor(sec % 3600 / 60);
    var s = Math.floor(sec % 3600 % 60);
    return (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
    ); 
  }
    
}]);//end of controller

    
})();
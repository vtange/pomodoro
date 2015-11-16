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
    $scope.currentMode = "Session";//session mode or break mode
    $scope.originalSetTime = $scope.timers.session;//use for progress bar 100% tracking

    var timerOn = false;
    var secs = 60 * $scope.timers.session;
    $scope.timeLeft = secondsToHms(secs);//shown time
    
    $scope.addBreak = function(number) {
        if (!timerOn && $scope.timers.cooldown + number != 0) {
      $scope.timers.cooldown += number;
            if ($scope.currentMode === 'Break!') {//only update shown time if in break mode
      $scope.timeLeft = $scope.timers.cooldown;//update time
      secs = 60 * $scope.timeLeft;
      $scope.timeLeft = secondsToHms(secs);//update time left to hms
            }
        }
    };
    $scope.addSession = function(number) {
        if (!timerOn && $scope.timers.cooldown + number != 0) {
      $scope.timers.session += number;
              if ($scope.currentMode === 'Session') {//only update shown time if in session mode
      $scope.timeLeft = $scope.timers.session;//update time
      secs = 60 * $scope.timeLeft;
      $scope.timeLeft = secondsToHms(secs);//update time left to hms
              }
        }
    };

  $scope.checkTimer = function() {
      if (!timerOn) {
        return true;
      }
      else {
          return false;
      }
  }
  $scope.swapTimer = function() {
      if ($scope.currentMode === 'Break!') {
        $scope.currentMode = 'Session';
        $scope.originalSetTime = $scope.timers.session;
        secs = 60 * $scope.timers.session;
        $scope.timeLeft = secondsToHms(secs);
        document.querySelector(".progress-bar").style.backgroundColor = "green";
      } else {
        $scope.currentMode = 'Break!';
        $scope.originalSetTime = $scope.timers.cooldown;
        secs = 60 * $scope.timers.cooldown;
        $scope.timeLeft = secondsToHms(secs);
        document.querySelector(".progress-bar").style.backgroundColor = "FireBrick";
      }
  }
  
    
  $scope.toggleTimer = function() {
    if (!timerOn) {
      if ($scope.currentMode === 'Session') {///RESETS original timer time so bar resets to 0 and doens't continue.
        $scope.originalSetTime = $scope.timers.session;
      } else {
        $scope.originalSetTime = $scope.timers.cooldown;
      }

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
      $scope.swapTimer();
    } else {
	  $scope.timeLeft = secondsToHms(secs);//update time left
        
      //control progress bar
      var totalsecs = 60 * $scope.originalSetTime;
      var percentage = Math.abs((secs / totalsecs) * 100 - 100);
      //move the box with percentage
      document.querySelector(".progress-bar").style.width = percentage + "%";
    }
  }
 //thanks to Thorben @ http://stackoverflow.com/questions/5539028/converting-seconds-into-hhmmss
  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
    ); 
  }
    
}]);//end of controller

    
})();
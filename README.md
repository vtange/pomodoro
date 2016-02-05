# pomodoro

# Takeaways

 - Timekeeping involves seconds (1000 * milliseconds)
 - Use of $interval for timekeeping
 
```
 ...
       updateTimer();
      timerOn = $interval(updateTimer, 1000);
    } else {
      $interval.cancel(timerOn);
      timerOn = false;
    }
```

 - Time Display conversion function

```
  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
    ); 
  }
  ```
  
 - 0% - 100% Progress Bar
 
```
       //control progress bar
      var totalsecs = 60 * $scope.originalSetTime;
      var percentage = Math.abs((secs / totalsecs) * 100 - 100);
      //move the box with percentage
      document.querySelector(".progress-bar").style.width = percentage + "%";
```

 - Playing Audio

```
      // Play audio
      var wav = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
      var audio = new Audio(wav);
			audio.play();
```



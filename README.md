![alt tag](http://res.cloudinary.com/dmj8qtant/image/upload/c_limit,w_600/v1461829689/pomo.png)
# pomodoro

## Tech
AngularJS $interval PlainJS(Audio, Progress Bar)

## Niceties
Horizontal Progress Bar, Time Display, CSS Toggle

### Details
#### CSS
Progress Bar 
```
/*------------*/
/* clock */
/*------------*/
.clock {
  cursor: pointer;    
  border:3px solid green;
  border-radius: 50%;
    
/* centered circle with a minimum size*/    
  height: 30vw;
  width:30vw;
  margin:auto;
  min-height: 300px;
  min-width: 300px;
     
  position: relative; /*makes a point for child containers to connect to*/
}

.progress-container{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  margin:5px;
  border-radius: 50%;
  overflow:hidden; /*limit childs within*/
}

.progress-bar{
  position: absolute;
  background-color: green;
    /*grow this while time ticks, height and anim is taken care of with bootstrap */
  width:0%;
}
```
#### JS

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



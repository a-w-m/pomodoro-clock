function main() {
  let decrement = document.querySelector("#break-decrement");
  let increment = document.querySelector("#break-increment");
  let breakButtons = document.querySelectorAll(".break-length-button");
  let sessionButtons = document.querySelectorAll(".session-length-button");
  let startStopButton = document.querySelector("#start_stop");
  let resetButton = document.querySelector("#reset")
  let sessionLength = document.querySelector("#session-length")
  let breakLength = document.querySelector("#break-length")
  let timeLeft = document.querySelector('#time-left');
  let isSession = true;
  let timerRunning = false;
 

  function timer(min, sec) {
    let timeLeft = document.querySelector("#time-left");
    let timerLabel = document.querySelector("#timer-label");


    let time = setInterval(function() {
      

      if(!timerRunning){
        clearInterval(time)

        Array.from(breakButtons).forEach(breakButton => {
          breakButton.disabled = false;
          });
      
      
        Array.from(sessionButtons).forEach(sessionButton => {
          sessionButton.disabled= false;
        });

        document.querySelector("#play_pause").innerHTML = "play_arrow";

        
  
      }

      else{

        document.querySelector("#play_pause").innerHTML = "pause";

        Array.from(breakButtons).forEach(breakButton => {
          breakButton.disabled = true;
          });
      
      
        Array.from(sessionButtons).forEach(sessionButton => {
          sessionButton.disabled=true;
        });


       

      if (sec == "00" && parseInt(min) <= 10) {
        min = "0" + (parseInt(min) - 1).toString();
        sec = "60";
      } else if (sec == "00") {
        min = parseInt(min) - 1;
        sec = "60";
      }

      sec =
        parseInt(sec) <= 10
          ? "0" + (parseInt(sec) - 1).toString()
          : (sec = parseInt(sec) - 1);

      timeLeft.innerHTML = min + ":" + sec;

      if (min == "00" && sec == "00") {
        clearInterval(time);

        if (isSession) {
          min = getBreakLength().slice(0, 2);
          sec = getBreakLength().slice(3);
          timeLeft.innerHTML = min + ":" + sec;
          timerLabel.innerHTML = "break";
          isSession = false;
          console.log("break");
          timeLeft.className = "timeUpAnimation"
          setTimeout(function(){timer(min, sec)}, 2000);
          timeLeft.className = ""
        } else {
          min = getSessionLength().slice(0, 2);
          sec = getSessionLength().slice(3);
          timeLeft.innerHTML = min + ":" + sec;
          timerLabel.innerHTML = "session";
          isSession = true;
          console.log("session");
          timeLeft.className = "timeUpAnimation"
          setTimeout(function(){timer(min, sec)}, 2000);
          timeLeft.className = ""
        }
      }
    }
    }, 1000);
  }

  function startStop(e) {

    timerRunning = timerRunning ? false : true

    if (timerRunning){
    let min = getTimeLeft().slice(0, 2);
    let sec = getTimeLeft().slice(3);
    timer(min, sec);


    
  }

}

  function reset(e){
    timerRunning = false;
    sessionLength.innerHTML = "25"
    breakLength.innerHTML = "5"
    timeLeft.innerHTML = "00:10"
   
  }
  function getBreakLength() {
    if (breakLength.innerHTML.length == 2) {
      return breakLength.innerHTML + ":00";
    } else {
      return "0" + breakLength.innerHTML + ":00";
    }
  }

  function getSessionLength() {
    if (sessionLength.innerHTML.length == 2) {
      return sessionLength.innerHTML + ":00";
    } else {
      return "0" + sessionLength.innerHTML + ":00";
    }
  }

  function getTimeLeft(){
    return timeLeft.innerHTML
  }


  function changeBreakLength(e) {
    let breakLength = document.querySelector("#break-length").innerHTML;
    if (this.firstChild.innerHTML == "add" && breakLength < 60) {
      document.querySelector("#break-length").innerHTML = breakLength =
        parseInt(breakLength) + 1;
    } else if (this.firstChild.innerHTML == "remove" && breakLength > 1) {
      document.querySelector("#break-length").innerHTML = breakLength =
        parseInt(breakLength) - 1;
    }
  }

  function changeSessionLength() {
    let sessionLength = document.querySelector("#session-length").innerHTML;
    if (this.firstChild.innerHTML == "add" && sessionLength < 60) {
      document.querySelector("#session-length").innerHTML =
        parseInt(sessionLength) + 1;
      if (document.querySelector("#session-length").innerHTML.length < 2) {
        document.querySelector("#time-left").innerHTML =
          "0" + (parseInt(sessionLength) + 1).toString() + ":00";
      } else {
        document.querySelector("#time-left").innerHTML =
          (parseInt(sessionLength) + 1).toString() + ":00";
      }
    } else if (this.firstChild.innerHTML == "remove" && sessionLength > 1) {
      document.querySelector("#session-length").innerHTML =
        parseInt(sessionLength) - 1;
      if (document.querySelector("#session-length").innerHTML.length < 2) {
        document.querySelector("#time-left").innerHTML =
          "0" + (parseInt(sessionLength) - 1).toString() + ":00";
      } else {
        document.querySelector("#time-left").innerHTML =
          (parseInt(sessionLength) - 1).toString() + ":00";
      }
    }
  }

  Array.from(breakButtons).forEach(breakButton => {
    breakButton.addEventListener("click", changeBreakLength);
  });

  Array.from(sessionButtons).forEach(sessionButton => {
    sessionButton.addEventListener("click", changeSessionLength);
  });

  startStopButton.addEventListener("click", startStop);

  resetButton.addEventListener("click", reset);
}
main();

function main() {
  let decrement = document.querySelector("#break-decrement");
  let increment = document.querySelector("#break-increment");
  let breakButtons = document.querySelectorAll(".break-length-button");
  let sessionButtons = document.querySelectorAll(".session-length-button");
  let startStopButton = document.querySelector("#start_stop");
  let isSession = true;

  function sessionCounter(e) {
   

    let time = setInterval(function(){
    let min = document.querySelector("#time-left").innerHTML.slice(0, 2);
    let sec = document.querySelector("#time-left").innerHTML.slice(3,);
 

      if (sec == "00" && parseInt(min) <=10) {
        min = '0'+ (parseInt(min) - 1).toString();
        sec = "60";
      }
      else if (sec == '00') {
        min = parseInt(min) - 1;
        sec = "60";
      }


      sec =
        parseInt(sec) <= 10
          ? "0" + (parseInt(sec) - 1).toString()
          : (sec = parseInt(sec) - 1);


      document.querySelector("#time-left").innerHTML = min + ":" + sec;

      if(min == "00" && sec == "00"){
        clearInterval(time);
        breakCounter()
    }

     }, 1000)
  }

  function breakCounter(){
    document.querySelector('#time-left').innerHTML = getBreakLength() 
    let min = document.querySelector("#time-left").innerHTML.slice(0, 2);
    let sec = document.querySelector("#time-left").innerHTML.slice(3,);
  }


  function getBreakLength(){
      if (document.querySelector('#break-length').length == 2){
           
      return document.querySelector('#break-length').innerHTML + ':00'
      }
      else{
          return '0' + document.querySelector('#break-length').innerHTML + ':00'
      }
  }

  function getSessionLength(){
    if (document.querySelector('#session-length').length == 2){
           
        return document.querySelector('#session-length').innerHTML + ':00'
        }
        else{
            return '0' + document.querySelector('#session-length').innerHTML + ':00'
        }
    }

  


  function stop() {}

  function changeBreakLength(e) {
    let breakLength = document.querySelector("#break-length").innerHTML;
    if (this.innerHTML == "+" && breakLength < 60) {
      document.querySelector("#break-length").innerHTML = breakLength =
        parseInt(breakLength) + 1;
    } else if (this.innerHTML == "-" && breakLength > 1) {
      document.querySelector("#break-length").innerHTML = breakLength =
        parseInt(breakLength) - 1;
    }
  }

  function changeSessionLength() {
    let sessionLength = document.querySelector("#session-length").innerHTML;
    if (this.innerHTML == "+" && sessionLength < 60) {
      document.querySelector("#session-length").innerHTML =
        parseInt(sessionLength) + 1;
        if (document.querySelector("#session-length").innerHTML.length < 2){
            document.querySelector("#time-left").innerHTML = '0'+
            (parseInt(sessionLength) + 1).toString() + ":00";
        }
        else{
      document.querySelector("#time-left").innerHTML =
        (parseInt(sessionLength) + 1).toString() + ":00";
        }
    } else if (this.innerHTML == "-" && sessionLength > 1) {
      document.querySelector("#session-length").innerHTML =
        parseInt(sessionLength) - 1;
        if (document.querySelector("#session-length").innerHTML.length < 2){
            document.querySelector("#time-left").innerHTML = '0'+
            (parseInt(sessionLength) - 1).toString() + ":00";
        } 
        else {
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

  startStopButton.addEventListener("click", sessionCounter);

}
main();

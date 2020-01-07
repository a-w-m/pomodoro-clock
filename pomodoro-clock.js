function main() {
	/*global variables*/

	var decrement = document.querySelector("#break-decrement");
	var increment = document.querySelector("#break-increment");
	var breakButtons = document.querySelectorAll(".break-length-button");
	var sessionButtons = document.querySelectorAll(".session-length-button");
	var startStopButton = document.querySelector("#start_stop");
	var resetButton = document.querySelector("#reset");
	var sessionLength = document.querySelector("#session-length");
	var breakLength = document.querySelector("#break-length");
	var timeLeft = document.querySelector("#time-left");
	var timerLabel = document.querySelector("#timer-label");
	var isSession = true;
	var timerRunning = false;
	var beep = document.querySelector("#beep");
	var time;

	function timer(min, sec) {
		/* the timer functions contains the time setInterval function that implements the countdown.*/

		timeLeft.style.color = "";

		time = setInterval(function() {
			/*if the time reaches "00:00", play alarm, change color of time displayed, get break/session time, update time-left to break/session time*/

			if (min == "00" && sec == "00") {
				beep.play();
				timeLeft.style.color = "#cd140b";

				if (isSession) {
					min = getBreakLength().slice(0, 2);
					sec = getBreakLength().slice(3);
					timeLeft.innerHTML = min + ":" + sec;
					timerLabel.innerHTML = "break";
					isSession = false;
				} else {
					min = getSessionLength().slice(0, 2);
					sec = getSessionLength().slice(3);
					timeLeft.innerHTML = min + ":" + sec;
					timerLabel.innerHTML = "session";
					isSession = true;
				}
			} else {
				timeLeft.style.color = "";

				document.querySelector("#play_pause").innerHTML = "pause";

				/*decrement min if seconds reach zero and adjust seconds to 60*/

				if (sec == "00" && parseInt(min) <= 10) {
					min = "0" + (parseInt(min) - 1).toString();
					sec = "60";
				} else if (sec == "00") {
					min = parseInt(min) - 1;
					sec = "60";
				}

				/*decrement seconds*/

				sec =
					parseInt(sec) <= 10
						? "0" + (parseInt(sec) - 1).toString()
						: (sec = parseInt(sec) - 1);

				/*update time left*/

				timeLeft.innerHTML = min + ":" + sec;
			}
		}, 1000);
	}

	function startStop(e) {
		/*startStop() pauses/resume the timer. Uses boolean timerRunning to determine whethere to pause/resume.*/

		timerRunning = timerRunning ? false : true;

		if (timerRunning) {
			let min = getTimeLeft().slice(0, 2);
			let sec = getTimeLeft().slice(3);
			timer(min, sec);
		} else {
			clearInterval(time);

			Array.from(breakButtons).forEach(breakButton => {
				breakButton.disabled = false;
			});

			Array.from(sessionButtons).forEach(sessionButton => {
				sessionButton.disabled = false;
			});

			document.querySelector("#play_pause").innerHTML = "play_arrow";
		}
	}

	function reset(e) {
		/*sets all variables and html to the original state*/

		clearInterval(time);
		timerRunning = false;
		isSession = true;
		document.querySelector("#timer-label").innerHTML = "session";
		document.querySelector("#play_pause").innerHTML = "play_arrow";
		sessionLength.innerHTML = "25";
		breakLength.innerHTML = "5";
		timeLeft.innerHTML = "25:00";
		beep.load();
		beep.currentTime = 0;
	}
	function getBreakLength() {
		/*returns breakLength as string in "00:00" format*/

		if (breakLength.innerHTML.length == 2) {
			return breakLength.innerHTML + ":00";
		} else {
			return "0" + breakLength.innerHTML + ":00";
		}
	}

	function getSessionLength() {
		/*returns sessionLength as string in "00:00" format*/

		if (sessionLength.innerHTML.length == 2) {
			return sessionLength.innerHTML + ":00";
		} else {
			return "0" + sessionLength.innerHTML + ":00";
		}
	}

	function getTimeLeft() {
		/*returns current time displayed as string*/

		return timeLeft.innerHTML;
	}

	function changeBreakLength(e) {
		/*increases or decreases breakLength by one, within the range 1-60. Changes timeLeft only if timer is not running and currently on a break */

		let breakLength = document.querySelector("#break-length").innerHTML;
		if (this.firstChild.innerHTML == "add" && breakLength < 60) {
			document.querySelector("#break-length").innerHTML =
				parseInt(breakLength) + 1;
		} else if (this.firstChild.innerHTML == "remove" && breakLength > 1) {
			document.querySelector("#break-length").innerHTML =
				parseInt(breakLength) - 1;
		}

		if (
			!timerRunning &&
			document.querySelector("#timer-label").innerHTML == "break"
		) {
			document.querySelector("#time-left").innerHTML = getBreakLength();
		}
	}

	function changeSessionLength() {
		/*increases or decreases sessionLength by one, within the range 1-60. Changes timeLeft only if timer is not running and currently on a session */

		let sessionLength = document.querySelector("#session-length").innerHTML;
		if (this.firstChild.innerHTML == "add" && sessionLength < 60) {
			document.querySelector("#session-length").innerHTML =
				parseInt(sessionLength) + 1;
		} else if (this.firstChild.innerHTML == "remove" && sessionLength > 1) {
			document.querySelector("#session-length").innerHTML =
				parseInt(sessionLength) - 1;
		}

		if (
			!timerRunning &&
			document.querySelector("#timer-label").innerHTML == "session"
		) {
			document.querySelector("#time-left").innerHTML = getSessionLength();
		}
	}

	/*assigns event listeners to buttons, that call various functions upon button click*/

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

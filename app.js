let startButton = document.querySelector(".start")
let stopButton = document.querySelector(".stop")
let timerCircle = document.querySelector("circle")
let minutes = document.getElementById("minutes")
let seconds = document.querySelector("#seconds")
let settingsButton = document.querySelector(".settings")
let timer
startButton.addEventListener("click", ()=>{startTimer()})
stopButton.addEventListener("click", ()=>{stopTimer()})
settingsButton.addEventListener("click", ()=>{settings()})

function stopTimer(){
    // Add hide class to stop button again
    stopButton.classList.add("hide");
    // Remove hide class to start button
    startButton.classList.remove("hide");
    // Stop countdown at current position and allow editing
    clearInterval(timer)
}

function startTimer(){
    // Set Timer to Green
  timerCircle.style.stroke = "#09A65A";
  // Add hide class to start button
  startButton.classList.add("hide");
  // Remove hide class from stop button
  stopButton.classList.remove("hide");

  if (minutes.disabled == false) {
    document.querySelector("#seconds").disabled = true;
    document.querySelector("#minutes").disabled = true;
  }

  // Calculate the total time in seconds
  let totalTime = parseInt(minutes.value) * 60 + parseInt(seconds.value);

  // Update the count down every 1 second on the page
  timer = setInterval(() => {
    if (seconds.value != 0) {
      seconds.value = prependZero(seconds.value - 1);
    } else if (seconds.value == 0 && minutes.value != 0) {
      minutes.value = prependZero(minutes.value - 1);
      seconds.value = 59;
    } else {
      clearInterval(timer);
      timerCircle.style.stroke = "red";
      playAudio();
    }

    // Calculate the remaining time in seconds
    let remainingTime = parseInt(minutes.value) * 60 + parseInt(seconds.value);

    // Calculate the percentage of time remaining
    let percentageRemaining = (remainingTime / totalTime) * 100;

    // Calculate the corresponding value for stroke-dashoffset
    let strokeDashoffsetValue = (100 - percentageRemaining) * 15.9578;

    // Update the circle's stroke-dashoffset attribute
    timerCircle.style.strokeDashoffset = strokeDashoffsetValue;
  }, 1000);
    function prependZero(number) {
        if (number < 9)
            return "0" + number;
        else
            return number;
    }
}

function playAudio() {
    // Plays audio when done
    document.getElementById("audio").play();
}

function settings() {
    // Enables editing of minutes and seconds
    if (minutes.disabled == true){
        document.querySelector("#seconds").disabled = false
        document.querySelector("#minutes").disabled = false
    }
    else if(minutes.disabled == false){
        document.querySelector("#seconds").disabled = true
        document.querySelector("#minutes").disabled = true
    }
    
}
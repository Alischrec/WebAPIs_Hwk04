var timeEl = document.getElementById('time');
var startEl = document.getElementById('start');
var questionEl = document.getElementById('question');

var secondsLeft = 76;

let setTime = () => {
    var timerInterval = setInterval(() => {
      secondsLeft--;
      timeEl.textContent = 'Time: ' + secondsLeft;
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        sendMessage();
      }
  
    }, 1000);
  }

startEl.addEventListener('click', (event) => {
    setTime();
});



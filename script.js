// Pseudocode:
// index.html = Main Game Page
//   1. Start Screen:
//      a. When the start button is clicked:
//        - Start timer
//        - Show first question
//   2. Question Screen:
//      a. When the answer button is clicked:
//        - Check if the answer is correct
//        - Decrease time by 10 sec. if incorrect
//        - Show user that their answer was correct/incorrect
//   3. Ask User for Initials Screen:
//      a.When the submit button is clicked:
//        - Get the user's initials from the input
//        - Store their initials alongside their score in localStorage (keep high scores in an array, where each user score is an object, with 'inititals' field and a 'score field')
//        - Redirect to highscore screen

// Quiz Questions:
const questions = [
  {
    prompt: 'In Javascript, arrays can be used to store _______',
    answers: [
      'A. Other Arrays',
      'B. Numbers and Strings',
      'C. Booleans',
      'D. All of the Above',
    ],
    correctAnswer: 'D. All of the Above',
  },
  {
    prompt: 'Where is the correct place to insert your JavaScript <script> tag?',
    answers: [
      'A. The <head> section',
      'B. The <body> section',
      'C. Inside a <div>',
      'D. Both the <head> section and the <body> section',
    ],
    correctAnswer: 'D. Both the <head> section and the <body> section',
  },
  {
    prompt: 'What is the correct way to write a JavaScript array?',
    answers: [
      'A. var colors = (1:"red", 2:"green", 3:"blue"',
      'B. var colors = ["red", "green", "blue"]',
      'C. var colors = 1 = ("red), 2= ("green"), 3=("blue")',
      'D. var colors = "red", "green", "blue"'
    ],
    correctAnswer: 'B. var colors = ["red", "green", "blue"]',
  },
  {
    prompt: 'Which event occurs when the user clicks on an HTML element?',
    answers: [
      'A. onchange',
      'B. onmouseclick',
      'C. onmouseover',
      'D. onclick',
    ],
    correctAnswer: 'D. onclick',
  },
  {
    prompt: 'How does a FOR Loop start?',
    answers: [
      'A. for (i = 0; i <= 5)',
      'B. for (i = 0; i <= 5; i++)',
      'C. for (i <= 5; i ++)',
      'D. for i = 1 to 5',
    ],
    correctAnswer: 'B. for (i = 0; i <= 5; i++)',
  },
]

// Retrieving elements from html
let timeEl = document.getElementById('time');
let startEl = document.getElementById('start');
let questionPromptEl = document.getElementById('question-prompt');
let questionAnswersEl = document.getElementById('question-answers');
let startScreen = document.getElementById('start-screen');
let questionScreen = document.getElementById('question-screen');
let endScreen = document.getElementById('end-screen');
let commentEl = document.getElementById('comment');
let submitEl = document.getElementById('submit');
let initialsEl = document.getElementById('initials');
let clearBtn = document.getElementById('clear');

let secondsLeft = 76;

// Quiz Timer:
let timer = () => {
  var timerInterval = setInterval(() => {
    secondsLeft--;
    timeEl.textContent = 'Time: ' + secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      startScreen.style.display = 'none';
      endScreen.style.display = 'block';
      questionScreen.style.display = 'none';
    }

  }, 1000);
}

// Timer begins when Start Button is clicked
if (startEl) {
  startEl.addEventListener('click', (event) => {
    timer();
    startScreen.style.display = 'none';
    endScreen.style.display = 'none';
    questionScreen.style.display = 'block';
  });
}

function showQuestion(questionIndex) {

  // Once quiz has ended, go to end screen
  const endQuiz = questions.length - questionIndex;
  if (endQuiz === 0) {
    startScreen.style.display = 'none';
    endScreen.style.display = 'block';
    questionScreen.style.display = 'none';
    return;
  }

  // Retrieve the current question:
  const currentQuestion = questions[questionIndex];

  // Placing the current question's prompt into the question prompt div:
  questionPromptEl.innerText = currentQuestion.prompt;
  questionAnswersEl.innerHTML = '';

  for (const answer of currentQuestion.answers) {
    const newButtonContainer = document.createElement('div');
    const newButtonEl = document.createElement('button');
    newButtonEl.className = 'answers';

    // Check for correct/incorrect answers:
    newButtonEl.addEventListener('click', () => {

      if (answer === currentQuestion.correctAnswer) {
        commentEl.textContent = 'Correct!';
        showQuestion(questionIndex + 1);
      }
      else {
        commentEl.textContent = 'Incorrect!';
        showQuestion(questionIndex + 1);
        secondsLeft -= 10;
      }
    })

    newButtonEl.innerText = answer;
    newButtonContainer.append(newButtonEl);
    questionAnswersEl.append(newButtonContainer);
  }
}
if (startEl){
showQuestion(0);
}

if (submitEl){
submitEl.addEventListener('click', function (event) {
  event.preventDefault();

  var newPlayer = {
    initials: initialsEl.value,
    score: secondsLeft
  }

  var playersScore = JSON.parse(localStorage.getItem('score')) || []
  playersScore.push(newPlayer)
  
  // Store initials & score within Local Storage
  localStorage.setItem('score', JSON.stringify(playersScore));

  if (initialsEl.value.length < 1)
    return;
  else {
    window.location.assign('scoresheet.html');
  }

  createHighScores();
  
})
}


let createHighScores = () => {
  var allScores = JSON.parse(localStorage.getItem('score'));
  let keyEl = document.getElementById('key');
 
  allScores.sort (function (a, b) {
        if ( a.score > b.score ){
          return -1;
        }
        if ( a.score < b.score ){
          return 1;
        }
        return 0;
      })

  if (keyEl && allScores) {
    for (let i = 0; i < allScores.length; i++) {
      const element = allScores[i];

      let listEl = document.createElement('li');
      listEl.textContent = element.initials + ' : ' + element.score;
      keyEl.appendChild(listEl);

    }
  }
}
createHighScores();

if (clearBtn){
clearBtn.addEventListener('click', function (event) {
  let keyEl = document.getElementById('key');
  localStorage.clear();
  keyEl.innerHTML = '';
});
}

      // Audio Elements:
      // var audioTada = document.createElement('<audio>');
      // audioElement.setAttribute('scr', 'assets/Ta_Da.mp3');

      // var audioWomp = document.createElement('<audio>');
      // audioElement.setAttribute('scr', 'assets/Sad_Trombone.mp3');

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull =document.querySelector('#progressBarFull');
const theTimer = document.getElementById('theTimer');
const clickStart = document.getElementById('startTime')

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0; 
let questionCounter = 0; 
let availableQuestions = [];
let totalTime = 60;
let min = 0;
let sec = 0;
let counter = 0;

let questions = [
    {
        question: "How many people are currently alive on planet earth?",
        choice1: '100 Billion',
        choice2: '10 Billion',
        choice3: '7 Billion',
        choice4: '5 Billion',
        answer: 3,
    },
    {
        question: 'How many times have the yankees won the world series?',
        choice1: '27',
        choice2: '22',
        choice3: '32',
        choice4: '15',
        answer: 1
    },
    {
        question: 'Who is the governor of Connecticut?',
        choice1: 'Donald Duck',
        choice2: 'Mel Gipson',
        choice3: 'Ned Lamont',
        choice4: 'Elvis',
        answer: 3
    },
    {
        question: 'How much fun is coding?',
        choice1: 'I hate coding',
        choice2: "It's not fun",
        choice3: 'No me gusta',
        choice4: "It's the greatest",
        answer: 4
    },
    {
    question: 'What line of code allows you to get information to show in the console?',
        choice1: 'JavaScript',
        choice2: 'Terminal/Bash',
        choice3: 'Console.log',
        choice4: 'For Loops',
        answer: 3
    }

]

const points = 10
const maxQuestions = 5

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`
    progressBarFull.style.width = `${(questionCounter/maxQuestions) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return 

        acceptingAnswers = false 
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(points)
        }


        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

function gameTimer() {
  let timer = setInterval(function () {
      totalTime--;
      theTimer.textContent = (`${totalTime} seconds left`)

      if (totalTime === 0) {
          clearInterval(timer);
      }

     
  }, 1000);
}


incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

function finalScore() {

}

startGame()

clickStart.addEventListener('click', () => {
  gameTimer();
});

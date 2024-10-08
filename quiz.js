alert("Click OK to continue with life reflection quiz")

let currentQuestion=0;
const questions = document.querySelectorAll('.ques');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

showQuestion(currentQuestion);

function showQuestion(index){
questions.forEach((ques, i)=>{
ques.classList.remove('active');
if (i===index){
ques.classList.add('active');
}
});

prevButton.disabled = index === 0;
 nextButton.disabled = index === questions.length - 1;
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}


let timeLeft = 300; 
let timerInterval;

function startTimer() {
    const timerDisplay = document.getElementById('timer');
    
    timerInterval = setInterval(function() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        
        timerDisplay.innerHTML = `Time Left: ${minutes}:${seconds}`;

        
        timeLeft--;

        
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            alert("Time is up! The quiz is being submitted automatically.");
            submitAnswer(); 
        }
    }, 1000); 
}

function submitAnswer() {
    clearInterval(timerInterval);  

    const allQuestions = document.querySelectorAll('.ques');
    let totalQuestions = allQuestions.length;
    let score = 0;   
    let allAnswered = true;  
    let unanswered = [];     

    allQuestions.forEach((question, index) => {
        const radios = question.querySelectorAll('input[type="radio"]');
        let answered = false;
        let selectedAnswer = null;
        let correctAnswer = null;
        let explanation = question.querySelector('.explanation'); 
        if (explanation) explanation.style.display = "none"; 

        radios.forEach((radio) => {
            const label = question.querySelector(`label[for="${radio.id}"]`);
            label.style.color = ""; 

            if (radio.checked) {
                answered = true;
                selectedAnswer = radio;
            }

            if (label.getAttribute('data-correct') === 'true') {
                correctAnswer = label;
            }
        });

        if (!answered) {
            allAnswered = false;
            unanswered.push(index + 1);
        }

        if (answered) {
            const selectedLabel = question.querySelector(`label[for="${selectedAnswer.id}"]`);
            if (selectedLabel.getAttribute('data-correct') === 'true') {
                selectedLabel.style.color = "green"; 
                score++; 
            } else {
                selectedLabel.style.color = "red";   
                correctAnswer.style.color = "green"; 
                if (explanation) explanation.style.display = "block"; 
            }
        } else {
            if (correctAnswer) correctAnswer.style.color = "green"; 
        }
    });

    if (!allAnswered) {
        alert("Some questions were left unanswered. All correct answers and explanations have been revealed.");
    } else {
        let resultMessage = `Your score is ${score}/${totalQuestions}.`;
        
        if (score === totalQuestions) {
            resultMessage += " Congratulations! You got a perfect score!";
        }

        document.getElementById('resultMessage').innerHTML = resultMessage;
    }
}



window.onload = function() {
    startTimer();
};







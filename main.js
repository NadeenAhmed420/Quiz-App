const questions = [
  {
    question: "Which is The Largest Animal In The World?",
    answers: [
      { text: "Shark", correct: "fallse" },
      { text: "Blue Wheal", correct: "true" },
      { text: "Elephant", correct: "fallse" },
      { text: "Giraffee", correct: "fallse" },
    ],
  },
  {
    question: "Which is The Smallest Continent In The World?",
    answers: [
      { text: "Asia", correct: "false" },
      { text: "Australia", correct: "true" },
      { text: "Arctic", correct: "false" },
      { text: "Africa", correct: "false" },
    ],
  },

  {
    question: "Which is The Largesr Desert In The World?",
    answers: [
      { text: "Kalahari", correct: "false" },
      { text: "Gobi", correct: "false" },
      { text: "Sahara", correct: "false" },
      { text: "Antarctica", correct: "true" },
    ],
  },
  {
    question: "Which is The Largesr Oceans  In The World?",
    answers: [
      { text: "Pacific Ocean", correct: "true" },
      { text: "Indian Ocean", correct: "false" },
      { text: "Atlantic Ocean", correct: "false" },
      { text: "Arctic Ocean", correct: "false" },
    ],
  },
];
const questionsElement = document.querySelector(".questions");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function StartQuiz() {
  i = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  ShowQuestions();
}

function ShowQuestions() {
  resetAnswers();

  ///show the question title .
  const currentQuestion = questions[i];
  const questionNumher = i + 1;
  questionsElement.innerHTML = questionNumher + "." + currentQuestion.question;

  ///loop among answers
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button"); //create button
    button.innerHTML = answer.text; //the text inside button is what in the answers
    button.classList.add("btn"); //add class btn
    answerButtons.appendChild(button); //in div parent ==> add button(answer)
    //check if answer is correct?
    if (answer.correct) {
      button.dataset.correct = answer.correct; //t/f
    }
    button.addEventListener("click", selectAnswer);
  });
}
//remove a
function resetAnswers() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
/////////////////////////////////////////////////////////

//get the selected btn
function selectAnswer(e) {
  const selectedBtn = e.target; //it mean the text inside the selected btn
  const isCorret = selectedBtn.dataset.correct === "true";
  if (isCorret) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  //seacrh in each btn the (childrens) if the answer is t/f
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true; //cant choose anther anwser.
  });
  nextButton.style.display = "block"; // to move to second ques
}

//////////////////

nextButton.addEventListener("click", () => {
  if (i < questions.length) {
    // i < 4 still have ques to show.
    handleNextButton(); //get next ques .
  } else {
    StartQuiz();
  }
});
/////////////////////////////////////////////////////////

function handleNextButton() {
  i++; //next ques
  if (i < questions.length) {
    // i < 4 still have ques to show
    ShowQuestions();
  } else {
    showScore(); // the ques end so now show score
  }
}

//////////////////////////////////////////////////////////

function showScore() {
  resetAnswers(); //to remove all the answer buttons
  questionsElement.innerHTML = `your score is ${score} out of ${questions.length} !!`;
  nextButton.innerHTML = "Play Again"; //addevent again when click
  nextButton.style.display = "block";
}
StartQuiz();

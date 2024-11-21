const questions = [
  {
    question: "What type of person do you think I am?",
    options: ["Good to Everyone", "Good to good ones"],
    images: ["gooda.webp", "bada.jpg"],
    correct: 1,
  },
  {
    question: "What am I?",
    options: ["Introvert", "Extrovert"],
    images: ["intro.png", "extro.jpg"],
    correct: 0,
  },
  {
    question: "What is my favorite food?",
    options: ["Pizza", "Chole Bhature"],
    images: ["pizza.jpg", "chole.jpg"],
    correct: 1,
  },
  {
    question: "What will I choose?",
    options: ["Western", "Traditional"],
    images: ["wes.jpg", "tra.jpg"],
    correct: 0,
  },
  {
    question: "What's my favorite movie genre?",
    options: ["Rom-Com", "Thriller"],
    images: ["rom.jpg", "thrill.jpg"],
    correct: 0,
  },
  {
    question: "My personality according to U?",
    options: ["Sweet", "Badass"],
    images: ["pree.jpg", "bad.jpg"],
    correct: 1,
  },
  {
    question: "What will you believe first?",
    options: ["I'm dating a celebrity", "I'm the new IAS"],
    images: ["pap.jpg", "ias.jpg"],
    correct: 1,
  },
  {
    question: "Don't dare but if you propose me, I will?",
    options: ["Be shocked", "Be surprised"],
    images: ["shock.jpg", "sur.jpg"],
    correct: 1,
  },
];

let currentQuestionIndex = 0;
let score = 0;

// Load audio files
const correctAudio = new Audio("applause.mp3.mp3");
const wrongAudio = new Audio("wrong.mp3");
const victoryAudio = new Audio("victory.mp3");
const loseAudio = new Audio("game.mp3");

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question").innerText = question.question;

  const options = document.querySelectorAll(".option");
  options.forEach((option, index) => {
    option.querySelector("img").src = question.images[index];
    option.querySelector("p").innerText = question.options[index];
    option.setAttribute("onclick", `checkAnswer(${index === question.correct})`);
    option.dataset.answered = "false";
  });

  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("next-btn").classList.add("hidden");
}

// Party Popper Animation
function showPartyPopper() {
  const popper = document.createElement("div");
  popper.classList.add("party-popper");
  popper.innerText = "🎉";
  document.body.appendChild(popper);
  setTimeout(() => popper.remove(), 1000);
}

// Check the Answer
function checkAnswer(isCorrect) {
  const options = document.querySelectorAll(".option");
  const feedback = document.getElementById("feedback");

  // Ensure only one answer per question
  const alreadyAnswered = [...options].some(option => option.dataset.answered === "true");
  if (alreadyAnswered) return;

  if (isCorrect) {
    feedback.innerText = "Hee Hee! You know Me ❤️";
    feedback.style.color = "#28a745";
    score++;
    document.getElementById("score").innerText = `Score: ${score}`;
    correctAudio.play();
    showPartyPopper(); // Show celebration
  } else {
    feedback.innerText = "No, you don't know me 😏";
    feedback.style.color = "#dc3545";
    wrongAudio.play();
  }

  options.forEach(option => option.dataset.answered = "true");
  feedback.classList.remove("hidden");
  document.getElementById("next-btn").classList.remove("hidden");
}

// Proceed to the Next Question
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

// End Quiz Logic
function endQuiz() {
  const quizContainer = document.querySelector(".quiz-container");
  if (score > 5) {
    victoryAudio.play();
    quizContainer.innerHTML = `
      <h1>Victory!</h1>
      <p>Your final score is: ${score}/${questions.length}</p>
    `;
  } else {
    loseAudio.play();
    quizContainer.innerHTML = `
      <h1>You Lose</h1>
      <p>Your final score is: ${score}/${questions.length}</p>
    `;
  }
}

window.onload = loadQuestion;

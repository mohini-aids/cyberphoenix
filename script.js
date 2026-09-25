const questions = [
    {
        question: "What is phishing?",
        options: [
            "A type of computer hardware",
            "A fraudulent attempt to obtain sensitive information",
            "A programming language",
            "A network protocol"
        ],
        answer: 1
    },

    {
        question: "Which of the following is a strong password?",
        options: [
            "password123",
            "12345678",
            "Mohini2007",
            "T9#kL2@pQ7!"
        ],
        answer: 3
    },

    {
        question: "What does malware mean?",
        options: [
            "Malicious software",
            "Managed hardware",
            "Mail software",
            "Manual network"
        ],
        answer: 0
    },

    {
        question: "Which attack floods a server with traffic?",
        options: [
            "Phishing",
            "DDoS",
            "Brute force",
            "Keylogging"
        ],
        answer: 1
    },

    {
        question: "What does VPN primarily provide?",
        options: [
            "Encrypted network connection",
            "Extra computer storage",
            "Faster processor speed",
            "Antivirus hardware"
        ],
        answer: 0
    },

    {
        question: "Which one is an example of two-factor authentication?",
        options: [
            "Only a password",
            "Password plus OTP",
            "Only username",
            "Only security question"
        ],
        answer: 1
    },

    {
        question: "What is ransomware?",
        options: [
            "Software that encrypts data and demands payment",
            "A type of firewall",
            "A programming language",
            "A backup system"
        ],
        answer: 0
    },

    {
        question: "What does HTTPS help provide?",
        options: [
            "Encrypted communication",
            "More RAM",
            "Faster CPU",
            "Free internet"
        ],
        answer: 0
    },

    {
        question: "Which device helps filter network traffic?",
        options: [
            "Keyboard",
            "Monitor",
            "Firewall",
            "Printer"
        ],
        answer: 2
    },

    {
        question: "What is social engineering?",
        options: [
            "Manipulating people to reveal information",
            "Building computer networks",
            "Writing software",
            "Repairing hardware"
        ],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answeredCount = 0;
let notAnsweredCount = 0;
let timer;
let timeLeft = 10;
let selectedAnswer = false;

function startQuiz() {

    currentQuestion = 0;
    score = 0;
    answeredCount = 0;
    notAnsweredCount = 0;

    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");

    showQuestion();
}

function showQuestion() {

    clearInterval(timer);

    selectedAnswer = false;
    timeLeft = 10;

    const q = questions[currentQuestion];

    document.getElementById("question-number").textContent =
        `Question ${currentQuestion + 1}/${questions.length}`;

    document.getElementById("question").textContent = q.question;

    document.getElementById("timer").textContent = timeLeft;

    const optionsContainer = document.getElementById("options");

    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {

        const div = document.createElement("div");

        div.classList.add("option");
        div.textContent = option;

        div.onclick = function () {
            selectAnswer(index, div);
        };

        optionsContainer.appendChild(div);
    });

    document.getElementById("next-btn").disabled = true;

    startTimer();
}

function startTimer() {

    const progress = document.getElementById("timer-progress");

    progress.style.width = "100%";

    timer = setInterval(() => {

        timeLeft--;

        document.getElementById("timer").textContent = timeLeft;

        progress.style.width = `${timeLeft * 10}%`;

        if (timeLeft <= 0) {

            clearInterval(timer);

            if (!selectedAnswer) {
                notAnsweredCount++;
            }

            moveToNextQuestion();
        }

    }, 1000);
}

function selectAnswer(index, element) {

    if (selectedAnswer) return;

    selectedAnswer = true;

    clearInterval(timer);

    const correctAnswer = questions[currentQuestion].answer;

    if (index === correctAnswer) {
        score++;
    }

    element.classList.add("selected");

    answeredCount++;

    document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {

    clearInterval(timer);

    moveToNextQuestion();
}

function moveToNextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResults();

    }
}

function showResults() {

    clearInterval(timer);

    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    document.getElementById("score").textContent =
        `Your Score: ${score}/${questions.length}`;

    document.getElementById("answered").textContent =
        answeredCount;

    document.getElementById("not-answered").textContent =
        notAnsweredCount;

    document.getElementById("pending").textContent = "0";
}

function restartQuiz() {

    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
}
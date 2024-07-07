/*  Description: Quiz game with WebSocket communication
*   Author: Manuel Ziel
*   Last Update: 2024/07/06
*   Version: 0.0.1 alpha02
*   License: MIT
*/

// Quiz strings data
const stringText = {

    // Header
    headerStartQuiz: "LiLO-Politik Quiz",

    // Buttons
    buttonNewLiLOQuiz: "LiLO",
    buttonNewLHLQuiz: "LHL",
    buttonNewMasterQuiz: "Lokaler Meister",
    buttonQuit: "Beenden",
    buttonSkip: "Überspringen ➔",

    // Meta
    metaStartQuiz: "Wähle dein Quiz aus",

    // Console messages
    consoleQuizStarted: "Quiz gestartet",
    consoleQuizEnded: "Quiz beendet",
    consoleQuizSkipped: "Frage übersprungen",
    consoleCorrectAnswer: "Richtig",
    consoleWrongAnswer: "Falsch",
}

// WebSocket Objects
const WEB_SOCKET = Object.freeze({

    // Tone
    //toneURLLocalhost: "ws://localhost:1880/tone",
    toneURLLocalhost: "ws://lilo:1880/tone",
    tonePush: "push",
    toneCorrectAnswer: "correct answer",
    toneWrongAnswer: "wrong answer",
    toneEnd: "end",
    tone: "tone",

    // Print
    //printURLLocalhost: "ws://localhost:1880/print",
    printURLLocalhost: "ws://lilo:1880/print",
    print: "print",

    // Commands
    //commandURLLocalhost: "ws://localhost:1880/command",
    commandURLLocalhost: "ws://lilo:1880/command",
    commandPowerOff: "poweroff",
});

// Quiz Object types data
const QUIZ_TYPES = Object.freeze({

    quizTypeLiLO: "LiLO",
    quizTypeLHL: "LHL",
    quizTypeMaster: "Master",
});

// Get Elements from the DOM
const questionElement = document.getElementById('question-header');
const questionMeta = document.getElementById('question-meta');
const answerButtons = document.getElementById('answer-buttons');
const firstButton = document.getElementById('first-btn');
const secondButton = document.getElementById('second-btn');
const thirdButton = document.getElementById('third-btn');

// Quiz variables data
let quiz;
let webSocketTone;
let webSocketPrint;
let webSocketCommand;
let countdownTime = 25;
const maxLiLOQuestions = 16;
const maxLHLQuestions = 16;
const maxMasterQuestions = 32;
let questionElementCounter = 0;
let countdownTimerQuestionElement = 0;

// Initialize the quiz
function initQuiz() {
    quiz = null;
    questionElement.textContent = stringText.headerStartQuiz;
    questionMeta.textContent = stringText.metaStartQuiz;
    firstButton.textContent = stringText.buttonNewLiLOQuiz;
    secondButton.textContent = stringText.buttonNewLHLQuiz;
    thirdButton.textContent = stringText.buttonNewMasterQuiz;
    firstButton.classList.remove('hide');
    secondButton.classList.remove('hide');
    thirdButton.classList.remove('hide');
    answerButtons.classList.add('hide');
}
initQuiz();

// Initialize the WebSocket connections
const initWebSocket = () => {

    console.log('Initialize WebSocket connections');

    if (!webSocketTone) {
        webSocketTone = new WebSocketConnection(WEB_SOCKET.toneURLLocalhost);
        webSocketTone.openWebSocket();
    }

    if (!webSocketPrint) {
        webSocketPrint = new WebSocketConnection(WEB_SOCKET.printURLLocalhost);
        webSocketPrint.openWebSocket();
    }

    if (!webSocketCommand) {
        webSocketCommand = new WebSocketConnection(WEB_SOCKET.commandURLLocalhost);
        webSocketCommand.openWebSocket();
    }
}
initWebSocket();


// Check and reopen WebSocket connections
const checkAndReopenWebSocket = () => {

    //console.log('Check WebSocked connections...');
    if (webSocketTone && !webSocketTone.isConnected()) {
        webSocketTone.reopenWebSocket();
    }

    if (webSocketPrint && !webSocketPrint.isConnected()) {
        webSocketPrint.reopenWebSocket();
    }

    if (webSocketCommand && !webSocketCommand.isConnected()) {
        webSocketCommand.reopenWebSocket();
    }
}

// Check and reopen WebSocket connections
setInterval(checkAndReopenWebSocket, 10000);

// Handle Elements
function initEventListeners() {
    questionElement.addEventListener('click', handleQuestionElement);
    firstButton.addEventListener('click', handleFirstButton);
    secondButton.addEventListener('click', handleSecondButton);
    thirdButton.addEventListener('click', handleThirdButton);
}
initEventListeners();

// Handle question element
function handleQuestionElement() {

    questionElementCounter++;

    if (questionElementCounter >= 10) {

        webSocketCommand.sendMessage('poweroff');
        questionElementCounter = 0;
        clearTimeout(countdownTimerQuestionElement);

    } else {

        clearTimeout(countdownTimerQuestionElement)
        countdownTimerQuestionElement = setTimeout(() => {
            questionElementCounter = 0;
        }, 20000);
    }
}

// Handle first button
function handleFirstButton() {

    if (firstButton.textContent === stringText.buttonNewLiLOQuiz) {

        if (quiz) {
            quiz.endQuiz();
        }

        quiz = new Quiz(quizDataLiLO, QUIZ_TYPES.quizTypeLiLO, countdownTime, webSocketTone, webSocketPrint);
        webSocketTone.sendMessage(WEB_SOCKET.tonePush);
        quiz.startQuiz();

    } else if (firstButton.textContent === stringText.buttonQuit) {

        webSocketTone.sendMessage(WEB_SOCKET.tonePush);
        quiz.endQuiz();
    }
}

// Handle second button
function handleSecondButton() {

    if (secondButton.textContent === stringText.buttonSkip) {

        webSocketTone.sendMessage(WEB_SOCKET.tonePush);
        quiz.countdownOverrun = false;
        quiz.setNextQuestion();

    } else if (secondButton.textContent === stringText.buttonNewLHLQuiz) {

        if (quiz) {
            quiz.endQuiz();
        }

        quiz = new Quiz(quizDataLHL, QUIZ_TYPES.quizTypeLHL, countdownTime, webSocketTone, webSocketPrint);
        webSocketTone.sendMessage(WEB_SOCKET.tonePush);
        quiz.startQuiz();
    }
}

// Handle third button
function handleThirdButton() {

    if (quiz) {
        quiz.endQuiz();
    }

    quiz = new Quiz(quizDataMaster, QUIZ_TYPES.quizTypeMaster, countdownTime, webSocketTone, webSocketPrint);
    webSocketTone.sendMessage(WEB_SOCKET.tonePush);
    quiz.startQuiz();
}

// Quiz class
class Quiz {

    constructor(questions, quizType, countdownTime, webSocketTone, webSocketPrint) {
        this.questions = questions;
        this.quizType = quizType;
        this.shuffledQuestions = [];
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.answersSummary = [];
        this.countdownTimer = null;
        this.countdownTime = countdownTime;
        this.countdownOverrun = false;
        this.webSocketTone = webSocketTone;
        this.webSocketPrint = webSocketPrint;
    }

    // Start the quiz
    startQuiz() {

        switch (this.quizType) {

            case QUIZ_TYPES.quizTypeLiLO:
                this.shuffledQuestions = this.shuffle(this.questions, maxLiLOQuestions);
                break;

            case QUIZ_TYPES.quizTypeLHL:
                this.shuffledQuestions = this.shuffle(this.questions, maxLHLQuestions);
                break;

            case QUIZ_TYPES.quizTypeMaster:
                this.shuffledQuestions = this.shuffle(this.questions, maxMasterQuestions);
                break;

            default:
                break;
        }

        //this.shuffledQuestions = this.shuffle(this.questions);
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.answersSummary = [];
        this.countdownOverrun = false;
        this.countdownTimer = null;

        console.log(stringText.consoleQuizStarted);
        this.setNextQuestion();
        questionElement.classList.remove('hide');
        answerButtons.classList.remove('hide');
        secondButton.classList.remove('hide');
        firstButton.textContent = stringText.buttonQuit;
        secondButton.textContent = stringText.buttonSkip;
        thirdButton.classList.add('hide');
    }

    // Set the next question
    setNextQuestion() {

        this.resetState();

        if (this.currentQuestionIndex < this.shuffledQuestions.length) {
            this.showQuestion(this.shuffledQuestions[this.currentQuestionIndex], this.currentQuestionIndex + 1, this.shuffledQuestions.length);

        } else {
            this.showResult();
        }

        this.currentQuestionIndex++;
    }

    // Show question and answers
    showQuestion(question, questionNumber, totalQuestions) {

        let countdown = countdownTime;

        questionElement.textContent = question.question;
        questionMeta.textContent = `Frage ${questionNumber} / ${totalQuestions} du hast noch ${countdown} Sekunden`;

        console.log(`Frage ${questionNumber} / ${totalQuestions}: ${question.question}`);
        console.log('Was ist die richtige Antwort? ' + question.options.join(', '));

        question.options.forEach((option, index) => {

            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('btn');
            button.addEventListener('click', () => {
                this.countdownOverrun = false;
                clearInterval(this.countdownTimer);
                this.selectAnswer(index, question.correctAnswerIndex, question.question, option, question.options[question.correctAnswerIndex]);
            });

            answerButtons.appendChild(button);
        });

        this.startCountdown(countdown, question, questionNumber, totalQuestions);
    }

    // Start the countdown
    startCountdown(countdown, question, questionNumber, totalQuestions) {
        this.countdownTimer = setInterval(() => {
            countdown--;
            questionMeta.textContent = `Frage ${questionNumber} / ${totalQuestions} du hast noch ${countdown} Sekunden`;

            if (countdown <= 0 && !this.countdownOverrun) {
                this.countdownOverrun = true;
                clearInterval(this.countdownTimer);
                this.selectAnswer(-1, question.correctAnswerIndex, question.question, 'Zeit abgelaufen', question.options[question.correctAnswerIndex]);
            } else if (countdown <= 0 && this.countdownOverrun) {
                this.endQuiz();
            }
        }, 1000);
    }

    // Reset the state of the quiz
    resetState() {

        clearInterval(this.countdownTimer);
        this.clearStatusClass(document.body);

        while (answerButtons.firstChild) {

            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    // Select the answer
    selectAnswer(index, correctIndex, questionText, selectedOption, correctOption) {

        const correct = index === correctIndex;

        this.answersSummary.push({

            question: questionText,
            selectedOption: selectedOption,
            correctOption: correctOption,
            correct: correct
        });

        Array.from(answerButtons.children).forEach(button => {

            this.setStatusClass(button, button.textContent === correctOption ? 'correct' : 'wrong');
        });

        if (correct) {

            this.correctAnswers++;
            this.setStatusClass(document.body, 'correct');
            console.log(stringText.consoleCorrectAnswer);
            this.webSocketTone.sendMessage(WEB_SOCKET.toneCorrectAnswer);

        } else {
            this.setStatusClass(document.body, 'wrong');
            console.log(stringText.consoleWrongAnswer);
            this.webSocketTone.sendMessage(WEB_SOCKET.toneWrongAnswer);
        }

        this.countdownTimer = setTimeout(() => {
            this.setNextQuestion();
        }, 4000);
    }

    // Show the result
    showResult() {
        this.countdownOverrun = false;
        clearInterval(this.countdownTimer);

        answerButtons.classList.add('hide');
        secondButton.classList.add('hide');
        questionElement.textContent = 'Quiz beendet'; // TODO more text
        questionMeta.textContent = `Du hast ${this.correctAnswers} / ${this.shuffledQuestions.length} Fragen richtig beantwortet.`;
        console.log(`Du hast ${this.correctAnswers} / ${this.shuffledQuestions.length} Fragen richtig beantwortet.`);
        this.saveAndPrintSummary();
        this.webSocketTone.sendMessage(WEB_SOCKET.toneEnd);

        this.countdownTimer = setTimeout(() => {
            this.endQuiz();
        }, 10000);
    }

    // End the quiz
    endQuiz() {
        
        console.log(stringText.consoleQuizEnded);
        this.resetState();
        initQuiz();
    }

    // Save and print the summary
    saveAndPrintSummary() {
        let summaryText;

        switch (quiz.quizType) {

            case QUIZ_TYPES.quizTypeLiLO:
                summaryText = getLiLOSummaryPrintText(this.correctAnswers, this.shuffledQuestions);
                break;

            case QUIZ_TYPES.quizTypeLHL:
                summaryText = getLHLSummaryPrintText(this.correctAnswers, this.shuffledQuestions);
                break;

            case QUIZ_TYPES.quizTypeMaster:
                summaryText = getMasterSummaryPrintText(this.correctAnswers, this.shuffledQuestions);
                break;

            default:
                break;
        }

        this.webSocketPrint.sendMessage(summaryText);
    }

    // Set the status class
    setStatusClass(element, status) {

        element.classList.add(status);
    }

    // Clear the status class
    clearStatusClass(element) {

        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    // Fisher-Yates algorithm for shuffling
    shuffle(array, maxQuestions) {

        //return array.sort(() => Math.random() - 0.5);

        for (let i = array.length - 1; i > 0; i--) {
            // Pick a random index from 0 to i
            let j = Math.floor(Math.random() * (i + 1));
            // Swap elements array[i] and array[j]
            [array[i], array[j]] = [array[j], array[i]];
        }
        //return array;
        return array.slice(0, maxQuestions);
    }
};
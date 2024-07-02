const stringText = {
    headerStartQuiz: "LiLO Ortenau Quiz",
    buttonNewLiLOQuiz: "LiLO Quiz",
    buttonNewLHLQuiz: "LHL Quiz",
    buttonNewFunnyQuiz: "Funny Quiz",
    metaStartQuiz: "Wähle ein Quiz aus",
    buttonQuit: "Beenden",
    buttonSkip: "Überspringen",

    consoleQuizStarted: "Quiz gestartet",
}

// Get Elements from the DOM
const questionElement = document.getElementById('question-header');
const questionMeta = document.getElementById('question-meta');
const answerButtons = document.getElementById('answer-buttons');
const firstButton = document.getElementById('first-btn');
const secondButton = document.getElementById('second-btn');
const thirdButton = document.getElementById('third-btn');

let shuffledQuestions, currentQuestionIndex;
let correctAnswers = 0;
let answersSummary = [];

// Initialize the quiz
function initQuiz() {
    questionElement.textContent = stringText.headerStartQuiz;
    questionMeta.textContent = stringText.metaStartQuiz;
    firstButton.textContent = stringText.buttonNewLiLOQuiz;
    secondButton.textContent = stringText.buttonNewLHLQuiz;
    thirdButton.textContent = stringText.buttonNewFunnyQuiz;
    answerButtons.classList.add('hide');
    shuffledQuestions = null;
    currentQuestionIndex = null;
    correctAnswers = 0;
    answersSummary = [];
};
initQuiz();

// Event listeners start button
firstButton.addEventListener('click', () => {
    if (firstButton.textContent === stringText.buttonNewLiLOQuiz) {
        startQuiz();
        return;
    } if (firstButton.textContent === stringText.buttonQuit) {
        endQuiz();
        return;
    }
});

// Event listeners skip button
secondButton.addEventListener('click', () => {
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        showResult();
    }
});

// Quiz initialization
function startQuiz() {
    shuffledQuestions = shuffle(quizDataLiLO);
    currentQuestionIndex = 0;
    correctAnswers = 0;
    answersSummary = [];

    setNextQuestion();

    console.log(stringText.consoleQuizStarted);
    questionElement.classList.remove('hide');
    answerButtons.classList.remove('hide');
    secondButton.classList.remove('hide');

    firstButton.textContent = stringText.buttonQuit;
}

// Shuffle questions
function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex], currentQuestionIndex + 1, shuffledQuestions.length);
    } else {
        showResult();
    }
    currentQuestionIndex++;
}

// Show question
function showQuestion(question, questionNumber, totalQuestions) {
    questionElement.textContent = question.question;
    questionMeta.textContent = `Frage ${questionNumber} von ${totalQuestions}`;
    console.log(`Frage ${questionNumber} von ${totalQuestions}: ${question.question}`);
    console.log(question.question);
    console.log('Was ist die richtige Antwort? ' + question.options.join(', '));
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(index, question.correctAnswerIndex, question.question, option, question.options[question.correctAnswerIndex]));
        answerButtons.appendChild(button);
    });
}

// Reset the state
function resetState() {
    clearStatusClass(document.body);
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    };
}

// Select answer
function selectAnswer(index, correctIndex, questionText, selectedOption, correctOption) {
    const correct = index === correctIndex;

    answersSummary.push({
        question: questionText,
        selectedOption: selectedOption,
        correctOption: correctOption,
        correct: correct
    });

    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.textContent === correctOption ? 'correct' : 'wrong');
    });

    if (correct) {
        correctAnswers++;
        setStatusClass(document.body, 'correct');
        console.log('Correct answer');

    } else {
        setStatusClass(document.body, 'wrong');
        console.log('Wrong answer');
    }

    setTimeout(() => {
        setNextQuestion();
    }, 2000);
}

// Show result
function showResult() {
    answerButtons.classList.add('hide');
    secondButton.classList.add('hide');
    firstButton.textContent = stringText.buttonNewLiLOQuiz;
    questionElement.textContent = 'Quiz beendet';
    questionMeta.textContent = `Du hast ${correctAnswers} von ${shuffledQuestions.length} Fragen richtig beantwortet.`;
    console.log(`Du hast ${correctAnswers} von ${shuffledQuestions.length} Fragen richtig beantwortet.`);
    saveAndPrintSummary();

    setTimeout(() => {
        endQuiz();
    }, 20000);
}

// End Quiz
function endQuiz() {
    console.log('Quiz ended');
    console.log('Correct answers: ' + correctAnswers);
    console.log('Answers summary: ' + answersSummary);
    resetState();
    initQuiz();
}

// Save summary to a text file
function saveAndPrintSummary() {
    let summaryText = 'Quiz Zusammenfassung\n\nRichtige Antworten: ' + correctAnswers + ' von ' + shuffledQuestions.length + '\n\n';
    answersSummary.forEach((entry, index) => {
        summaryText += `Frage ${index + 1}: ${entry.question}\n`;
        summaryText += `Deine Antwort: ${entry.selectedOption}\n`;
        summaryText += `Richtige Antwort: ${entry.correctOption}\n`;
        summaryText += entry.correct ? 'Richtig\n\n' : 'Falsch\n\n';
    });

    const blob = new Blob([summaryText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'quiz-summary.txt';
    link.click();
};

// Set status class
function setStatusClass(element, status) {
    element.classList.add(status);
}

// Clear status class
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// Shuffle the questions
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

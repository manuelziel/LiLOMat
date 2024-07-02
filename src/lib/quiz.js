const stringText = {
    headerStartQuiz: "LiLO Ortenau Quiz",
    buttonNewLiLOQuiz: "LiLO (kurz)",
    buttonNewLHLQuiz: "LHL (kurz)",
    buttonNewFunnyQuiz: "Alles",
    metaStartQuiz: "Wähle ein Quiz aus",
    buttonQuit: "Beenden",
    buttonSkip: "Überspringen",
    consoleQuizStarted: "Quiz gestartet",
    consoleQuizEnded: "Quiz beendet",
    consoleQuizSkipped: "Frage übersprungen",
    consoleCorrectAnswer: "Richtig",
    consoleWrongAnswer: "Falsch",
}

// Get Elements from the DOM
const questionElement = document.getElementById('question-header');
const questionMeta = document.getElementById('question-meta');
const answerButtons = document.getElementById('answer-buttons');
const firstButton = document.getElementById('first-btn');
const secondButton = document.getElementById('second-btn');
const thirdButton = document.getElementById('third-btn');

let quiz;
let socketTone;
let socketPrint;

// Initialize the quiz
function initQuiz() {
    questionElement.textContent = stringText.headerStartQuiz;
    questionMeta.textContent = stringText.metaStartQuiz;
    firstButton.textContent = stringText.buttonNewLiLOQuiz;
    secondButton.textContent = stringText.buttonNewLHLQuiz;
    thirdButton.textContent = stringText.buttonNewFunnyQuiz;
    firstButton.classList.remove('hide');
    secondButton.classList.remove('hide');
    thirdButton.classList.remove('hide');
    answerButtons.classList.add('hide');
}
initQuiz();

// Envent listeners start button
firstButton.addEventListener('click', () => {
    if (firstButton.textContent === stringText.buttonNewLiLOQuiz) {
        quiz = new Quiz(quizDataLiLO, stringText.buttonQuit);
        quiz.webSocketTone('push');
        quiz.startQuiz();
    } else if (firstButton.textContent === stringText.buttonQuit) {
        quiz.webSocketTone('push');
        quiz.closeWebSocket();
        quiz.endQuiz();
    }
});

secondButton.addEventListener('click', () => {
    if (secondButton.textContent === stringText.buttonSkip) {
        quiz.httpPostTone('push');
        quiz.setNextQuestion();
    } else if (secondButton.textContent === stringText.buttonNewLHLQuiz) {
        quiz = new Quiz(quizDataLHL, stringText.buttonNewLHLQuiz);
        quiz.webSocketTone('push');
        quiz.startQuiz();
    }
});

thirdButton.addEventListener('click', () => {
    quiz = new Quiz(quizDataManu, stringText.buttonNewFunnyQuiz);
    quiz.webSocketTone('push');
    quiz.startQuiz();
});

// Quiz class
class Quiz {
    constructor(questions, quizType) {
        this.questions = questions;
        this.quizType = quizType;
        this.shuffledQuestions = [];
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.answersSummary = [];
        this.socketTone = socketTone;
        this.socketPrint = socketPrint;
    }

    startQuiz() {
        this.shuffledQuestions = this.shuffle(this.questions);
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.answersSummary = [];

        console.log(stringText.consoleQuizStarted);
        this.setNextQuestion();
        questionElement.classList.remove('hide');
        answerButtons.classList.remove('hide');
        secondButton.classList.remove('hide');
        firstButton.textContent = stringText.buttonQuit;
        secondButton.textContent = stringText.buttonSkip;
        thirdButton.classList.add('hide');
    }

    setNextQuestion() {
        this.resetState();
        if (this.currentQuestionIndex < this.shuffledQuestions.length) {
            this.showQuestion(this.shuffledQuestions[this.currentQuestionIndex], this.currentQuestionIndex + 1, this.shuffledQuestions.length);
        } else {
            this.showResult();
        }
        this.currentQuestionIndex++;
    }

    showQuestion(question, questionNumber, totalQuestions) {
        questionElement.textContent = question.question;
        questionMeta.textContent = `Frage ${questionNumber} von ${totalQuestions}`;
        console.log(`Frage ${questionNumber} von ${totalQuestions}: ${question.question}`);
        console.log('Was ist die richtige Antwort? ' + question.options.join(', '));
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('btn');
            button.addEventListener('click', () => this.selectAnswer(index, question.correctAnswerIndex, question.question, option, question.options[question.correctAnswerIndex]));
            answerButtons.appendChild(button);
        });
    }

    resetState() {
        this.clearStatusClass(document.body);
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

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

            this.webSocketTone('correct answer');
        } else {
            this.setStatusClass(document.body, 'wrong');
            console.log(stringText.consoleWrongAnswer);

            this.webSocketTone('wrong answer');
        }

        setTimeout(() => {
            this.setNextQuestion();
        }, 2000);
    }

    showResult() {
        answerButtons.classList.add('hide');
        secondButton.classList.add('hide');
        questionElement.textContent = 'Quiz beendet';
        questionMeta.textContent = `Du hast ${this.correctAnswers} von ${this.shuffledQuestions.length} Fragen richtig beantwortet.`;
        console.log(`Du hast ${this.correctAnswers} von ${this.shuffledQuestions.length} Fragen richtig beantwortet.`);
        this.saveAndPrintSummary();
        this.webSocketTone('end');

        setTimeout(() => {
            this.endQuiz();
        }, 20000);
    }

    endQuiz() {
        console.log(stringText.consoleQuizEnded);
        this.resetState();
        initQuiz();
    }

    saveAndPrintSummary() {
        let summaryText;
        let germanCharSet = '\x1B\x74\x00';
        let bigFont = '\x1B\x21\x30';
        let smallFont = '\x1B\x21\x00';
        let doubleHeight = '\x1b\x21\x11';
        let normalHeight = '\x1b\x21\x00';
        let left = '\x1B\x61\x00';
        let center = '\x1B\x61\x01';
        let right = '\x1B\x61\x02';
        let bolt = '\x1B\x45\x01';
        let noBolt = '\x1B\x45\x00';
        let underlined = '\x1B\x2D\x01';
        let noUnderlined = '\x1B\x2D\x00';
        let inverted = '\x1D\x42\x01';
        let noInverted = '\x1D\x42\x00';

        summaryText = germanCharSet;
        summaryText += bigFont + doubleHeight + center;
        summaryText += 'LILO\n';
        summaryText += smallFont + normalHeight + inverted;
        summaryText += '\n';
        summaryText += '  Zusammenfassung  \n';
        summaryText += left + noInverted;
        summaryText += '\n'
        summaryText += 'Richtige Antworten: ' + this.correctAnswers + ' von ' + this.shuffledQuestions.length + '\n';
        summaryText += 'Du bist der Beste!\n';
        summaryText += 'Vielen Dank für deine Teilnahme\n';
        summaryText += '\n';
        summaryText += 'Wenn du mehr erfahren\n';
        summaryText += 'möchtest, besuche uns auf\n';
        summaryText += 'www.Liste-Lebenswerte-Ortenau.de\n';
        summaryText += '\n';
        summaryText += underlined + center;
        summaryText += 'Spenden\n';
        summaryText += left + noUnderlined;
        summaryText += 'Sparkasse Offenburg\n';
        summaryText += 'IBAN:\n';
        summaryText += 'DE48 6645 0050 0004 9817 01\n';
        summaryText += 'BIC:\n';
        summaryText += 'SOLADES1OFG\n';
        summaryText += '\n';
        summaryText += 'Oder per PayPal\n';
        summaryText += 'Vielen Dank für deine\n';
        summaryText += 'Unterstützung\n';
        summaryText += '\n\n\n\n\n';

        /*
        this.answersSummary.forEach((entry, index) => {
            summaryText += `Frage ${index + 1}: ${entry.question}\n`;
            summaryText += `Deine Antwort: ${entry.selectedOption}\n`;
            summaryText += `Richtige Antwort: ${entry.correctOption}\n`;
            summaryText += entry.correct ? 'Richtig\n\n' : 'Falsch\n\n';
        });*/

        this.webSocketPrint(summaryText);
    }

    setStatusClass(element, status) {
        element.classList.add(status);
    }

    clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    webSocketTone(message) {
        try {
            if (!this.socketTone || this.socketTone.readyState !== WebSocket.OPEN) {
                this.socketTone = new WebSocket('ws://192.168.0.4:1880/tone');
                // const socket = new WebSocket('ws://localhost:1880/tone');

                this.socketTone.onopen = (event) => {
                    //console.log('Start WebSocket connection', event);
                    this.socketTone.send(message);
                };

                /*this.socket.onmessage = function(event) {
                    console.log('Recive Message from Server:', event.data);
                };*/

                this.socketTone.onerror = (error) => {
                    console.error('WebSocket Error:', error);
                };

                /*this.socketTone.onclose = (event) => {
                    //console.log('WebSocket connection closed:', event.code, event.reason);
                };*/

            } else {
                this.socketTone.send(message);
            }
        } catch (error) {
            console.error('WebSocket Error:', error);
        }
    }

    webSocketPrint(message) {
        try {
            if (!this.socketPrint || this.socketPrint.readyState !== WebSocket.OPEN) {
                this.socketPrint = new WebSocket('ws://192.168.0.4:1880/print');
                // const socket = new WebSocket('ws://localhost:1880/print');

                this.socketPrint.onopen = (event) => {
                    //console.log('Start WebSocket connection', event);
                    this.socketPrint.send(message);
                };

                /*this.socket.onmessage = function(event) {
                    console.log('Recive Message from Server:', event.data);
                };*/

                this.socketPrint.onerror = (error) => {
                    console.error('WebSocket Error:', error);
                };

                /*this.socketPrint.onclose = (event) => {
                    //console.log('WebSocket connection closed:', event.code, event.reason);
                };*/

            } else {
                this.socketPrint.send(message);
            }
        } catch (error) {
            console.error('WebSocket Error:', error);
        }
    }

    closeWebSocket() {
        try {
            if (this.socketTone && this.socketTone.readyState === WebSocket.OPEN) {
                this.socketTone.close();
            }

            if (this.socketPrint && this.socketPrint.readyState === WebSocket.OPEN) {
                this.socketPrint.close();
            }

        } catch (error) {
            console.error('WebSocket Error:', error);
        }
    }
};
const quizDataLHL = [
    {
        "question": "Was ist das Hauptziel der Liste Lebenswerte Ortenau?",
        "options": ["Umweltschutz", "Gesundheitsversorgung", "Bildung", "Wirtschaftsförderung"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Welcher Ort in der Ortenau hat das größte Krankenhaus?",
        "options": ["Offenburg", "Lahr", "Kehl", "Achern"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Welche Maßnahme plant die Ortenau zur Verbesserung des Nahverkehrs?",
        "options": ["Mehr Buslinien", "Fahrradverleihsystem", "Neue Zugstrecken", "Carsharing"],
        "correctAnswerIndex": 2
    },
];

// LHLSummaryPrintText
function getLHLSummaryPrintText(correctAnswers, shuffledQuestions) {
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
    summaryText += 'LHL - Liste Haslach Lebenswert\n';
    summaryText += smallFont + normalHeight + inverted;
    summaryText += '\n';
    summaryText += '  Zusammenfassung  \n';
    summaryText += left + noInverted;
    summaryText += '\n'
    summaryText += 'Richtige Antworten: ' + correctAnswers + ' von ' + shuffledQuestions.length + '\n';
    summaryText += 'Du bist der Beste!\n';
    summaryText += 'Vielen Dank für deine Teilnahme\n';
    summaryText += '\n';
    summaryText += 'Wenn du mehr erfahren möchtest,\n';
    summaryText += 'besuche uns auf\n';
    summaryText += 'www.Liste-Haslach-Lebenswert.de\n';
    summaryText += '\n';
    summaryText += underlined + center;
    summaryText += 'Spenden\n';
    summaryText += left + noUnderlined;
    summaryText += 'Sparkasse Offenburg\n';
    summaryText += 'IBAN:\n';
    summaryText += 'DE75 6645 0050 0004 9895 57\n';
    summaryText += 'BIC:\n';
    summaryText += 'SOLADES1OFG\n';
    summaryText += '\n';
    summaryText += 'Oder per PayPal\n';
    summaryText += 'Vielen Dank für deine\n';
    summaryText += 'Unterstützung\n';
    summaryText += '\n\n\n';

    return summaryText;
};
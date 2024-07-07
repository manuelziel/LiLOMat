const quizDataLHL = [
    {
        "question": "Welche Maßnahme unterstützt LHL zur Luftqualität?",
        "options": ["Mehr Solaranlagen", "Mehr Automobilverkehr", "Innenstadtbegrünung", "Weniger Baumbestände"],
        "correctAnswerIndex": 2
    },
    {
        "question": "Wie geht die LHL mit dem Thema Leerstand von Wohnungen um?",
        "options": ["Nichts", "Kommunen als Vermieter", "Steuererhöhung", "Enteignungen"],
        "correctAnswerIndex": 1
    },
    {
        "question": "Welche Bauplanung fordert die LHL für Haslach?",
        "options": ["Mehr Einfamilienhäuser", "Innenstadtbegrünung", "Hochhäuser", "Einkaufszentren",],
        "correctAnswerIndex": 1
    },
    {
        "question": "Welche Art von Energieerzeugung priorisiert die LiLO vor anderen?",
        "options": ["Wasserkraft", "Photovoltaik", "Windkraft", "Biogas"],
        "correctAnswerIndex": 1
    },
    {
        "question": "Was fordert die LHL für finanziell schwache Menschen in Bezug auf Wohnraum?",
        "options": ["Großwohnsiedlungen", "bezahlbaren Wohnraum", "Keine speziellen Maßnahmen", "Wohnungsbörse"],
        "correctAnswerIndex": 1
    },
    {
        "question": "Welche Struktur oder Förderung fordert die Liste Haslach lebenswert zur Unterstützung lokaler Unternehmen?",
        "options": ["Großkonzerne", "kleine Betriebe", "Keine", "Verlagerung"],
        "correctAnswerIndex": 1
    },
    {
        "question": "Welche Maßnahme unterstützt die Liste Haslach lebenswert zur Verbesserung der Nahversorgung?",
        "options": ["Mehr Supermärkte am Stadtrand", "Förderung lokaler Märkte und Geschäfte", "Weniger Einkaufsmöglichkeiten", "Mehr Online-Shopping"],
        "correctAnswerIndex": 1
    },
    {
        "question": "Welche Verkehrslösung wird von der Liste Haslach lebenswert bevorzugt?",
        "options": ["Mehr Autobahnen", "Ausbau des öffentlichen Nahverkehrs", "Erhöhung der Benzinpreise","Weniger Fahrradwege"],
        "correctAnswerIndex": 1
    }
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
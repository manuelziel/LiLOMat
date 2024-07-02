/*--------------------------------------------------------------
>>> TABLE OF CONTENTS:
----------------------------------------------------------------
# 1. Gesundheitsversorgung
# 2. Demokratie
# 3. Tiefengeothermie
--------------------------------------------------------------*/


const quizDataLiLO = [
    /*--------------------------------------------------------------
    # 1. Gesundheitsversorgung
    --------------------------------------------------------------*/
    {
        "question": "Wieviel Krankenhäuser wurden im Kreis geschlossen?",
        "options": ["Keines", "1", "3", "5"],
        "correctAnswerIndex": 2
    },
    {
        "question": "Wie hoch waren die Verluste der MVZ im Jahr 2022?",
        "options": ["1,65 Millionen €", "20 Tausend €", "150 Tausend €", "1 Millionen €"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Wie viel Geld muss der Kreis im Jahr 2024 zusätzlich investieren, um den Betrieb der MVZs aufrechtzuerhalten?",
        "options": ["1,65 Millionen €", "150 Tausend €", "2,3 Millionen €", "3 Millionen €"],
        "correctAnswerIndex": 2
    },
    {
        "question": "Was braucht es um Kliniken schließen oder errichten zu können?",
        "options": ["Finanzierungsplan", "Personalkonzept", "Bedarfsanalyse", "Gesundheitsgutachten"],
        "correctAnswerIndex": 2
    },
    {
        "question": "Wie hießt der Klinikgeschäftsführer, der das Ortenau Klinikum verlassen hat?",
        "options": ["Christian Keller", "Yannik Hinzmann", "Frank Scherer", "Morar Mutter"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Welche Krankenhausstruktur fordert LiLO zur Sicherung der Grundversorgung im Kreis?",
        "options": ["Zentrale", "Dezentrale", "Mobile", "Virtuelle"],
        "correctAnswerIndex": 1
    },
    {
        "question": "Wie hoch sind die Parkkosten für MVZ Mitarbeiter in Lahr ohne Rabattkarten pro Monat?",
        "options": ["5 €", "100 €", "150 €", "200 €"],
        "correctAnswerIndex": 3
    },
    {
        "question": "Welcher Ort in der Ortenau hat das größte Krankenhaus?",
        "options": ["Offenburg", "Lahr", "Kehl", "Achern"],
        "correctAnswerIndex": 0
    },
    /*--------------------------------------------------------------
    # 2. Demokratie
    --------------------------------------------------------------*/
    {
        "question": "Was fordert die LiLO für zukünftige Landratswahlen?",
        "options": ["Direktwahl durch Bevölkerung", "Wahl durch Bürgermeister", "Ernennung durch Kreistag", "Geheime Absprachen"],
        "correctAnswerIndex": 0
    },
    /*--------------------------------------------------------------
    # 3. Tiefengeothermie
    --------------------------------------------------------------*/
    {
        "question": "Neben Öl und Gas soll in Neuried Altenheim auch welches begehrte Material gefördert werden?",
        "options": ["Gold", "Silber", "Kupfer", "Lithium"],
        "correctAnswerIndex": 3
    },
    /*--------------------------------------------------------------
    # 11. Sonstiges
    --------------------------------------------------------------*/
    {
        "question": "Welche Steuer könnte durch Abschreibungen und Bilanztricks gesenkt werden?",
        "options": ["Einkommensteuer", "Mehrwertsteuer", "Gewerbesteuer", "Umsatzsteuer"],
        "correctAnswerIndex": 2
    },
    {
        "question": "Was ist das Hauptziel der LiLO?",
        "options": ["Umweltschutz", "Gesundheitsversorgung", "Bildung", "Wirtschaftsförderung"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Welche Verkehrswende-Maßnahme konnte die LiLO bereits erfolgreich durch Protestaktionen erreichen?",
        "options": ["30 € Monatsticket", "Mehr Seniorenparkplaetze", "Verbot von Privatautos in Innenstädten", "Verdoppelung der Parkgebühren"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Welches Menschenrecht nennt die LiLO in Bezug auf Mobilität?",
        "options": ["kostenlose Nutzung von Fahrraedern", "Gratis-Parkplätze", "barrierefreie Straßen", "Recht auf Mobilität"],
        "correctAnswerIndex": 3
    },
    {
        "question": "Was ist ein Zukunftsprojekt von LiLO für das Jahr 2030 im Bereich Verkehrswende?",
        "options": ["Autofreie Innenstadtviertel", "Bau von Wasserstrassen", "Reaktivierung der Straßenbahnlinien", "Verbot von Fahrradwegen"],
        "correctAnswerIndex": 2
    },
    {
        "question": "Was soll durch die Schaffung einer kreiseigenen Dachgesellschaft für Wohnungsbau erreicht werden?",
        "options": ["Luxuswohnungen", "bezahlbarer Wohnraum", "Wohngemeinschaften", "Gewerbeflächen"],
        "correctAnswerIndex": 1
    },
    /*--------------------------------------------------------------*/
    {
        "question": "Welche Maßnahme plant die Ortenau zur Verbesserung des Nahverkehrs?",
        "options": ["Mehr Buslinien", "Fahrradverleihsystem", "Neue Zugstrecken", "Carsharing"],
        "correctAnswerIndex": 2
    },
    {
        "question": "Welche Stadt ist bekannt für ihre Bemühungen im Klimaschutz in der Ortenau?",
        "options": ["Offenburg", "Kehl", "Oberkirch", "Gengenbach"],
        "correctAnswerIndex": 1
    },
    {
        "question": "Welche Art von Energie wird in der Ortenau stark gefördert?",
        "options": ["Windenergie", "Solarenergie", "Kernenergie", "Fossile Brennstoffe"],
        "correctAnswerIndex": 1
    },
    {
        "question": "Welches Projekt zur Förderung des Radverkehrs wurde kürzlich gestartet?",
        "options": ["Fahrradverleihsystem", "Neuer Fahrradweg", "Fahrradparkhäuser", "Fahrradkulturfestival"],
        "correctAnswerIndex": 1
    },
    {
        "question": "Wie unterstützt die Ortenau Familien?",
        "options": ["Kita-Ausbau", "Familienzentren", "Ferienprogramme", "Elterngeld"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Welche Maßnahmen werden zur Förderung der Elektromobilität ergriffen?",
        "options": ["Ladestationen", "Subventionen für Elektroautos", "E-Bike-Programme", "Elektrobusse"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Welche Stadt hat ein neues Klimaschutzkonzept entwickelt?",
        "options": ["Lahr", "Offenburg", "Achern", "Kehl"],
        "correctAnswerIndex": 3
    },
    {
        "question": "Welche Initiative fördert die regionale Wirtschaft in der Ortenau?",
        "options": ["Start-up Förderung", "Einkaufszentren", "Exportförderung", "Regionale Messen"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Welche Veranstaltung fördert das kulturelle Leben in der Ortenau?",
        "options": ["Stadtfeste", "Theaterfestivals", "Musikfestivals", "Kunstmärkte"],
        "correctAnswerIndex": 2
    },
    {
        "question": "Wie wird die Integration von Migranten in der Ortenau unterstützt?",
        "options": ["Sprachkurse", "Integrationszentren", "Jobvermittlung", "Interkulturelle Veranstaltungen"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Welche Stadt hat die meisten Parks und Grünflächen in der Ortenau?",
        "options": ["Lahr", "Offenburg", "Kehl", "Oberkirch"],
        "correctAnswerIndex": 1
    },
    {
        "question": "Wie unterstützt die Ortenau Senioren?",
        "options": ["Seniorenzentren", "Freizeitangebote", "Pflegedienste", "Bildungsangebote"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Welche Stadt in der Ortenau hat die schlechteste Luftqualität?",
        "options": ["Offenburg", "Lahr", "Kehl", "Oberkirch"],
        "correctAnswerIndex": 1
    },
    {
        "question": "Was sind die Hauptprobleme im öffentlichen Nahverkehr der Ortenau?",
        "options": ["Unpünktlichkeit", "Hohe Preise", "Überfüllung", "Schlechte Verbindungen"],
        "correctAnswerIndex": 3
    },
    {
        "question": "Welche Umweltprobleme sind in der Ortenau am gravierendsten?",
        "options": ["Luftverschmutzung", "Wasserverschmutzung", "Abholzung", "Bodenerosion"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Welches Bauprojekt in der Ortenau sorgt für die meisten Bürgerproteste?",
        "options": ["Neubau der B33", "Industriepark Offenburg", "Wohngebiete in Kehl", "Paul's' Sandburg"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Welche Herausforderung hat die Ortenau bei der Integration von Migranten?",
        "options": ["Sprachbarrieren", "Wohnungsknappheit", "Arbeitslosigkeit", "Diskriminierung"],
        "correctAnswerIndex": 1
    },
    {
        "question": "Welche Stadt in der Ortenau hat die höchste Arbeitslosenquote?",
        "options": ["Offenburg", "Lahr", "Kehl", "Oberkirch"],
        "correctAnswerIndex": 2
    },
    {
        "question": "Welches soziale Problem ist in der Ortenau am weitesten verbreitet?",
        "options": ["Alkoholismus", "Drogenmissbrauch", "Obdachlosigkeit", "Jugendkriminalität"],
        "correctAnswerIndex": 2
    },
    {
        "question": "Was ist der Hauptkritikpunkt an den Schulen in der Ortenau?",
        "options": ["Überfüllte Klassen", "Veraltete Ausstattung", "Lehrermangel", "Schlechte Gebäude"],
        "correctAnswerIndex": 1
    },
    {
        "question": "Welche Herausforderung gibt es im Bereich der Kinderbetreuung in der Ortenau?",
        "options": ["Zu wenige Kitas", "Hohe Kosten", "Unqualifiziertes Personal", "Kurze Öffnungszeiten"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Was ist das größte Problem in der Altenpflege in der Ortenau?",
        "options": ["Pflegemangel", "Hohe Kosten", "Schlechte Einrichtungen", "Mangelnde Unterstützung"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Welche Stadt in der Ortenau hat die meisten Verkehrsprobleme?",
        "options": ["Offenburg", "Lahr", "Kehl", "Achern"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Was ist der Hauptkritikpunkt an der digitalen Infrastruktur in der Ortenau?",
        "options": ["Langsame Internetverbindungen", "Hohe Kosten", "Mangelnde Verfügbarkeit", "Schlechte Wartung"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Welches Problem gibt es bei der Wasserversorgung in der Ortenau?",
        "options": ["Wasserverschmutzung", "Wassermangel", "Hohe Kosten", "Veraltete Infrastruktur"],
        "correctAnswerIndex": 3
    },
    {
        "question": "Welche Herausforderung gibt es bei der Energiewende in der Ortenau?",
        "options": ["Hohe Kosten", "Widerstand der Bürger", "Mangelnde Technologie", "Langsame Umsetzung"],
        "correctAnswerIndex": 1
    },
    {
        "question": "Was ist das größte Problem im Bereich Wohnungsbau in der Ortenau?",
        "options": ["Wohnungsknappheit", "Hohe Mieten", "Schlechte Bauqualität", "Lange Bauzeiten"],
        "correctAnswerIndex": 0
    },
    {
        "question": "Welche Maßnahme zur Verkehrsberuhigung ist in der Ortenau umstritten?",
        "options": ["Tempo-30-Zonen", "Verkehrsberuhigte Bereiche", "Einbahnstraßen", "Fahrradstraßen"],
        "correctAnswerIndex": 3
    },
];
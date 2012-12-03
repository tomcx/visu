/**
 * @author T.Schmidt
 * 
 * Meldetetxte
 * 
 * 
 *  1 - 20  Heizung
 * 21 - 40  Allgemein
 * 41 - 50  Wohnzimmer
 * 51 - 60  Flur
 * 61 - 70  Schlafzimmer
 * 71 - 80  Kinderzimmer
 * 81 - 90  Bad
 * 91 - 100 WC      
 * 
 */
                
VISU.init.meldtxt = function() {
    
    VISU.meldtxt = {
        1: {
            typ: 'Warnung',
            text: 'FBH Vorlauftemperatur > 45°C'
        },
        2: {
            typ: 'Alarm',
            text: 'FBH Vorlauftemperatur > 50°C'
        },
        3: {
            typ: 'Hinweis',
            text: 'Heizung erwärmt Wasserspeicher oder ist ausgeschaltet'
        },
        4: {
            typ: 'Alarm',
            text: 'FBH Thermoschalter Vorlauf ausgelöst oder Pumpenrelais defekt'
        },
        5: {
            typ: 'Alarm',
            text: 'FBH Vorlauftemp. Soll-Ist-Diff. länger als 15 Min. nicht ausgeregelt'
        },
        6: {
            typ: 'Hinweis',
            text: 'FBH ausgeschaltet, Minimaltemp. wird automatisch gehalten'
        },
        7: {
            typ: 'Warnung',
            text: 'FBH Auskühlschutz (14°C) deaktiviert, Frostschutz aktiv (5°C)'
        },
        8: {
            typ: 'Alarm',
            text: 'FBH Vorlauf Temperaturfühler defekt'
        },
        9: {
            typ: 'Alarm',
            text: 'FBH Pumpenrelais klebt'
        },
        10: {
            typ: 'Warnung',
            text: 'Minimaltemperatur in mindestens einem Raum unterschritten'
        },
        11: {
            typ: 'Hinweis',
            text: 'FBH Temperaturabsenkung aktiv'
        },
        21: {
            typ: 'Hinweis',
            text: 'Mindestens ein Rollladen im Handbetrieb'
        },
        22: {
            typ: 'Warnung',
            text: 'Mindestens ein Rollladen gesperrt'
        },
        23: {
            typ: 'Hinweis',
            text: 'Weihnachtsschaltung Automatikbetrieb aktiviert'
        },
        24: {
            typ: 'Warnung',
            text: 'Weihnachtsschaltung Testfunktion eingeschaltet'
        },
        25: {
            typ: 'Alarm',
            text: 'Fehler beim Einlesen der NOVRAM-Daten'
        },
        26: {
            typ: 'Alarm',
            text: 'Fehler beim Speichern der NOVRAM-Daten'
        },
        27: {
            typ: 'Alarm',
            text: 'Fehler beim Einlesen der Systemzeit'
        },
        28: {
            typ: 'Alarm',
            text: 'Fehler beim Speichern der persistenten Daten'
        },
        29: {
            typ: 'Alarm',
            text: 'Fehler beim Laden der persistenten Daten'
        },
        30: {
            typ: 'Alarm',
            text: 'Fehler beim Speichern der XML-Daten'
        },
        31: {
            typ: 'Alarm',
            text: 'Fehler beim Laden der XML-Daten'
        },
        41: {
            typ: 'Hinweis',
            text: 'Wohnzimmer Verschattung aktiviert'
        },
        42: {
            typ: 'Warnung',
            text: 'Warnung: Wohnzimmer Licht Automatik deaktiviert'
        },
        51: {
            typ: 'Warnung',
            text: 'Warnung: Flur Licht Automatik deaktiviert'
        },
        61: {
            typ: 'Hinweis',
            text: 'Schlafzimmer Verschattung aktiviert'
        },
        62: {
            typ: 'Warnung',
            text: 'Warnung: Schlafzimmer Licht Automatik deaktiviert'
        },
        71: {
            typ: 'Hinweis',
            text: 'Kinderzimmer Verschattung aktiviert'
        },
        72: {
            typ: 'Warnung',
            text: 'Warnung: Kinderzimmer Licht Automatik deaktiviert'
        },
        81: {
            typ: 'Alarm',
            text: 'Bad Lüfter max. Laufzeit (1 Stunde) überschritten'
        },
        82: {
            typ: 'Warnung',
            text: 'Warnung: Bad Licht Automatik deaktiviert'
        },
        91: {
            typ: 'Alarm',
            text: 'WC Lüfter max. Laufzeit (1 Stunde) überschritten'
        },
        92: {
            typ: 'Warnung',
            text: 'Warnung: Toilette Licht Automatik deaktiviert'
        }
    };
    
}

/**
 * @author T. Schmidt
 * 
 * Variablenlisten und Strukturefinitionen
 * 
 */
VISU.init.comm_def = function() {
    
    /*
     * Variablenlisten für Datenaustausch
     */

    //Variablenliste für Wohnungsanzeige
    VISU.comm.varRdWohnung = {
       // Parameter für Lesen
       addr: '%MB0',
       //debug: true,
       oc: VISU.anzeig.aktualAnzeig,
       id: 1,
       items:[{
                jvar: 'VISU.anzeig.fenst.kz.data',
                type: 'BOOL',
                addr: 0
            },{
                jvar: 'VISU.anzeig.fenst.sz.data',
                type: 'BOOL',
                addr: 1
            },{
                jvar: 'VISU.anzeig.fenst.wz.ostLi.data',
                type: 'BOOL',
                addr: 2
            },{
                jvar: 'VISU.anzeig.fenst.wz.ostRe.data',
                type: 'BOOL',
                addr: 3
            },{
                jvar: 'VISU.anzeig.fenst.wz.suedLi.data',
                type: 'BOOL',
                addr: 4
            },{
                jvar: 'VISU.anzeig.fenst.wz.suedRe.data',
                type: 'BOOL',
                addr: 5
            },{
                jvar: 'VISU.anzeig.fenst.wz.westLi.data',
                type: 'BOOL',
                addr: 6
            },{
                jvar: 'VISU.anzeig.fenst.wz.westRe.data',
                type: 'BOOL',
                addr: 7
            },{
                jvar: 'VISU.anzeig.fenst.fl.data',
                type: 'BOOL',
                addr: 8
            },{
                jvar: 'VISU.anzeig.fenst.wc.data',
                type: 'BOOL',
                addr: 9
            },{
                jvar: 'VISU.anzeig.fenst.ba.li.data',
                type: 'BOOL',
                addr: 10
            },{
                jvar: 'VISU.anzeig.fenst.ba.re.data',
                type: 'BOOL',
                addr: 11
            },{
                jvar: 'VISU.anzeig.tuer.kz.data',
                type: 'BOOL',
                addr: 12
            },{
                jvar: 'VISU.anzeig.tuer.sz.data',
                type: 'BOOL',
                addr: 13
            },{
                jvar: 'VISU.anzeig.tuer.szSchr.data',
                type: 'BOOL',
                addr: 14
            },{
                jvar: 'VISU.anzeig.tuer.fl.data',
                type: 'BOOL',
                addr: 15
            },{
                jvar: 'VISU.anzeig.tuer.wc.data',
                type: 'BOOL',
                addr: 16
            },{
                jvar: 'VISU.anzeig.tuer.ba.data',
                type: 'BOOL',
                addr: 17
            },{
                jvar: 'VISU.anzeig.temp.wz.data',
                type: 'INT1DP',
                addr: 18
            },{
                jvar: 'VISU.anzeig.temp.fl.data',
                type: 'INT1DP',
                addr: 20
            },{
                jvar: 'VISU.anzeig.temp.sz.data',
                type: 'INT1DP',
                addr: 22
            },{
                jvar: 'VISU.anzeig.temp.kz.data',
                type: 'INT1DP',
                addr: 24
            },{
                jvar: 'VISU.anzeig.temp.ba.data',
                type: 'INT1DP',
                addr: 26
            },{
                jvar: 'VISU.anzeig.temp.wc.data',
                type: 'INT1DP',
                addr: 28
            },{
                jvar: 'VISU.anzeig.sollTemp.wz.data',
                type: 'INT1DP',
                addr: 30
            },{
                jvar: 'VISU.anzeig.sollTemp.fl.data',
                type: 'INT1DP',
                addr: 32
            },{
                jvar: 'VISU.anzeig.sollTemp.sz.data',
                type: 'INT1DP',
                addr: 34
            },{
                jvar: 'VISU.anzeig.sollTemp.kz.data',
                type: 'INT1DP',
                addr: 36
            },{
                jvar: 'VISU.anzeig.sollTemp.ba.data',
                type: 'INT1DP',
                addr: 38
            },{
                jvar: 'VISU.anzeig.sollTemp.wc.data',
                type: 'INT1DP',
                addr: 40
            },{
                jvar: 'VISU.anzeig.rlf.wz.data',
                type: 'INT1DP',
                addr: 42
            },{
                jvar: 'VISU.anzeig.rlf.sz.data',
                type: 'INT1DP',
                addr: 46
            },{
                jvar: 'VISU.anzeig.rlf.ba.data',
                type: 'INT1DP',
                addr: 50
            },{
                jvar: 'VISU.anzeig.rollo.kz.pos',
                type: 'BYTE',
                addr: 70
            },{
                jvar: 'VISU.anzeig.rollo.sz.pos',
                type: 'BYTE',
                addr: 71
            },{
                jvar: 'VISU.anzeig.rollo.wz.ostLi.pos',
                type: 'BYTE',
                addr: 72
            },{
                jvar: 'VISU.anzeig.rollo.wz.ostRe.pos',
                type: 'BYTE',
                addr: 73
            },{
                jvar: 'VISU.anzeig.rollo.wz.suedLi.pos',
                type: 'BYTE',
                addr: 74
            },{
                jvar: 'VISU.anzeig.rollo.wz.suedRe.pos',
                type: 'BYTE',
                addr: 75
            },{
                jvar: 'VISU.anzeig.rollo.wz.westLi.pos',
                type: 'BYTE',
                addr: 76
            },{
                jvar: 'VISU.anzeig.rollo.wz.westRe.pos',
                type: 'BYTE',
                addr: 77
            },{
                jvar: 'VISU.anzeig.rollo.fl.pos',
                type: 'BYTE',
                addr: 78
            },{
                jvar: 'VISU.anzeig.rollo.wc.pos',
                type: 'BYTE',
                addr: 79
            },{
                jvar: 'VISU.anzeig.rollo.ba.li.pos',
                type: 'BYTE',
                addr: 80
            },{
                jvar: 'VISU.anzeig.rollo.ba.re.pos',
                type: 'BYTE',
                addr: 81
            },{
                jvar: 'VISU.anzeig.rollo.kz.modus',
                type: 'BYTE',
                addr: 82
            },{
                jvar: 'VISU.anzeig.rollo.sz.modus',
                type: 'BYTE',
                addr: 83
            },{
                jvar: 'VISU.anzeig.rollo.wz.ostLi.modus',
                type: 'BYTE',
                addr: 84
            },{
                jvar: 'VISU.anzeig.rollo.wz.ostRe.modus',
                type: 'BYTE',
                addr: 85
            },{
                jvar: 'VISU.anzeig.rollo.wz.suedLi.modus',
                type: 'BYTE',
                addr: 86
            },{
                jvar: 'VISU.anzeig.rollo.wz.suedRe.modus',
                type: 'BYTE',
                addr: 87
            },{
                jvar: 'VISU.anzeig.rollo.wz.westLi.modus',
                type: 'BYTE',
                addr: 88
            },{
                jvar: 'VISU.anzeig.rollo.wz.westRe.modus',
                type: 'BYTE',
                addr: 89
            },{
                jvar: 'VISU.anzeig.rollo.fl.modus',
                type: 'BYTE',
                addr: 90
            },{
                jvar: 'VISU.anzeig.rollo.wc.modus',
                type: 'BYTE',
                addr: 91
            },{
                jvar: 'VISU.anzeig.rollo.ba.li.modus',
                type: 'BYTE',
                addr: 92
            },{
                jvar: 'VISU.anzeig.rollo.ba.re.modus',
                type: 'BYTE',
                addr: 93
            },{
                jvar: 'VISU.anzeig.rollo.kz.auto',
                type: 'BOOL',
                addr: 94
            },{
                jvar: 'VISU.anzeig.rollo.sz.auto',
                type: 'BOOL',
                addr: 95
            },{
                jvar: 'VISU.anzeig.rollo.wz.ostLi.auto',
                type: 'BOOL',
                addr: 96
            },{
                jvar: 'VISU.anzeig.rollo.wz.ostRe.auto',
                type: 'BOOL',
                addr: 97
            },{
                jvar: 'VISU.anzeig.rollo.wz.suedLi.auto',
                type: 'BOOL',
                addr: 98
            },{
                jvar: 'VISU.anzeig.rollo.wz.suedRe.auto',
                type: 'BOOL',
                addr: 99
            },{
                jvar: 'VISU.anzeig.rollo.wz.westLi.auto',
                type: 'BOOL',
                addr: 100
            },{
                jvar: 'VISU.anzeig.rollo.wz.westRe.auto',
                type: 'BOOL',
                addr: 101
            },{
                jvar: 'VISU.anzeig.rollo.fl.auto',
                type: 'BOOL',
                addr: 102
            },{
                jvar: 'VISU.anzeig.rollo.wc.auto',
                type: 'BOOL',
                addr: 103
            },{
                jvar: 'VISU.anzeig.rollo.ba.li.auto',
                type: 'BOOL',
                addr: 104
            },{
                jvar: 'VISU.anzeig.rollo.ba.re.auto',
                type: 'BOOL',
                addr: 105
            },{
                jvar: 'VISU.anzeig.rollo.kz.xmas',
                type: 'BOOL',
                addr: 106
            },{
                jvar: 'VISU.anzeig.rollo.sz.xmas',
                type: 'BOOL',
                addr: 107
            },{
                jvar: 'VISU.anzeig.rollo.wz.ostLi.xmas',
                type: 'BOOL',
                addr: 108
            },{
                jvar: 'VISU.anzeig.rollo.wz.ostRe.xmas',
                type: 'BOOL',
                addr: 109
            },{
                jvar: 'VISU.anzeig.rollo.wz.suedLi.xmas',
                type: 'BOOL',
                addr: 110
            },{
                jvar: 'VISU.anzeig.rollo.wz.suedRe.xmas',
                type: 'BOOL',
                addr: 111
            },{
                jvar: 'VISU.anzeig.rollo.wz.westLi.xmas',
                type: 'BOOL',
                addr: 112
            },{
                jvar: 'VISU.anzeig.rollo.wz.westRe.xmas',
                type: 'BOOL',
                addr: 113
            },{
                jvar: 'VISU.anzeig.rollo.fl.xmas',
                type: 'BOOL',
                addr: 114
            },{
                jvar: 'VISU.anzeig.rollo.wc.xmas',
                type: 'BOOL',
                addr: 115
            },{
                jvar: 'VISU.anzeig.rollo.ba.li.xmas',
                type: 'BOOL',
                addr: 116
            },{
                jvar: 'VISU.anzeig.rollo.ba.re.xmas',
                type: 'BOOL',
                addr: 117
            },{
                jvar: 'VISU.anzeig.licht.wz.data',
                type: 'BOOL',
                addr: 118
            },{
                jvar: 'VISU.anzeig.licht.kb.data',
                type: 'BOOL',
                addr: 119
            },{
                jvar: 'VISU.anzeig.licht.fl.data',
                type: 'BOOL',
                addr: 120
            },{
                jvar: 'VISU.anzeig.licht.sz.data',
                type: 'BOOL',
                addr: 121
            },{
                jvar: 'VISU.anzeig.licht.szSchr.data',
                type: 'BOOL',
                addr: 122
            },{
                jvar: 'VISU.anzeig.licht.kz.data',
                type: 'BOOL',
                addr: 123
            },{
                jvar: 'VISU.anzeig.licht.ba.data',
                type: 'BOOL',
                addr: 124
            },{
                jvar: 'VISU.anzeig.licht.wc.data',
                type: 'BOOL',
                addr: 125
            },{
                jvar: 'VISU.anzeig.steckd.wz.kr1.data',
                type: 'BOOL',
                addr: 126
            },{
                jvar: 'VISU.anzeig.steckd.wz.kr2.data',
                type: 'BOOL',
                addr: 127
            },{
                jvar: 'VISU.anzeig.steckd.kb.data',
                type: 'BOOL',
                addr: 128
            },{
                jvar: 'VISU.anzeig.steckd.fl.data',
                type: 'BOOL',
                addr: 129
            },{
                jvar: 'VISU.anzeig.steckd.sz.kr1.data',
                type: 'BOOL',
                addr: 130
            },{
                jvar: 'VISU.anzeig.steckd.sz.kr2.data',
                type: 'BOOL',
                addr: 131
            },{
                jvar: 'VISU.anzeig.steckd.kz.data',
                type: 'BOOL',
                addr: 132
            },
            
            /*baLuefter: {
                jvar: 'VISU.anzeig.lueft.ba.data',
                type: 'BOOL',
                addr: 135
            },
            wcLuefter: {
                jvar: 'VISU.anzeig.lueft.wc.data',
                type: 'BOOL',
                addr: 136
            },*/
           
            {
                jvar: 'VISU.layer.rollobedien.gesperrt',
                type: 'BOOL',
                addr: 137
            },{
                jvar: 'VISU.layer.raumbedien.gesperrt',
                type: 'BOOL',
                addr: 138
            } 
        ]
    };
    
   
    //Variablenliste für Lesen der Rolloanwahlen
    VISU.comm.varRdRolloAnw = {
        //Parameter für Lesen
        //fld: 'M',
        //addr: 10000,
        addr: '%MB10000',
        oc: VISU.button.aktualAnzeig,
        seq: true,
        //debug: true,
        items: [{
                jvar: 'VISU.button.rolloAnw.kz.anzeige',
                type: 'BOOL'
            },{
                jvar: 'VISU.button.rolloAnw.sz.anzeige',
                type: 'BOOL'
            },{
                jvar: 'VISU.button.rolloAnw.wz.ostLi.anzeige',
                type: 'BOOL'
            },{
                jvar: 'VISU.button.rolloAnw.wz.ostRe.anzeige',
                type: 'BOOL'
            },{
                jvar: 'VISU.button.rolloAnw.wz.suedLi.anzeige',
                type: 'BOOL'
            },{
                jvar: 'VISU.button.rolloAnw.wz.suedRe.anzeige',
                type: 'BOOL'
            },{
                jvar: 'VISU.button.rolloAnw.wz.westLi.anzeige',
                type: 'BOOL'
            },{
                jvar: 'VISU.button.rolloAnw.wz.westRe.anzeige',
                type: 'BOOL'
            },{
                jvar: 'VISU.button.rolloAnw.fl.anzeige',
                type: 'BOOL'
            },{
                jvar: 'VISU.button.rolloAnw.wc.anzeige',
                type: 'BOOL'
            },{
                jvar: 'VISU.button.rolloAnw.ba.li.anzeige',
                type: 'BOOL'
            },{
                jvar: 'VISU.button.rolloAnw.ba.re.anzeige',
                type: 'BOOL'
            }
        ]
    };
    
    //Variablenliste für Schreiben der Rolloanwahlen
    VISU.comm.varWrRolloAnw = {
        //Parameter für Schreiben
        //fld: 'M',
        //addr: 10000,
        addr: '%MB10000',
        oc: VISU.comm.pollRolloAnw,
        //debug: true,
        items: [{
                val: false,
                type: 'BOOL'
            },{
                val: false,
                type: 'BOOL'
            },{
                val: false,
                type: 'BOOL'
            },{
                val: false,
                type: 'BOOL'
            },{
                val: false,
                type: 'BOOL'
            },{
                val: false,
                type: 'BOOL'
            },{
                val: false,
                type: 'BOOL'
            },{
                val: false,
                type: 'BOOL'
            },{
                val: false,
                type: 'BOOL'
            },{
                val: false,
                type: 'BOOL'
            },{
                val: false,
                type: 'BOOL'
            },{
                val: false,
                type: 'BOOL'
            }
        ]
    };
    
    //Variablenliste für Lesen der Raumwerte
    VISU.comm.varRdRaumWerte = {
        //Parameter für Lesen
        //fld: 'M',
        //addr: 180,
        addr: '%MB180',
        oc: function() {VISU.anzeig.aktualisiere(VISU.anzeig.raum);VISU.anzeig.aktualisiere(VISU.button.raumfunkt);},
        items: [{
                jvar: 'VISU.anzeig.raum.label.data',
                addr: 180,
                type: 'STRING.19',
            },
            /*lichtSzene: {
                jvar: undefined,
                addr: 200,
                type: 'BYTE'
            },*/
            {
                jvar: 'VISU.button.raumfunkt.lichtAuto.anzeige',
                addr: 201,
                type: 'BOOL'
            },{
                jvar: 'VISU.button.raumfunkt.sonder1.anzeige',
                addr: 360,
                type: 'BOOL'
            },{
                jvar: 'VISU.button.raumfunkt.sonder2.anzeige',
                addr: 361,
                type: 'BOOL'
            },{
                jvar: 'VISU.button.raumfunkt.sonder3.anzeige',
                addr: 362,
                type: 'BOOL'
            },{
                jvar: 'VISU.anzeig.raum.solltemp.data',
                addr: 370,
                type: 'INT1DP'
            },{
                jvar: 'VISU.anzeig.raum.isttemp.data',
                addr: 374,
                type: 'INT1DP'
            },{
                jvar: 'VISU.anzeig.raum.bargraph.sollData',
                addr: 370,
                type: 'INT1DP'
            },{
                jvar: 'VISU.anzeig.raum.bargraph.istData',
                addr: 374,
                type: 'INT1DP'
            }
        ]
    };
    
    //Variablenliste für Lesen der Heizungsdaten
    VISU.comm.varRdHeizung = {
        //Parameter für Lesen
        //fld: 'M',
        //addr: 1000,
        addr: '%MB1000',
        oc: function() {VISU.anzeig.aktualisiere(VISU.anzeig.fbh);VISU.anzeig.aktualisiere(VISU.button.fbh);},
        items: [{
                jvar: 'VISU.anzeig.fbh.pumpeBsz.data',
                addr: 1000,
                type: 'UDINT'
            },{
                jvar: 'VISU.anzeig.fbh.vorlSollTemp.data',
                addr: 1006,
                type: 'INT1DP'
            },{
                jvar: 'VISU.anzeig.fbh.vorlIstTemp.data',
                addr: 1008,
                type: 'INT1DP'
            },{
                jvar: 'VISU.anzeig.fbh.mischStatus.data',
                addr: 1010,
                type: 'BYTE'
            },{
                jvar: 'VISU.anzeig.fbh.mischPos.data',
                addr: 1011,
                type: 'BYTE'
            },{
                jvar: 'VISU.anzeig.fbh.mischer.data',
                addr: 1011,
                type: 'BYTE'
            },{
                jvar: 'VISU.button.fbh.ein.anzeige',
                addr: 1012,
                type: 'BOOL'
            },{
                jvar: 'VISU.button.fbh.auskuehlsch.anzeige',
                addr: 1013,
                type: 'BOOL'
            },{
                jvar: 'VISU.anzeig.fbh.pumpeFreig.data',
                addr: 1014,
                type: 'BOOL'
            },{
                jvar: 'VISU.anzeig.fbh.pumpeEin.data',
                addr: 1015,
                type: 'BOOL'
            },{
                jvar: 'VISU.button.fbh.hand.anzeige',
                addr: 1016,
                type: 'BOOL'
            },{
                jvar: 'VISU.anzeig.fbh.pumpeSpannOk.data',
                addr: 1017,
                type: 'BOOL'
            },{
                jvar: 'VISU.anzeig.fbh.pumpe.data',
                addr: 1018,
                type: 'BOOL'
            },{
                jvar: 'VISU.button.fbh.pumpe.anzeige',
                addr: 1019,
                type: 'BOOL'
            },{
                jvar: 'VISU.button.fbh.absenk.anzeige',
                addr: 1020,
                type: 'BOOL'
            }
        ]
    };
    
    //Variablenliste für Lesen der allgemeinen Einstellungen
    VISU.comm.varRdEinstell = {
        //Parameter für Lesen
        //fld: 'M',
        //addr: 1500,
        addr: '%MB1500',
        oc: function() {VISU.anzeig.aktualisiere(VISU.anzeig.einstell);VISU.anzeig.aktualisiere(VISU.button.einstell);},
        items: [{
                jvar: 'VISU.anzeig.einstell.xmasZeitEin.data',
                addr: 1500,
                type: 'TOD.#hh#:#mm',
            },{
                jvar: 'VISU.anzeig.einstell.xmasZeitAus.data',
                addr: 1504,
                type: 'TOD.#hh#:#mm',
            },{
                jvar: 'VISU.anzeig.einstell.xmasStatus.data',
                addr: 1508,
                type: 'BOOL',
            },{
                jvar: 'VISU.button.einstell.xmasAuto.anzeige',
                addr: 1509,
                type: 'BOOL',
            },{
                jvar: 'VISU.button.einstell.xmasTest.anzeige',
                addr: 1510,
                type: 'BOOL',
            },{
                jvar: 'VISU.button.einstell.nacht.anzeige',
                addr: 1515,
                type: 'BOOL',
            }
        ]
    };
    
    //Variablenliste für Lesen der personenbez. Daten
    VISU.comm.varRdPersonalData = {
        //Parameter für Lesen
        //fld: 'M',
        //addr: 1729,
        addr: '%MB1729',
        oc: function() {VISU.anzeig.pers.wecker.aktualisiere(); VISU.sonst.aenderePersBild();VISU.button.aktualAnzeig();},
        items: [{
                jvar: 'VISU.anzeig.pers.index',
                type: 'BYTE',
                addr: 1729
            },{
                jvar: 'VISU.anzeig.pers.name.data',
                type: 'STRING.19',
                addr: 1730
            },{
                jvar: 'VISU.anzeig.pers.status.data',
                type: 'STRING.17',
                addr: 1750
            },{
                jvar: 'VISU.button.pers.anwesend.anzeige',
                type: 'BOOL',
                addr: 1768
            },{
                jvar: 'VISU.button.pers.schlaeft.anzeige',
                type: 'BOOL',
                addr: 1769
            },{
                jvar: 'VISU.anzeig.pers.wecker.data',
                type: 'BOOL',
                addr: 1770
            },{
                jvar: 'VISU.anzeig.pers.zeitLeiste.weckerEin',
                type: 'BOOL',
                addr: 1770
            },{
                jvar: 'VISU.button.pers.wecker.anzeige',
                type: 'BOOL',
                addr: 1770
            },{
                jvar: 'VISU.anzeig.pers.weckton.data',
                type: 'STRING.19',
                addr: 1771
            },{
                jvar: 'VISU.anzeig.pers.bettseite.data',
                type: 'STRING.6',
                addr: 1791
            },{
                jvar: 'VISU.anzeig.pers.schichtsystem.data',
                type: 'BYTE',
                addr: 1798
            },{
                //Startdatum für Schichtberechnung
                jvar: 'VISU.anzeig.pers.zaehlstart.data',
                type: 'DATE.#WKD#, #DD#.#MM#.#YYYY',
                addr: 1800
            },{
                jvar: 'VISU.anzeig.pers.woche1.data',
                type: 'STRING.19',
                addr: 1804
            },{
                jvar: 'VISU.anzeig.pers.woche2.data',
                type: 'STRING.19',
                addr: 1824
            },{
                jvar: 'VISU.anzeig.pers.woche3.data',
                type: 'STRING.19',
                addr: 1844
            },{
                jvar: 'VISU.anzeig.pers.woche4.data',
                type: 'STRING.19',
                addr: 1864
            }
        ]
    };
    
    /*
     * Strukturdefinitionen
     */
    
    //Strukturdefinition personengeb. Tagesdaten
    VISU.comm.defPersTagesDaten = {
        tag: 'BYTE',
        kw: 'BYTE',
        monat: 'BYTE',
        name: 'STRING.19',    //Presetname
        bWecken: 'BOOL',
        bAufstehen: 'BOOL',
        bGehen: 'BOOL',
        bKommen: 'BOOL',
        bSchlafen: 'BOOL',
        tAufstehen: 'TOD.#hh#:#mm',
        tGehen: 'TOD.#hh#:#mm',
        tKommen: 'TOD.#hh#:#mm',
        tSchlafen: 'TOD.#hh#:#mm'
    };
    
    //Strukturdefinition Events (Meldungen, Alarme usw.)
    VISU.comm.defEvent = {
        gekommen: 'DT.#DD#.#MM#.#YY#, #hh#:#mm',
        gegangen: 'DT.#DD#.#MM#.#YY#, #hh#:#mm',
        status: 'BYTE'
    };
    
    //Strukturdefinition Eventlog (Meldungen, Alarme usw.)
    VISU.comm.defLog = {
        zeit: 'DT.#DD#.#MM#.#YY#, #hh#:#mm',
        id: 'BYTE',
        status: 'BYTE'
    };
    
 };

 

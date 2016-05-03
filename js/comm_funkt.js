/**
 * @author T. Schmidt
 * 
 * Funktionen für Kommunikation, auch mit kurzen Variablenlisten 
 * 
 */
VISU.init.comm_funkt = function() {
    
    //Schleife für zykl. Abfrage der Variablen für Wohnung und Heizung
    //sowie Aktualisierung der Anzeigen, Takt 1s
    VISU.comm.pollZyk1 = function() {
        if (VISU.layer.wohnung.eingeblendet && ! VISU.layer.raumbedien.eingeblendet) {
            VISU.comm.cx.readReq(VISU.comm.varRdWohnung);
        }
        
        if (VISU.layer.fbh.eingeblendet) {
            VISU.comm.pollHeizung();
        }
            
        VISU.anzeig.widg.uhr.aktualisiere();
        VISU.anzeig.widg.datum.aktualisiere();
        window.setTimeout("VISU.comm.pollZyk1()", 1000);
        
    };
    
    //Schleife für zusätzl. zykl. Abfrage azykl. ausgelesener Variablen und
    //der Variablen für Widgets, Takt 5s
    VISU.comm.pollZyk5 = function() {

        if (VISU.layer.rollobedien.eingeblendet) {
            VISU.comm.cx.readReq(VISU.comm.varRdRolloAnw);
        }
            
        if (VISU.layer.raumbedien.eingeblendet) {
            VISU.comm.cx.readReq(VISU.comm.varRdRaumWerte);
        }
        
        VISU.comm.pollEvents();
        
        VISU.comm.pollAussenTemp();
        
        VISU.comm.pollPersonenStatus();
        
        VISU.comm.pollSonnenZeiten();
        
        window.setTimeout("VISU.comm.pollZyk5()", 5000);
    };
    
    
    //Daten für Zeitleiste auslesen
    VISU.comm.pollZeiten4W = function() {
        VISU.comm.cx.readArrayOfStruct({
            //fld: 'M',
            //addr: 2000,
			name: '.VQ_ZEITEN4W',
            def: 'VISU.comm.defPersTagesDaten',
            jvar: 'VISU.anzeig.pers.zeitLeiste.data',
            //debug: true,
            oc: function(){
                VISU.anzeig.pers.zeitLeiste.draw();
            }
        });
    };
    
    //Rolloanwahlen lesen
    VISU.comm.pollRolloAnw = function() {
        VISU.comm.cx.readReq(VISU.comm.varRdRolloAnw);
    };
    
    //Raumwerte lesen
    VISU.comm.pollRaumWerte = function() {
        VISU.comm.cx.readReq(VISU.comm.varRdRaumWerte);
    };
    
    //Personenbez. Daten lesen
    VISU.comm.pollPersDaten = function() {
        VISU.comm.cx.readReq(VISU.comm.varRdPersonalData);
        VISU.comm.pollZeiten4W();
    };
    
    //Heizungsdaten lesen
    VISU.comm.pollHeizung = function() {
        VISU.comm.cx.readReq(VISU.comm.varRdHeizung);
        VISU.comm.cx.readArrayOfByte({name: '.VQ_STELLANTRSTATUS', jvar: 'VISU.anzeig.fbh.hk.status'});
    };
    
    //Einstellungen lesen
    VISU.comm.pollEinstell = function() {
        VISU.comm.cx.readReq(VISU.comm.varRdEinstell);
    };
    
    //Tages-/Wochenpreset schreiben
    VISU.comm.sendPreset = function(preset, tagesIndex) {
        VISU.comm.cx.writeReq({
            //fld:'M',
            //addr: 10508,
            addr: '%MB10508',
            //debug: true,
            ocd:500,
            oc: VISU.comm.pollZeiten4W,
            items: [{
                    val: tagesIndex,
                    type: 'BYTE'
                },{
                    val: preset,
                    type: 'BYTE'
                }
            ]
        });
    };
    
    //Zeiteinstellungen für Schaltpunkt lesen
    VISU.comm.pollZeitEinstell = function() {
        VISU.comm.cx.readReq({ 
            // Parameter für Lesen
            //fld: 'M',
            //addr: 1900,
            addr: '%MB1900',
            seq: true,
            //debug: true,
            oc: function() { 
                VISU.anzeig.pers.einstSpAkt.aktualisiere();
                VISU.anzeig.pers.einstStd.data = VISU.fixVkStellen(VISU.anzeig.pers.einstStd.data, 2);
                VISU.anzeig.pers.einstMin.data = VISU.fixVkStellen(VISU.anzeig.pers.einstMin.data, 2);
            },
            //Zuordnungen
            items: [{
                    jvar: 'VISU.anzeig.pers.einstWoTag.data',
                    type: 'STRING.10',
                },{
                    jvar: 'VISU.anzeig.pers.einstTag.data',
                    type: 'BYTE',
                },{
                    jvar: 'VISU.anzeig.pers.einstMonat.data',
                    type: 'STRING.10',
                },{
                    jvar: 'VISU.anzeig.pers.einstSchaltPunkt.data',
                    type: 'STRING.9',
                },{
                    jvar: 'VISU.anzeig.pers.einstStd.data',
                    type: 'BYTE',
                },{
                    jvar: 'VISU.anzeig.pers.einstMin.data',
                    type: 'BYTE',
                },{
                    jvar: 'VISU.anzeig.pers.einstSpAkt.data',
                    type: 'BOOL',
                }
            ]
        });
    };
    
    //Eventliste für Meldebox lesen (Widget)
    VISU.comm.pollEvents = function() {
        VISU.comm.cx.readArrayOfStruct({
            //fld: 'M',
            //addr: 7000,
            name: '.VQ_ALARMARRAY',
            def: 'VISU.comm.defEvent',
            jvar: 'VISU.anzeig.widg.meldeBox.data',
            //debug: true,
            oc: VISU.anzeig.widg.meldeBox.aktualisiere
        });
    };
    
    //Logbuch lesen
    VISU.comm.pollLog = function() {
        VISU.comm.cx.readArrayOfStruct({
            //fld: 'M',
            //addr: 8200,
            name: '.VQ_ALARMLOG',
            def: 'VISU.comm.defLog',
            jvar: 'VISU.anzeig.log.anzeige.data',
            //debug: true,
            oc: VISU.anzeig.log.anzeige.aktualisiere
        });
    };
    
    //Außentemp. lesen (Widget)
    VISU.comm.pollAussenTemp = function() {
        //Chart
        VISU.comm.cx.readArrayOfInt1Dp({
            //fld: 'M',
            //addr: 600,
            name: '.VQ_LOGAUSSENTEMP',
            jvar: 'VISU.anzeig.widg.aussenTempChart.data1',
            debug: false,
            oc: function() {
                VISU.anzeig.widg.aussenTempChart.aktualisiere(); 
            },
        });
        //Anzeigen
        VISU.comm.cx.readReq({ 
            // Parameter für Lesen
            //fld: 'M',
            //addr: 650,
            addr: '%MB650',
            seq: true,
            //Zuordnungen
            items: [{
                    jvar: 'VISU.anzeig.widg.aussenTempIst.data',
                    type: 'INT1DP'
                },{
                    jvar: 'VISU.anzeig.widg.aussenTempMin.data',
                    type: 'INT1DP'
                },{
                    jvar: 'VISU.anzeig.widg.aussenTempMax.data',
                    type: 'INT1DP'
                }
            ]
        });
    };
    
    //Personenstatus lesen (Widget)
    VISU.comm.pollPersonenStatus = function(){
        VISU.comm.cx.readReq({
            // Parameter für Lesen
            //fld: 'M',
            //addr: 6900,
            addr: '%MB6900',
            seq: true,
            //debug: true,
            //Zuordnungen
            items: [{
                    jvar: 'VISU.anzeig.widg.statusPers1.data',
                    type: 'STRING.19'
                },{
                    jvar: 'VISU.anzeig.widg.statusPers2.data',
                    type: 'STRING.19'
                },{
                    jvar: 'VISU.anzeig.widg.statusPers3.data',
                    type: 'STRING.19'
                },{
                    jvar: 'VISU.anzeig.widg.statusPers4.data',
                    type: 'STRING.19'
                }
            ]
        });
    };
    
    //Sonnenzeiten lesen (Widget)
    VISU.comm.pollSonnenZeiten = function() {
        VISU.comm.cx.readReq({ 
            // Parameter für Lesen
            //fld: 'M',
            //addr: 700,
            addr: '%MB700',
            seq: true,
            //debug: true,
            //Zuordnungen
            items: [{
                    jvar: 'VISU.anzeig.widg.sonnAufg.data',
                    type: 'TOD.#hh#:#mm'
                },{
                    jvar: 'VISU.anzeig.widg.sonnUnterg.data',
                    type: 'TOD.#hh#:#mm'
                }
            ]
        });
    };
};
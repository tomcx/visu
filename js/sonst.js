/**
 * @author T. Schmidt
 * 
 *  Sonstige Funktionen
 * 
 */

VISU.init.sonst = function() {
    
    VISU.sonst = {};
    
    VISU.sonst.stelleZeit = function(f, t) {
        
        //Bei erstem Aufruf Timeout auf 1s setzen
        if (t == undefined) {
            t = 1000;
        }
        
        var stunde = VISU.anzeig.pers.einstStd.data;
        var minute = VISU.anzeig.pers.einstMin.data;

        switch (f) {
            case 'stop':
                window.clearTimeout(VISU.timeout.szeit);
                break;  
            case 'std+':
                stunde ++;
                if (stunde > 23) {
                    stunde = 0;
                }
                VISU.timeout.szeit = setTimeout('VISU.sonst.stelleZeit("std+",150)', t);
                break;
            case 'std-':
                stunde --;
                if (stunde < 0) {
                    stunde = 23;
                }
                VISU.timeout.szeit = setTimeout('VISU.sonst.stelleZeit("std-",150)', t);
                break;
            case 'min+':
                minute ++;
                if (minute > 59) {
                    minute = 0;
                }
                VISU.timeout.szeit = setTimeout('VISU.sonst.stelleZeit("min+",150)', t);
                break;
            case 'min-':
                minute --;
                if (minute < 0) {
                    minute = 59;
                }
                VISU.timeout.szeit = setTimeout('VISU.sonst.stelleZeit("min-",150)', t);
                break;
            case 'nullen':
                minute = 0;
                stunde = 0;
                break;
            case 'ein_aus':
                if (VISU.anzeig.pers.einstSpAkt.data == true) {
                    VISU.anzeig.pers.einstSpAkt.data = false;
                }
                else {
                    VISU.anzeig.pers.einstSpAkt.data = true;
                }
                VISU.anzeig.pers.einstSpAkt.aktualisiere();
                break;
            case 'speichern':
                VISU.comm.cx.writeReq({
                    //fld: 'M',
                    //addr: 10525,
                    addr: '%MB10525',
                    debug: true,
                    ocd: 500,
                    oc: function() {
                        VISU.comm.cx.readArrayOfStruct({
                            //fld: 'M',
                            //addr: 2000,
                            name: '.VQ_ZEITEN4W',
                            def: 'VISU.comm.defPersTagesDaten',
                            jvar: 'VISU.anzeig.pers.zeitLeiste.data',
                            //debug: true,
                            oc: VISU.anzeig.pers.zeitLeiste.draw
                        });
                    },
                    items: [{
                            val: parseInt(VISU.anzeig.pers.einstStd.data, 10),
                            type: 'BYTE'
                        },{
                            val: parseInt(VISU.anzeig.pers.einstMin.data, 10),
                            type: 'BYTE'
                        },{
                            val: VISU.anzeig.pers.einstSpAkt.data,
                            type: 'BOOL'
                        },{
                            val: true,
                            type:'BOOL'
                        }
                    ]
                });
               
        };
        
        VISU.anzeig.pers.einstStd.data = VISU.fixVkStellen(stunde, 2);
        VISU.anzeig.pers.einstMin.data = VISU.fixVkStellen(minute, 2);
    };
 
    
    VISU.sonst.oeffneZeitEinstellung = function(tagesIndex) {
        
        VISU.comm.cx.writeByte({addr:'%MB10508',val:tagesIndex,ocd:500,oc:VISU.comm.pollZeitEinstell});

        if (!VISU.layer.zeiteinst.eingeblendet) {
            VISU.layer.zeiteinst.blendeEin();
        }   
    };
    
    
    VISU.sonst.oeffnePresets = function(p) {
        
        switch(p) {
            case 't':
                VISU.comm.cx.readArrayOfString({name: '.VQ_NAMENTAGESPRESETS', debug:true, strlen:19, jvar: 'VISU.layer.presetsTag.presets',oc:
                    function(){
                        for (var i = 0; i < 10; i++) {
                            VISU.button.pers['tagesPreset' + (i + 1)].text.textContent = VISU.layer.presetsTag.presets[i];
                        }
                    }
                });
                VISU.layer.presetsTag.blendeEin();
                break;
            case 'w':    
                VISU.comm.cx.readArrayOfString({name: '.VQ_NAMENWOCHENPRESETS', debug:true, strlen:19, jvar: 'VISU.layer.presetsWoche.presets',oc:
                    function(){
                        for (var i = 0; i < 10; i++) {
                            VISU.button.pers['wochenPreset' + (i + 1)].text.textContent = VISU.layer.presetsWoche.presets[i];
                        }
                    }
                });
                VISU.layer.presetsWoche.blendeEin();
                break;
        }
        
    };
    
    
    VISU.sonst.raumwahl = function(raum) {
        if (! VISU.layer.raumbedien.gesperrt) {
            VISU.comm.cx.writeByte({addr:'%MB10100', val:raum, ocd: 500,oc: function() {
                    
                    VISU.comm.cx.readReq(VISU.comm.varRdRaumWerte);
                    
                    VISU.comm.cx.readArrayOfInt1Dp({
                        name: '.VQ_LOGRAUMISTTEMP',
                        jvar: 'VISU.anzeig.raum.chart.data1',
                        debug: false,
                        oc: function() {
                            VISU.anzeig.aktualisiere(VISU.anzeig.raum); 
                        },
                    });
                }
            });
            
            VISU.button.raumfunkt.licht1.text.textContent = VISU.buttontext['raum' + raum].licht1;
            
            for (var i = 1; i <= 3; i++) {
                        VISU.button.raumfunkt['sonder' + i].text.textContent = VISU.buttontext['raum' + raum]['sonder' + i];
                    }
                    
            for (var i = 1; i <= 6; i++) {
                VISU.button.raumfunkt['licht' + i].text.textContent = VISU.buttontext['raum' + raum]['licht' + i];
            }
            
            VISU.layer.raumbedien.blendeEin();
            
        }
        else VISU.sonst.alert('Raumbedienung von anderem Terminal geöffnet !');
    };
    
    
    VISU.sonst.waehleMenuePunkt = function(punkt) {
        switch(punkt) {
            case 1: 
                //Wohnung
                VISU.comm.cx.readReq(VISU.comm.varRdWohnung);
                VISU.layer.wohnung.blendeEin();
                break;
            case 2:
                //Personenbezogenen Daten
                VISU.comm.cx.readBool({addr:'%MB139',jvar:'VISU.layer.personal.gesperrt',oc: 
                    function(){
                        if (!VISU.layer.personal.gesperrt) {
                        
                            //Zeitleiste auf akt.Tag setzen
                            VISU.comm.cx.writeByte({
                                //fld: 'M',
                                addr: '%MB10524',
                                val: 1
                            }); //Schaltpunkt 'Wecken' anwählen
                            VISU.comm.cx.writeByte({
                                //fld: 'M',
                                addr: '%MB10500',
                                val: 1,
                                ocd: 500,
                                oc: VISU.comm.pollPersDaten
                            });
                            var jetzt = new Date();
                            var startIndex = jetzt.getDay();
                            startIndex = (startIndex == 0 ? 7 : startIndex) - 2;
                            VISU.anzeig.pers.zeitLeiste.frameCounter = startIndex;
                            VISU.anzeig.pers.zeitLeiste.minCounter = startIndex;
                            VISU.layer.personal.blendeEin();
                        }
                        else 
                            VISU.sonst.alert('Eingabe Personendaten von anderem Terminal geöffnet !');
                    }
                });
                break;
            case 3:
                //Einstellungen
                VISU.comm.cx.readBool({addr:'%MB140',jvar:'VISU.layer.einstell.gesperrt',oc: 
                    function(){
                        if ( ! VISU.layer.einstell.gesperrt) {
                            VISU.layer.einstell.blendeEin();
                            VISU.comm.pollEinstell();
                        }
                        else
                            VISU.sonst.alert('Einstellungen von anderem Terminal geöffnet !');
                    }
                });
                break;
            case 4:
                //Meldelog
                VISU.comm.pollLog();
                VISU.layer.log.blendeEin();
                break;
            case 5:
                //Fußbodenheizung, keine Geöffnet-Abfrage da Update-Zyklus 1s
                VISU.comm.cx.readArrayOfString({
                    //fld: 'M',
                    name: '.VQ_STELLANTRDATEN',
                    strlen: 2,
                    jvar: 'VISU.anzeig.fbh.hk.typ'
                });
                VISU.comm.pollHeizung();
                VISU.layer.fbh.blendeEin();
                break;
        }
    };
        
        
    VISU.sonst.rolloSchnellw = function(anw) {
        if (anw == 'WZ') {
            for (var i = 0; i < 12; i++) 
                VISU.comm.varWrRolloAnw.items[i].val = false;
            for (var i = 2; i < 8; i++) 
                VISU.comm.varWrRolloAnw.items[i].val = true;
        }
        else if (anw == 'Alle') {
            for (var i = 0; i < 12; i++)
                VISU.comm.varWrRolloAnw.items[i].val = true;
        }
        VISU.comm.cx.writeReq(VISU.comm.varWrRolloAnw);
    };
    
    
    VISU.sonst.aenderePersBild = function() {
        //console.log(VISU.bild['pers' + VISU.anzeig.pers.index].src);
        document.getElementById('persbild').src = VISU.bild['pers' + VISU.anzeig.pers.index].src;
    };
    
    
    //Datenabfrage nach Initialisierung
    VISU.sonst.warteAufDaten = function() {
        if (VISU.anzeig.widg.statusPers1.data == 'no data') {
            setTimeout('VISU.sonst.warteAufDaten()', 1000);
        }
        else
            VISU.layer.visinfo.blendeAus();
    };
    
    //Ausgabe von Visuinfos
    VISU.sonst.alert = function(text) {
        VISU.anzeig.visinfo.data = text;
        VISU.layer.visinfo.blendeEin();
        VISU.layer.visinfo.element.style.cursor = 'pointer';
        VISU.layer.visinfo.element.onmousedown = VISU.layer.visinfo.blendeAus;
    };

};

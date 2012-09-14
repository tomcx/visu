/**
 * @author T.Schmidt, 06.02.2009
 * 
 * Anzeigen generieren
 * 
 */

VISU.init.anzeig = function() {
    
    var $b = VISU.AnzeigeBinaer,
        $ba = VISU.AnzeigeBalken,
        $c = VISU.AnzeigeChart,
        $r = VISU.AnzeigeRollo;
    
    VISU.anzeig = {
        //Fenster
        fenst: {
            kz:         $b.erzeugeFensterWaag('fenster0'),
            sz:         $b.erzeugeFensterWaag('fenster1'),
            wz: {
                ostLi:  $b.erzeugeFensterWaag('fenster2'),
                ostRe:  $b.erzeugeFensterWaag('fenster3'),
                suedLi: $b.erzeugeFensterSenkr('fenster4'),
                suedRe: $b.erzeugeFensterSenkr('fenster5'),
                westLi: $b.erzeugeFensterWaag('fenster6'),
                westRe: $b.erzeugeFensterWaag('fenster7')
            },
            fl:         $b.erzeugeFensterWaag('fenster8'),
            wc:         $b.erzeugeFensterWaag('fenster9'),
            ba: {
                li:     $b.erzeugeFensterWaag('fenster10'),
                re:     $b.erzeugeFensterWaag('fenster11')
            },
        },
        //Türen
        tuer: {
            kz:    $b.erzeugeTuerWaag('tuer0'),
            sz:    $b.erzeugeTuerWaag('tuer1'),
            szSchr:$b.erzeugeTuerSenkr('tuer2'),
            fl:    $b.erzeugeTuerWaag('tuer3'),
            wc:    $b.erzeugeTuerWaag('tuer4'),
            ba:    $b.erzeugeTuerWaag('tuer5')
        },
        //Licht
        licht: {
            kz:    $b.erzeugeLicht('kz_licht'),
            sz:    $b.erzeugeLicht('sz_licht'),
            szSchr:$b.erzeugeLicht('sz_schrank_licht'),
            wz:    $b.erzeugeLicht('wz_licht'),
            kb:    $b.erzeugeLicht('kb_licht'),
            fl:    $b.erzeugeLicht('fl_licht'),
            wc:    $b.erzeugeLicht('wc_licht'),
            ba:    $b.erzeugeLicht('ba_licht'),
        },
        //Steckdosen
        steckd: {
            kz:    $b.erzeugeSteckd('kz_steckd'),
            sz: {
              kr1: $b.erzeugeSteckd1('sz_steckd'),
              kr2: $b.erzeugeSteckd2('sz_steckd'),
            },
            wz: {
              kr1: $b.erzeugeSteckd1('wz_steckd'),
              kr2: $b.erzeugeSteckd2('wz_steckd'),
            },
            kb:    $b.erzeugeSteckd('kb_steckd'),
            fl:    $b.erzeugeSteckd('fl_steckd'),
        },
        //Lüfter
        /*lueft: {
            ba:    $b.erzeugeLueft('ba_lueft'),
            wc:    $b.erzeugeLueft('kz_lueft'),
        },*/
        //Temperatur
        temp: {
            wz:    VISU.erzeugeTextAnzeige('wz_temp'),
            fl:    VISU.erzeugeTextAnzeige('fl_temp'),
            sz:    VISU.erzeugeTextAnzeige('sz_temp'),
            kz:    VISU.erzeugeTextAnzeige('kz_temp'),
            ba:    VISU.erzeugeTextAnzeige('ba_temp'),
            wc:    VISU.erzeugeTextAnzeige('wc_temp')
        },
        //Solltemperatur
        sollTemp: {
            wz:    VISU.erzeugeTextAnzeige('wz_solltemp'),
            fl:    VISU.erzeugeTextAnzeige('fl_solltemp'),
            sz:    VISU.erzeugeTextAnzeige('sz_solltemp'),
            kz:    VISU.erzeugeTextAnzeige('kz_solltemp'),
            ba:    VISU.erzeugeTextAnzeige('ba_solltemp'),
            wc:    VISU.erzeugeTextAnzeige('wc_solltemp')
        },
        //Luftfeuchte
        rlf: {
            wz:    VISU.erzeugeTextAnzeige('wz_rlf'),
            sz:    VISU.erzeugeTextAnzeige('sz_rlf'),
            ba:    VISU.erzeugeTextAnzeige('ba_rlf')
		},
		//Rollos
		rollo: {
            kz:         $r.erzeugeAnzeige('rollo0', 'kz'),
            sz:         $r.erzeugeAnzeige('rollo1', 'sz'),
            wz: {
                ostLi:  $r.erzeugeAnzeige('rollo2', 'wz.ostLi'),
                ostRe:  $r.erzeugeAnzeige('rollo3', 'wz.ostRe'),
                suedLi: $r.erzeugeAnzeige('rollo4', 'wz.suedLi'),
                suedRe: $r.erzeugeAnzeige('rollo5', 'wz.suedRe'),
                westLi: $r.erzeugeAnzeige('rollo6', 'wz.westLi'),
                westRe: $r.erzeugeAnzeige('rollo7', 'wz.westRe')
            },
            fl:         $r.erzeugeAnzeige('rollo8', 'fl'),
            wc:         $r.erzeugeAnzeige('rollo9', 'wc'),
            ba: {
                li:     $r.erzeugeAnzeige('rollo10', 'ba.li'),
                re:     $r.erzeugeAnzeige('rollo11', 'ba.re')
            }
        
        },
        //Raumanzeige
        raum: {
            label: VISU.erzeugeTextAnzeige('raumlabel'),
            isttemp: VISU.erzeugeTextAnzeige('isttemp'),
            solltemp: VISU.erzeugeTextAnzeige('solltemp'),
            bargraph: $ba.erzeugeAnzeige({
                id:'temp_balken',
                laenge: 240,
                breite: 30,
                minWert: 5,
                maxWert: 35,
                hauptTeiler: 6,
                unterTeiler: 5,
                anzSoll: true,
                minSoll: 16,
                maxSoll: 24
            }),
            chart: $c.erzeugeAnzeige({
                id: 'temp_chart',
                achsen: false,
                laenge: 300,
                hoehe: 120,
                minY: 10,
                maxY: 30,
                //minY2: -20,
                //maxY2: 40,
                teilerY: 4,
                teilerX: 25,
                subTeilerY: 5,
                zoom: 5,
                zoomSubTeilerY: 5,
                styleText: 'rgba(255,255,255,0.4)',       //für Text
                styleY1: 'rgba(200,255,200,0.4)',         //für Y-Skala vorn
                //styleY2: 'rgba(200,200,255,0.4)',         //für Y-Skala hinten
                styleGraph1: 'rgba(255,255,120,0.7)',     //für Graph1 
                //styleGraph2: 'rgba(120,255,255,0.7)',     //für Graph2
                label: 'Temperaturverlauf 24h'
            })
        },
        //Persönliche Daten
        pers: {
            index: 1,
            name: VISU.erzeugeTextAnzeige('p_name'),
            status: VISU.erzeugeTextAnzeige('p_status'),
            wecker: VISU.AnzeigeTextArray.erzeugeAktDeakt('p_wecker'),
            weckton: VISU.erzeugeTextAnzeige('p_weckton'),
            bettseite: VISU.erzeugeTextAnzeige('p_bettseite'),
            schichtsystem: VISU.erzeugeTextAnzeige('p_ssystem'),
            zaehlstart: VISU.erzeugeTextAnzeige('p_sstart'),
            woche1: VISU.erzeugeTextAnzeige('p_woche1'),
            woche2: VISU.erzeugeTextAnzeige('p_woche2'),
            woche3: VISU.erzeugeTextAnzeige('p_woche3'),
            woche4: VISU.erzeugeTextAnzeige('p_woche4'),
            zeitLeiste: VISU.AnzeigeScroller.erzeuge({
                id: 'zeitleiste',
                offsetX: 0,
                offsetY: -5,  //gilt für oben und unten
                frameHoehe: 160,
                frameBreite: 249,
                frameAnzahl: 28,
                laengeGes: 590,
                abstand: 7,
                execOnDoubleClick: VISU.sonst.oeffneZeitEinstellung
                }),
            einstStd: VISU.erzeugeTextAnzeige('zeiteinst_std'),
            einstMin: VISU.erzeugeTextAnzeige('zeiteinst_min'),
            einstWoTag: VISU.erzeugeTextAnzeige('zeiteinst_wotag'),
            einstTag: VISU.erzeugeTextAnzeige('zeiteinst_tag'),
            einstMonat: VISU.erzeugeTextAnzeige('zeiteinst_monat'),
            einstSchaltPunkt: VISU.erzeugeTextAnzeige('schaltpkt'),
            einstSpAkt: VISU.AnzeigeTextArray.erzeugeAktDeakt('schaltpkt_aktiv'),
        },
        //Widgets auf Startseite
        widg: {
            uhr:   VISU.AnzeigeUhr.erzeugeDigiUhr('clock'),
            datum: VISU.AnzeigeUhr.erzeugeDatum('date'),
            meldeBox: VISU.AnzeigeMeldeBox.erzeugeBox({
                id: 'meldetext',
                bg: VISU.canvas.meldeBoxBg,
                txt: VISU.meldtxt,
                spalte1: 15,
                spalte2: 40,
                spalte3: 100,
                spalte4: 480,
                spalte5: 585,
                spalte6: 690,
                farbeHinw: 'rgba(150, 170, 255, 0.5)',
                farbeMeld: 'rgba(230, 230, 0, 0.5)',
                farbeAlarm: 'rgba(255, 50, 50, 0.5)',
                mousedown: function() {
                    VISU.comm.cx.writeBool({
                        addr: '%MB12050',
                        val: true,
                        ocd: 500,
                        oc: function() {
                            VISU.comm.pollEvents();
                        }
                    })
                }
            }),
            aussenTempChart: $c.erzeugeAnzeige({
                id: 'aussentemp_chart',
                achsen: false,
                laenge: 310,
                hoehe: 160,
                minY: -20,
                maxY: 40,
                teilerY: 6,
                teilerX: 25,
                subTeilerY: 5,
                zoom: 5,
                zoomSubTeilerY: 5,
                styleText: 'rgba(255,255,255,0.4)',       //für Text
                styleY1: 'rgba(200,255,200,0.4)',         //für Y-Skala vorn
                styleGraph1: 'rgba(255,255,120,0.7)',     //für Graph1 
                label: 'Temperaturverlauf 24h'
            }),
            aussenTempIst: VISU.erzeugeTextAnzeige('aussentemp_ist'),
            aussenTempMin: VISU.erzeugeTextAnzeige('aussentemp_min'),
            aussenTempMax: VISU.erzeugeTextAnzeige('aussentemp_max'),
            statusPers1: VISU.erzeugeTextAnzeige('widg_pers_status1'),
            statusPers2: VISU.erzeugeTextAnzeige('widg_pers_status2'),
            statusPers3: VISU.erzeugeTextAnzeige('widg_pers_status3'),
            statusPers4: VISU.erzeugeTextAnzeige('widg_pers_status4'),
            sonnAufg: VISU.erzeugeTextAnzeige('sonnaufg_zeit'),
            sonnUnterg: VISU.erzeugeTextAnzeige('sonnunterg_zeit')
            
            
        },
        //Einstellungen
        einstell: {
            xmasZeitEin: VISU.erzeugeTextAnzeige('xmas_einschaltzeit'),
            xmasZeitAus: VISU.erzeugeTextAnzeige('xmas_ausschaltzeit'),
            xmasStatus: VISU.AnzeigeTextArray.erzeuge('xmas_status', ['ausgeschaltet','eingeschaltet'])
        },
        //Logbuch
        log: {
            anzeige: VISU.AnzeigeLogbuch.erzeuge({
                id: 'meldelog',
                //bg: VISU.canvas.meldeBoxBg,
                txt: VISU.meldtxt,
                spalte1: 15,
                spalte2: 110,
                spalte3: 190,
                spalte4: 220,
                spalte5: 290,
                farbeHinw: 'rgba(150, 170, 255, 0.5)',
                farbeMeld: 'rgba(230, 230, 0, 0.5)',
                farbeAlarm: 'rgba(255, 50, 50, 0.5)'
            })
        },
        fbh: {
            pumpe: VISU.AnzeigePumpe.erzeuge({
                id: 'pumpe',
                x: 60,
                y: 60,
                durchbrBreite: 56,
                anschlBreite: 26,
                radius: 45,
                segm: 7,
                segmLen: 0.5,
                rate: 26,       //Framerate
                speed: 0.07
            }),
            mischer: VISU.AnzeigeMischer.erzeuge({
                id: 'mischer',
                x: 60,
                y: 60,
                radius: 30,
                durchbrBreite: 36,
                anschlBreite: 26
            }),
            rohre: VISU.AnzeigeRohrNetz.erzeuge({
                id: 'rohre',
                breite: 26
            }),
            hk: VISU.AnzeigeHeizkreise.erzeuge({
                id: 'heizkr',
                spalte1: 15,
                spalte2: 50,
                spalte3: 200,
                spalte4: 350
            }),
            vorlIstTemp: VISU.erzeugeTextAnzeige('vorl_temp'),
            vorlSollTemp: VISU.erzeugeTextAnzeige('vorl_solltemp'),
            pumpeBsz: VISU.erzeugeTextAnzeige('pumpe_bsz'),
            mischStatus: VISU.AnzeigeTextArray.erzeuge('misch_stat',['Init.','Kalibr.','Kalibr.','Selbstbet.','Selbstbet.','Selbstbet.',,,,,'Bereit']),
            mischPos: VISU.erzeugeTextAnzeige('misch_pos'),
            pumpeSpannOk: VISU.AnzeigeTextKlasse.erzeugeRotGruen('pumpe_spann'),
            pumpeFreig: VISU.AnzeigeTextKlasse.erzeugeRotGruen('pumpe_freig'),
            pumpeEin: VISU.AnzeigeTextKlasse.erzeugeRotGruen('pumpe_ein')    
        },
        //Visu Systeminfo
        visinfo: VISU.erzeugeTextAnzeige('visinfo_txt'),
    }
 
    //Funktion zu Aktualisieren von Binär- und Rolloanzeigen
    VISU.anzeig.aktualisiere = function(anzeig) {
        for (var elem in anzeig) {
            if (anzeig[elem].aktualisiere) {
                anzeig[elem].aktualisiere();
            }
            else {
                for (var sub in anzeig[elem]) {
                    if (anzeig[elem][sub]) {
                        if (anzeig[elem][sub].aktualisiere) 
                            anzeig[elem][sub].aktualisiere();
                    }
                }
            }
        }
    }

    //Aktualisiere Anzeigen nach Lesen der Daten
    VISU.anzeig.aktualAnzeig = function() {
        VISU.anzeig.aktualisiere(VISU.anzeig.fenst);
        VISU.anzeig.aktualisiere(VISU.anzeig.tuer);
        VISU.anzeig.aktualisiere(VISU.anzeig.rollo);
        VISU.anzeig.aktualisiere(VISU.anzeig.licht);
        VISU.anzeig.aktualisiere(VISU.anzeig.steckd);
    }
}
 


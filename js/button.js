/**
 * @author Thomas Schmidt, 10.02.2009
 * 
 * Buttons
 * 
 */

VISU.init.button = function() {
    
	VISU.button = {
        
        mainNav: {
            wohnung: VISU.Button.erzeugeStdButt
                ('nav1', VISU.sonst.waehleMenuePunkt, 1, undefined),
            personal: VISU.Button.erzeugeStdButt
                ('nav2', VISU.sonst.waehleMenuePunkt, 2, undefined),
            einstell: VISU.Button.erzeugeStdButt
                ('nav3', VISU.sonst.waehleMenuePunkt, 3, undefined),
            log: VISU.Button.erzeugeStdButt
                ('nav4', VISU.sonst.waehleMenuePunkt, 4, undefined),
            log: VISU.Button.erzeugeStdButt
                ('nav5', VISU.sonst.waehleMenuePunkt, 5, undefined),
        },
        
        layer: {
            closeLayerWohnung: VISU.Button.erzeugeCloseButton
                ('wohnlayer_close', function(){
                    VISU.layer.wohnung.blendeAus();
                }, 0, undefined),
            closeLayerPersonal: VISU.Button.erzeugeCloseButton
                ('perslayer_close', VISU.layer.personal.blendeAus, 0, undefined),
            closeLayerEinstell: VISU.Button.erzeugeCloseButton
                ('einstlayer_close', VISU.layer.einstell.blendeAus, 0, undefined),
            closeRolloBox: VISU.Button.erzeugeCloseButton
                ('rollobox_close', VISU.layer.rollobedien.blendeAus, 0, undefined),
            closeRaumBox: VISU.Button.erzeugeCloseButton
                ('raumbox_close', VISU.layer.raumbedien.blendeAus, 0, undefined),
            closeZeitBox: VISU.Button.erzeugeCloseButton
                ('zeitbox_close', VISU.layer.zeiteinst.blendeAus, 0, undefined),
            closePresetBoxT: VISU.Button.erzeugeCloseButton
                ('presetboxT_close', VISU.layer.presetsTag.blendeAus, 0, undefined),
            closePresetBoxW: VISU.Button.erzeugeCloseButton
                ('presetboxW_close', VISU.layer.presetsWoche.blendeAus, 0, undefined),
            closeLayerLog: VISU.Button.erzeugeCloseButton
                ('loglayer_close', VISU.layer.log.blendeAus, 0, undefined),
            closeLayerFBH: VISU.Button.erzeugeCloseButton
                ('fbhlayer_close', VISU.layer.fbh.blendeAus, 0, undefined),
        },
        
        rolloFahren: {
           p1: VISU.Button.erzeugeStdButt
               ('rollopos1', VISU.comm.cx.writeByte, {fld:"M",addr:10080,val:128}, {fld:"M",addr:10080,val:0}),
           p2: VISU.Button.erzeugeStdButt
                ('rollopos2', VISU.comm.cx.writeByte, {fld:"M",addr:10080,val:128}, {fld:"M",addr:10080,val:30}),
           p3: VISU.Button.erzeugeStdButt
                ('rollopos3', VISU.comm.cx.writeByte, {fld:"M",addr:10080,val:128}, {fld:"M",addr:10080,val:45}),
           p4: VISU.Button.erzeugeStdButt
               ('rollopos4', VISU.comm.cx.writeByte, {fld:"M",addr:10080,val:128}, {fld:"M",addr:10080,val:70}),
           p5: VISU.Button.erzeugeStdButt
                ('rollopos5', VISU.comm.cx.writeByte, {fld:"M",addr:10080,val:128}, {fld:"M",addr:10080,val:100})
	    },
        
        rolloFunkt: {
           schatten: VISU.Button.erzeugeStdButt
               ('rollofunkt0', VISU.comm.cx.writeBool, {fld:"M",addr:10048,val:0}, {fld:"M",addr:10048,val:1}),
           auto: VISU.Button.erzeugeStdButt
                ('rollofunkt1', VISU.comm.cx.writeBool, {fld:"M",addr:10052,val:0}, {fld:"M",addr:10052,val:1}),
           //nacht: VISU.Button.erzeugeStdButt
           //     ('rollofunkt2', VISU.comm.cx.writeBool, {fld:"M",addr:10056,val:0}, {fld:"M",addr:10056,val:1}),
           sperren: VISU.Button.erzeugeStdButt
               ('rollofunkt3', VISU.comm.cx.writeBool, {fld:"M",addr:10060,val:0}, {fld:"M",addr:10060,val:1}),
           xmas: VISU.Button.erzeugeStdButt
                ('rollofunkt4', VISU.comm.cx.writeBool, {fld:"M",addr:10064,val:0}, {fld:"M",addr:10064,val:1})
	    },
		
        rolloAnw: {
		    kz: VISU.ButtonToggle.erzeugePfeilHochButt
            ('rolloanwahl0', VISU.comm.cx.writeBool, {fld:"M",addr:10000,val:0,ocd:500,oc:VISU.comm.pollRolloAnw}, {fld:"M",addr:10000,val:1,ocd:500,oc:VISU.comm.pollRolloAnw}),
            sz: VISU.ButtonToggle.erzeugePfeilHochButt
            ('rolloanwahl1', VISU.comm.cx.writeBool, {fld:"M",addr:10001,val:0,ocd:500,oc:VISU.comm.pollRolloAnw}, {fld:"M",addr:10001,val:1,ocd:500,oc:VISU.comm.pollRolloAnw}),
            wz: {
                ostLi: VISU.ButtonToggle.erzeugePfeilHochButt
                ('rolloanwahl2', VISU.comm.cx.writeBool, {fld:"M",addr:10002,val:0,ocd:500,oc:VISU.comm.pollRolloAnw}, {fld:"M",addr:10002,val:1,ocd:500,oc:VISU.comm.pollRolloAnw}),
                ostRe: VISU.ButtonToggle.erzeugePfeilHochButt
                ('rolloanwahl3', VISU.comm.cx.writeBool, {fld:"M",addr:10003,val:0,ocd:500,oc:VISU.comm.pollRolloAnw}, {fld:"M",addr:10003,val:1,ocd:500,oc:VISU.comm.pollRolloAnw}),
                suedLi: VISU.ButtonToggle.erzeugePfeilRechtsButt
                ('rolloanwahl4', VISU.comm.cx.writeBool, {fld:"M",addr:10004,val:0,ocd:500,oc:VISU.comm.pollRolloAnw}, {fld:"M",addr:10004,val:1,ocd:500,oc:VISU.comm.pollRolloAnw}),
                suedRe: VISU.ButtonToggle.erzeugePfeilRechtsButt
                ('rolloanwahl5', VISU.comm.cx.writeBool, {fld:"M",addr:10005,val:0,ocd:500,oc:VISU.comm.pollRolloAnw}, {fld:"M",addr:10005,val:1,ocd:500,oc:VISU.comm.pollRolloAnw}),
                westLi: VISU.ButtonToggle.erzeugePfeilRunterButt
                ('rolloanwahl6', VISU.comm.cx.writeBool, {fld:"M",addr:10006,val:0,ocd:500,oc:VISU.comm.pollRolloAnw}, {fld:"M",addr:10006,val:1,ocd:500,oc:VISU.comm.pollRolloAnw}),
                westRe: VISU.ButtonToggle.erzeugePfeilRunterButt
                ('rolloanwahl7', VISU.comm.cx.writeBool, {fld:"M",addr:10007,val:0,ocd:500,oc:VISU.comm.pollRolloAnw}, {fld:"M",addr:10007,val:1,ocd:500,oc:VISU.comm.pollRolloAnw}),
            },
            fl: VISU.ButtonToggle.erzeugePfeilRunterButt
            ('rolloanwahl8', VISU.comm.cx.writeBool, {fld:"M",addr:10008,val:0,ocd:500,oc:VISU.comm.pollRolloAnw}, {fld:"M",addr:10008,val:1,ocd:500,oc:VISU.comm.pollRolloAnw}),
            wc: VISU.ButtonToggle.erzeugePfeilRunterButt
            ('rolloanwahl9', VISU.comm.cx.writeBool, {fld:"M",addr:10009,val:0,ocd:500,oc:VISU.comm.pollRolloAnw}, {fld:"M",addr:10009,val:1,ocd:500,oc:VISU.comm.pollRolloAnw}),
            ba: {
                li: VISU.ButtonToggle.erzeugePfeilRunterButt
                ('rolloanwahl10', VISU.comm.cx.writeBool, {fld:"M",addr:10010,val:0,ocd:500,oc:VISU.comm.pollRolloAnw}, {fld:"M",addr:10010,val:1,ocd:500,oc:VISU.comm.pollRolloAnw}),
                re: VISU.ButtonToggle.erzeugePfeilRunterButt
                ('rolloanwahl11', VISU.comm.cx.writeBool, {fld:"M",addr:10011,val:0,ocd:500,oc:VISU.comm.pollRolloAnw}, {fld:"M",addr:10011,val:1,ocd:500,oc:VISU.comm.pollRolloAnw}),
            },
		},
        
		rolloSchnellw: {
            wz: VISU.Button.erzeugeStdButt
                      ('rolloschnellwahl0', VISU.sonst.rolloSchnellw, undefined, 'WZ'),
            alle: VISU.Button.erzeugeStdButt
                      ('rolloschnellwahl1', VISU.sonst.rolloSchnellw, undefined, 'Alle')
		},
        
        touch: {
            wz: VISU.Button.erzeugeTouchfeld
                ('tf_wz', VISU.sonst.raumwahl, VISU.bild.wzClicked, undefined, 1),
            wz2: VISU.Button.erzeugeTouchfeld
                ('tf_wz2', VISU.sonst.raumwahl, VISU.bild.wz2Clicked, undefined, 1),
            fl: VISU.Button.erzeugeTouchfeld
                ('tf_fl', VISU.sonst.raumwahl, VISU.bild.flClicked, undefined, 2),
            sz: VISU.Button.erzeugeTouchfeld
                ('tf_sz', VISU.sonst.raumwahl, VISU.bild.szClicked, undefined, 3),
            kz: VISU.Button.erzeugeTouchfeld
                ('tf_kz', VISU.sonst.raumwahl, VISU.bild.kzClicked, undefined, 4),
            ba: VISU.Button.erzeugeTouchfeld
                ('tf_ba', VISU.sonst.raumwahl, VISU.bild.baClicked, undefined, 5),
            wc: VISU.Button.erzeugeTouchfeld
                ('tf_wc', VISU.sonst.raumwahl, VISU.bild.wcClicked, undefined, 6)
        },
        
        raumfunkt: {
            heizminus: VISU.Button.erzeugeStdButt
               ('heizung_minus', VISU.comm.cx.writeBool, {fld:"M",addr:10116,val:0}, {fld:"M",addr:10116,val:1,ocd:500,oc:VISU.comm.pollRaumWerte}),
            heizplus: VISU.Button.erzeugeStdButt
               ('heizung_plus', VISU.comm.cx.writeBool, {fld:"M",addr:10120,val:0}, {fld:"M",addr:10120,val:1,ocd:500,oc:VISU.comm.pollRaumWerte}),
            sonder1: VISU.ButtonAnzeige.erzeugeStdButt
               ('sonderfunkt0', VISU.comm.cx.writeByte, {fld:"M",addr:10124,val:0}, {fld:"M",addr:10124,val:1,ocd:500,oc:VISU.comm.pollRaumWerte}),
            sonder2: VISU.ButtonAnzeige.erzeugeStdButt
               ('sonderfunkt1', VISU.comm.cx.writeByte, {fld:"M",addr:10124,val:0}, {fld:"M",addr:10124,val:2,ocd:500,oc:VISU.comm.pollRaumWerte}),
            sonder3: VISU.ButtonAnzeige.erzeugeStdButt
               ('sonderfunkt2', VISU.comm.cx.writeByte, {fld:"M",addr:10124,val:0}, {fld:"M",addr:10124,val:3,ocd:500,oc:VISU.comm.pollRaumWerte}),
            lichtAuto: VISU.ButtonAnzeige.erzeugeStdButt
               ('lichtfunkt0', VISU.comm.cx.writeByte, {fld:"M",addr:10140,val:0}, {fld:"M",addr:10140,val:30,ocd:500,oc:VISU.comm.pollRaumWerte}),
            lichtMax: VISU.Button.erzeugeStdButt
               ('lichtfunkt1', VISU.comm.cx.writeByte, {fld:"M",addr:10140,val:0}, {fld:"M",addr:10140,val:1,ocd:500,oc:VISU.comm.pollRaumWerte}),
            licht1: VISU.Button.erzeugeStdButt
               ('lichtfunkt2', VISU.comm.cx.writeByte, {fld:"M",addr:10140,val:0}, {fld:"M",addr:10140,val:2,ocd:500,oc:VISU.comm.pollRaumWerte}),
            licht2: VISU.Button.erzeugeStdButt
               ('lichtfunkt3', VISU.comm.cx.writeByte, {fld:"M",addr:10140,val:0}, {fld:"M",addr:10140,val:3,ocd:500,oc:VISU.comm.pollRaumWerte}),
            licht3: VISU.Button.erzeugeStdButt
               ('lichtfunkt4', VISU.comm.cx.writeByte, {fld:"M",addr:10140,val:0}, {fld:"M",addr:10140,val:4,ocd:500,oc:VISU.comm.pollRaumWerte}),
            licht4: VISU.Button.erzeugeStdButt
               ('lichtfunkt5', VISU.comm.cx.writeByte, {fld:"M",addr:10140,val:0}, {fld:"M",addr:10140,val:5,ocd:500,oc:VISU.comm.pollRaumWerte}),
            licht5: VISU.Button.erzeugeStdButt
               ('lichtfunkt6', VISU.comm.cx.writeByte, {fld:"M",addr:10140,val:0}, {fld:"M",addr:10140,val:6,ocd:500,oc:VISU.comm.pollRaumWerte}),
            licht6: VISU.Button.erzeugeStdButt
               ('lichtfunkt7', VISU.comm.cx.writeByte, {fld:"M",addr:10140,val:0}, {fld:"M",addr:10140,val:7,ocd:500,oc:VISU.comm.pollRaumWerte}),
            licht7: VISU.Button.erzeugeStdButt
               ('lichtfunkt8', VISU.comm.cx.writeByte, {fld:"M",addr:10140,val:0}, {fld:"M",addr:10140,val:8,ocd:500,oc:VISU.comm.pollRaumWerte}),
            licht8: VISU.Button.erzeugeStdButt
               ('lichtfunkt9', VISU.comm.cx.writeByte, {fld:"M",addr:10140,val:0}, {fld:"M",addr:10140,val:9,ocd:500,oc:VISU.comm.pollRaumWerte}),
            lichtAus: VISU.Button.erzeugeBreitenButt
               ('lichtfunkt10', VISU.comm.cx.writeByte, {fld:"M",addr:10140,val:0}, {fld:"M",addr:10140,val:20,ocd:500,oc:VISU.comm.pollRaumWerte}),
        },
        pers: {
            person1: VISU.PicButton.erzeuge
                ('pers_anw1', VISU.comm.cx.writeByte, undefined, {fld:"M",addr:10500,val:1,ocd:500,oc:VISU.comm.pollPersDaten},VISU.bild.pers1kl),
            person2: VISU.PicButton.erzeuge
                ('pers_anw2', VISU.comm.cx.writeByte, undefined, {fld:"M",addr:10500,val:2,ocd:500,oc:VISU.comm.pollPersDaten},VISU.bild.pers2kl),
            person3: VISU.PicButton.erzeuge
                ('pers_anw3', VISU.comm.cx.writeByte, undefined, {fld:"M",addr:10500,val:3,ocd:500,oc:VISU.comm.pollPersDaten},VISU.bild.pers3kl),
            person4: VISU.PicButton.erzeuge
                ('pers_anw4', VISU.comm.cx.writeByte, undefined, {fld:"M",addr:10500,val:4,ocd:500,oc:VISU.comm.pollPersDaten},VISU.bild.pers4kl),
            anwesend: VISU.ButtonAnzeige.erzeugeStdButt
                ('pers_butt1', VISU.comm.cx.writeBool, {fld:"M",addr:10501,val:0}, {fld:"M",addr:10501,val:1,ocd:500,oc:VISU.comm.pollPersDaten}),
            wecker: VISU.ButtonAnzeige.erzeugeStdButt
                ('pers_butt2', VISU.comm.cx.writeBool, {fld:"M",addr:10502,val:0}, {fld:"M",addr:10502,val:1,ocd:500,oc:VISU.comm.pollPersDaten}),
            wechsBettseite: VISU.Button.erzeugeStdButt
                ('pers_butt3', VISU.comm.cx.writeBool, {fld:"M",addr:10503,val:0}, {fld:"M",addr:10503,val:1,ocd:500,oc:VISU.comm.pollPersDaten}),
            schlaeft: VISU.ButtonAnzeige.erzeugeStdButt
                ('pers_butt4', VISU.comm.cx.writeBool, {fld:"M",addr:10504,val:0}, {fld:"M",addr:10504,val:1,ocd:500,oc:VISU.comm.pollPersDaten}),
            blendeTagesPresEin: VISU.Button.erzeugeStdButt
                ('pers_butt5', VISU.sonst.oeffnePresets, undefined, 't'),
            blendeWochPresEin: VISU.Button.erzeugeStdButt
                ('pers_butt6', VISU.sonst.oeffnePresets, undefined, 'w'),
            
            tagesPreset1: VISU.DataElement.erzeugePreset('drag1',1),
            tagesPreset2: VISU.DataElement.erzeugePreset('drag2',2),
            tagesPreset3: VISU.DataElement.erzeugePreset('drag3',3),
            tagesPreset4: VISU.DataElement.erzeugePreset('drag4',4),
            tagesPreset5: VISU.DataElement.erzeugePreset('drag5',5),
            tagesPreset6: VISU.DataElement.erzeugePreset('drag6',6),
            tagesPreset7: VISU.DataElement.erzeugePreset('drag7',7),
            tagesPreset8: VISU.DataElement.erzeugePreset('drag8',8),
            tagesPreset9: VISU.DataElement.erzeugePreset('drag9',9),
            tagesPreset10: VISU.DataElement.erzeugePreset('drag10',10),
            
            wochenPreset1: VISU.DataElement.erzeugePreset('drag11',101),
            wochenPreset2: VISU.DataElement.erzeugePreset('drag12',102),
            wochenPreset3: VISU.DataElement.erzeugePreset('drag13',103),
            wochenPreset4: VISU.DataElement.erzeugePreset('drag14',104),
            wochenPreset5: VISU.DataElement.erzeugePreset('drag15',105),
            wochenPreset6: VISU.DataElement.erzeugePreset('drag16',106),
            wochenPreset7: VISU.DataElement.erzeugePreset('drag17',107),
            wochenPreset8: VISU.DataElement.erzeugePreset('drag18',108),
            wochenPreset9: VISU.DataElement.erzeugePreset('drag19',109),
            wochenPreset10: VISU.DataElement.erzeugePreset('drag20',110),
            
            wecken: VISU.ButtonAnzeige.erzeugeStdButt
                ('schaltpkt1', VISU.comm.cx.writeByte, {fld:'M',addr:10529,val:0}, {fld:'M',addr:10529,val:1,ocd:500,oc:VISU.comm.pollPersDaten}),
            aufstehen: VISU.Button.erzeugeStdButt
                ('schaltpkt2', VISU.comm.cx.writeByte, undefined, {fld:'M',addr:10524,val:1,ocd:500,oc:VISU.comm.pollZeitEinstell}),
            gehen: VISU.Button.erzeugeStdButt
                ('schaltpkt5', VISU.comm.cx.writeByte, undefined, {fld:'M',addr:10524,val:2,ocd:500,oc:VISU.comm.pollZeitEinstell}),
            kommen: VISU.Button.erzeugeStdButt
                ('schaltpkt6', VISU.comm.cx.writeByte, undefined, {fld:'M',addr:10524,val:3,ocd:500,oc:VISU.comm.pollZeitEinstell}),
            schlafen: VISU.Button.erzeugeStdButt
                ('schaltpkt3', VISU.comm.cx.writeByte, undefined, {fld:'M',addr:10524,val:4,ocd:500,oc:VISU.comm.pollZeitEinstell}),
           
            stdplus: VISU.Button.erzeugeStdButt
                ('zeiteinst1', VISU.sonst.stelleZeit, 'stop', 'std+'),
            stdminus: VISU.Button.erzeugeStdButt
                ('zeiteinst4', VISU.sonst.stelleZeit, 'stop', 'std-'),
            stdplus: VISU.Button.erzeugeStdButt
                ('zeiteinst2', VISU.sonst.stelleZeit, 'stop', 'min+'),
            stdminus: VISU.Button.erzeugeStdButt
                ('zeiteinst5', VISU.sonst.stelleZeit, 'stop', 'min-'),
            nullen: VISU.Button.erzeugeStdButt
                ('zeiteinst3', VISU.sonst.stelleZeit, undefined, 'nullen'),
            ein_aus: VISU.Button.erzeugeStdButt
                ('zeiteinst6', VISU.sonst.stelleZeit, undefined, 'ein_aus'),
            speichern: VISU.Button.erzeugeBreitenButt
                ('zeiteinst7', VISU.sonst.stelleZeit, undefined, 'speichern')
            
        },
        einstell: {
            xmasAuto: VISU.ButtonAnzeige.erzeugeStdButt
                ('xmas1', VISU.comm.cx.writeBool, {fld:"M",addr:10800,val:0}, {fld:"M",addr:10800,val:1,ocd:500,oc:VISU.comm.pollEinstell}),
            xmasTest: VISU.ButtonAnzeige.erzeugeStdButt
                ('xmas2', VISU.comm.cx.writeBool, {fld:"M",addr:10801,val:0}, {fld:"M",addr:10801,val:1,ocd:500,oc:VISU.comm.pollEinstell}),
            nacht: VISU.ButtonAnzeige.erzeugeStdButt
                ('nacht1', VISU.comm.cx.writeBool, {fld:"M",addr:10805,val:0}, {fld:"M",addr:10805,val:1,ocd:500,oc:VISU.comm.pollEinstell}),
        },
        fbh: {
            ein: VISU.ButtonAnzeige.erzeugeStdButt
                ('heiz1', VISU.comm.cx.writeBool, {fld:"M",addr:10600,val:0}, {fld:"M",addr:10600,val:1}),
            auskuehlsch: VISU.ButtonAnzeige.erzeugeStdButt
                ('heiz2', VISU.comm.cx.writeBool, {fld:"M",addr:10601,val:0}, {fld:"M",addr:10601,val:1}),
            hand: VISU.ButtonAnzeige.erzeugeStdButt
                ('heiz3', VISU.comm.cx.writeBool, {fld:"M",addr:10602,val:0}, {fld:"M",addr:10602,val:1}),
            vorlplus: VISU.Button.erzeugeStdButt
                ('heiz4', VISU.comm.cx.writeBool, {fld:"M",addr:10603,val:0}, {fld:"M",addr:10603,val:1}),
            mischauf: VISU.ButtonAnzeige.erzeugeStdButt
                ('heiz5', VISU.comm.cx.writeBool, {fld:"M",addr:10606,val:0}, {fld:"M",addr:10606,val:1}),
            pumpe: VISU.ButtonAnzeige.erzeugeStdButt
                ('heiz6', VISU.comm.cx.writeBool, {fld:"M",addr:10605,val:0}, {fld:"M",addr:10605,val:1}),
            vorlminus: VISU.Button.erzeugeStdButt
                ('heiz7', VISU.comm.cx.writeBool, {fld:"M",addr:10604,val:0}, {fld:"M",addr:10604,val:1}),
            mischzu: VISU.ButtonAnzeige.erzeugeStdButt
                ('heiz8', VISU.comm.cx.writeBool, {fld:"M",addr:10607,val:0}, {fld:"M",addr:10607,val:1}),
            absenk: VISU.ButtonAnzeige.erzeugeStdButt
                ('heiz9', VISU.comm.cx.writeBool, {fld:"M",addr:10608,val:0}, {fld:"M",addr:10608,val:1}),
        }
             
	}
    
    //Buttontexte für dynam. Änderung
    VISU.buttontext = {
        //Wohnzimmer
        raum1: {
            licht1: 'TV',
            licht2: 'Szene 2',
            licht3: 'Szene 3',
            licht4: 'Szene 4',
            licht5: 'Szene 5',
            licht6: 'Szene 6',
            sonder1: 'Verschatt.',
            sonder2: '---',
            sonder3: '---',
        },
        //Flur
        raum2: {
            licht1: 'Szene 1',
            licht2: 'Szene 2',
            licht3: 'Szene 3',
            licht4: 'Szene 4',
            licht5: 'Szene 5',
            licht6: 'Szene 6',
            sonder1: '---',
            sonder2: '---',
            sonder3: '---',
        },
        //Schlafzimmer
        raum3: {
            licht1: 'Szene 1',
            licht2: 'Szene 2',
            licht3: 'Szene 3',
            licht4: 'Szene 4',
            licht5: 'Szene 5',
            licht6: 'Szene 6',
            sonder1: 'Verschatt.',
            sonder2: '---',
            sonder3: '---',
        },
        //Kinderzimmer
        raum4: {
            licht1: 'Szene 1',
            licht2: 'Szene 2',
            licht3: 'Szene 3',
            licht4: 'Szene 4',
            licht5: 'Szene 5',
            licht6: 'Szene 6',
            sonder1: 'Verschatt.',
            sonder2: '---',
            sonder3: '---',
        },
        //Bad
        raum5: {
            licht1: 'Hell',
            licht2: 'Gedimmt',
            licht3: 'Baden Naddl',
            licht4: 'Baden Tom',
            licht5: 'Duschen Naddl',
            licht6: 'Duschen Tom',
            sonder1: 'Lüfter',
            sonder2: 'Heizkörper',
            sonder3: '---',
        },
        //WC
        raum6: {
            licht1: 'Szene 1',
            licht2: 'Szene 2',
            licht3: 'Szene 3',
            licht4: 'Szene 4',
            licht5: 'Szene 5',
            licht6: 'Szene 6',
            sonder1: 'Lüfter',
            sonder2: '---',
            sonder3: '---',
        },
        
        
    }

    //Aktualisiere Rolloanwahlen nach Lesen der Daten
    VISU.button.aktualAnzeig = function() {
        VISU.anzeig.aktualisiere(VISU.button.rolloAnw);
        VISU.anzeig.aktualisiere(VISU.button.raumfunkt);
        VISU.anzeig.aktualisiere(VISU.button.pers);
    }

}

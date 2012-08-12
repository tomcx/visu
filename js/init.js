/**
 * @author T.Schmidt, 06.02.2009
 * 
 * Initialisierung
 * 
 */
 
VISU.init.starten = function() {
    
    //Kontextmenü deaktivieren
    document.body.oncontextmenu = function() {return false};
    
    //Module initialisieren
    VISU.init.bild();
    VISU.init.canvas();
    VISU.init.meldtxt();
    VISU.init.comm();
	VISU.init.comm_funkt();
    VISU.init.layer();
    VISU.init.layer_2();
    VISU.init.sonst();
    VISU.init.anzeig();
    VISU.init.button();
    VISU.init.comm_def();
    
    try {VISU.comm.cx.logSymbols();} catch(e) {};
    
    //Polling starten
    VISU.anzeig.visinfo.data = 'Warte auf Daten ...';
    VISU.comm.pollZyk1();
    setTimeout('VISU.comm.pollZyk5()',500); //0,5s versetzt starten
    VISU.sonst.warteAufDaten();
}

window.onload = VISU.init.starten;
 

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
    
    //Symboltabelle für Fehlersuche in Konsole schreiben
    //VISU.comm.cx.logSymbols();
    
    //Addresszeile deaktivieren
    function hideAddressBar() {
        if (document.height <= window.outerHeight + 1) {
            document.body.style.height = (window.outerHeight + 50) +'px';
            setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
        } else {
            setTimeout( function(){ window.scrollTo(0, 1); }, 0 ); 
        }
    }
    
    hideAddressBar();
    window.addEventListener("orientationchange", hideAddressBar ); 
    
    //Polling starten
    VISU.anzeig.visinfo.data = 'Warte auf Daten ...';
    VISU.comm.pollZyk1();
    setTimeout(VISU.comm.pollZyk5 ,500); //0,5s versetzt starten
    VISU.sonst.warteAufDaten();
};

window.onload = VISU.init.starten;
 

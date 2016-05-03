/**
 * @author T.Schmidt, 25.03.09
 * 
 * Connector für ADS-Kommunikation
 * 
 */

VISU.init.comm = function() {
    
    VISU.comm = {
        //Webservice erstellen   
        cx: TAME.WebServiceClient.createClient({
            //serviceUrl: window.location.protocol + "//" + window.location.hostname + '/TcAdsWebService/TcAdsWebService.dll',
            serviceUrl: window.location.href.replace(/visu\/main\.html/,'/TcAdsWebService/TcAdsWebService.dll'),
            amsNetId: 'xx.xx.xx.xx.xx.xx',
            //amsNetId: '192.168.1.2.1.1',
            dataAlign4: true,
            onReady: function() {
                //Polling starten
                VISU.anzeig.visinfo.data = 'Warte auf Daten ...';
                VISU.comm.pollZyk1();
                setTimeout(VISU.comm.pollZyk5 ,500); //0,5s versetzt starten
                VISU.sonst.warteAufDaten();
            }
        })
    };
    
};


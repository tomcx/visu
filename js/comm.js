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
	    serviceUrl: window.location.protocol + "//" + window.location.hostname + '/TcAdsWebService/TcAdsWebService.dll',
            //serviceUrl: 'http://192.168.1.234/TcAdsWebService/TcAdsWebService.dll',
            //serviceUrl: 'http://127.0.0.1/TcAdsWebService/TcAdsWebService.dll',
            //serviceUrl: 'http://192.168.1.2/TcAdsWebService/TcAdsWebService.dll',
            amsNetId: '5.2.52.54.1.1',
            //amsNetId: '192.168.1.2.1.1',
            dataAlign4: true
        })
    }
    
}


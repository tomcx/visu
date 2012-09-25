/**
 * @author T.Schmidt, 06.02.2009
 * 
 * 21.09.2012 Auf CSS-Transformationen umgestellt und Touchevents hinzugefügt.
 * 
 * 
 *
 * Namespace erzeugen, alle Objekte werden global unter "VISU" platziert
 * 
 * Konstanten, Konstruktoren und allgem. Funktionen liegen
 * Namensraum direkt unter "VISU", alle anderen in Unterkategorien
 * 
 * Unterkategorien: anzeig  - Anzeigen, z.B. Fenster, Temperaturen usw.
 *                  bild    - Bildobjekte
 *                  button  - Schaltflächen
 *                  init    - Initialisierung nach "onload"
 *                  layer   - ein-/ausblendbare Ebenen (z.B. Rollobedienung)
 *                  comm    - Kommunikation
 *                  canvas  - Definitionen für mit Canvas generierte Hintergründe
 *                  meldtxt - Meldetexte
 *                  sonst   - sonstige Funktionen
 *                  
 * Die Skripte sind ebenso geordnet, z.B. wird "VISU.anzeig.fenst.kz" im
 * Skript "anzeig.js" definiert.
 *                  
 */

var VISU = {
    // init muss hier definiert werden
    init: {},
    
    // Konstanten	
    DIR_BILDER: "img/",
    
    grad: Math.PI/180,    //Umrechnung von Grad in Radians f. Canvas
    
    //Platzhalter für Timeouts
    timeout: {}
};

/*
 * Konstruktor und Fabrikmethoden, um binäre Anzeigen (Wechsel zwischen
 *  2 Bildern)zu erzeugen, z.B. für Fenster, Türen usw.
 */
// Konstruktor
VISU.AnzeigeBinaer = function(id, bild1, bild0) {
    var self = this;
    this.element = document.getElementById(id);
    this.bild0 = bild0;
    this.bild1 = bild1;
    this.data = false;
};

// Bildwechsel
VISU.AnzeigeBinaer.prototype.aktualisiere = function() {
    this.element.src = (this.data ? this.bild1 : this.bild0).src;
};

//Fabrikmethoden
VISU.AnzeigeBinaer.erzeugeFensterWaag = function(id){
    return new VISU.AnzeigeBinaer(id, VISU.bild.fensterWaagGeschl, 
    VISU.bild.fensterWaagOffen);
};

VISU.AnzeigeBinaer.erzeugeFensterSenkr = function(id){
    return new VISU.AnzeigeBinaer(id, VISU.bild.fensterSenkrGeschl,
    VISU.bild.fensterSenkrOffen);
};

VISU.AnzeigeBinaer.erzeugeTuerWaag = function(id){
    return new VISU.AnzeigeBinaer(id, VISU.bild.tuerWaagGeschl,
    VISU.bild.tuerWaagOffen);
};

VISU.AnzeigeBinaer.erzeugeTuerSenkr = function(id){
    return new VISU.AnzeigeBinaer(id, VISU.bild.tuerSenkrGeschl,
    VISU.bild.tuerSenkrOffen);
};

VISU.AnzeigeBinaer.erzeugeSteckd = function(id) {
    return new VISU.AnzeigeBinaer(id, VISU.bild.steckdEin, VISU.bild.steckdAus);
};

VISU.AnzeigeBinaer.erzeugeSteckd1 = function(id) {
    return new VISU.AnzeigeBinaer(id, VISU.bild.steckd1Ein, VISU.bild.steckd1Aus);
};

VISU.AnzeigeBinaer.erzeugeSteckd2 = function(id) {
    return new VISU.AnzeigeBinaer(id, VISU.bild.steckd2Ein, VISU.bild.steckd2Aus);
};

VISU.AnzeigeBinaer.erzeugeLicht = function(id) {
    return new VISU.AnzeigeBinaer(id, VISU.bild.lichtEin, VISU.bild.lichtAus);
};


/*
 * Funktion zum Ansteuern von Textarrays
 */
// Konstruktor
VISU.AnzeigeTextArray = function(id, texte) {
    var self = this;
    this.element = document.getElementById(id).firstChild;
    this.data = 0;
    
    this.aktualisiere = function() {
        self.data *= 1; //Falls boolsche Werte übergeben wurden
        self.element.data = texte[self.data];
    }
};

VISU.AnzeigeTextArray.erzeuge = function(id, texte) {
    return new VISU.AnzeigeTextArray(id, texte);
};
VISU.AnzeigeTextArray.erzeugeAktDeakt = function(id) {
    return new VISU.AnzeigeTextArray(id, ['deaktiviert', 'aktiviert']);
};
VISU.AnzeigeTextArray.erzeugeAnwAbw = function(id) {
    return new VISU.AnzeigeTextArray(id, ['abwesend', 'anwesend']);
};

/*
 * Funktion zum Ansteuern von Textanzeigen mit Wechsel der CSS-Klassen
 * Übergergabe der Klassennamen mittels Array
 */
// Konstruktor
VISU.AnzeigeTextKlasse = function(id, klassen) {
    var self = this;
    this.element = document.getElementById(id);
    this.data = 0;
    
    this.aktualisiere = function() {
        self.data *= 1; //Falls boolsche Werte übergeben wurden
        self.element.className = klassen[self.data];
    }
};

VISU.AnzeigeTextKlasse.erzeuge = function(id, klassen) {
    return new AnzeigeTextKlasse(id, klassen);
};
VISU.AnzeigeTextKlasse.erzeugeRotGruen = function(id) {
    return new VISU.AnzeigeTextKlasse(id, ['statustext_rot', 'statustext_gruen']);
};


/*
 * Funktion zum erzeugen von Textanzeigen (Temperatur, Luftfeuchte 
 * usw.)
 */
VISU.erzeugeTextAnzeige = function(id) {
    return document.getElementById(id).firstChild;
};


/*
 * Konstruktor und Fabrikmethode für die Rolloanzeigen im Hauptbild
 */
// Konstruktor
VISU.AnzeigeRollo = function(id, anw) {
    var self = this,
        tmp = 'VISU.button.rolloAnw.' + anw;
    
    this.pos = 0;
    this.auto = 0;
    this.modus = 0;
    this.xmas = false;   
    this.anwahl = tmp.split(".");
    
	this.element = document.getElementById(id);
	var _spanElem = this.element.getElementsByTagName('span');
	this.balkenAnzeige = this.element.getElementsByTagName('div')[1];
    this.fahrAnzeige = this.element.getElementsByTagName('img')[0];
    
	this.prozAnzeige = _spanElem[0];
	this.betrArtAnzeige = _spanElem[2];
	this.modusAnzeige = _spanElem[3];
    this.xmasAnzeige = _spanElem[4];
    
    this.element.onmousedown = this.element.ontouchstart = function() {
        self.anwaehlen();
    }
    
};

VISU.AnzeigeRollo.prototype.aktualisiere = function() {
    this.balkenAnzeige.style.height = this.pos + '%';
    this.prozAnzeige.firstChild.data = this.pos;
    this.betrArtAnzeige.firstChild.data = this.auto ? 'Auto' : 'Hand';
    this.modusAnzeige.firstChild.data = this.modi[this.modus];
    this.xmasAnzeige.innerHTML = this.xmas ? 'x<br />s' : '';
    if (this.modus == '121') 
            this.fahrAnzeige.src = VISU.bild.rolloAuf.src;
    else if (this.modus == '122') 
            this.fahrAnzeige.src = VISU.bild.rolloAb.src;
    else this.fahrAnzeige.src = VISU.bild.rolloSteht.src;
};

VISU.AnzeigeRollo.prototype.modi = {
    
    '120': 'Sperre',
	'136': 'TagPo2',
    '137': 'Schatt',
    '141': 'Nacht',
    '142': 'Nacht2',
    '143': 'Lüften',
    '144': 'Xmas',
    '111': 'Wind',
    '112': 'Feuer',
    '115': 'Regen',
    '121': 'Auf',
    '122': 'Ab',
    '130': 'Steht',
    '135': 'TagPos'
};

VISU.AnzeigeRollo.prototype.anwaehlen = function() {
    if ( ! VISU.layer.rollobedien.gesperrt) {
        VISU.layer.rollobedien.blendeEin();
        // Toogle-Buttons setzen
        if (this.anwahl.length == 4) {
            window[this.anwahl[0]][this.anwahl[1]][this.anwahl[2]][this.anwahl[3]].setzeEin();
        }
        else {
            window[this.anwahl[0]][this.anwahl[1]][this.anwahl[2]][this.anwahl[3]][this.anwahl[4]].setzeEin();
        }
    }
    else if ( VISU.layer.rollobedien.eingeblendet ) {
        // Toogle-Buttons setzen
        if (this.anwahl.length == 4) {
            window[this.anwahl[0]][this.anwahl[1]][this.anwahl[2]][this.anwahl[3]].setzeEin();
        }
        else {
            window[this.anwahl[0]][this.anwahl[1]][this.anwahl[2]][this.anwahl[3]][this.anwahl[4]].setzeEin();
        }
    }
    else VISU.sonst.alert('Rollobedienung von anderem Terminal geöffnet !');
};

VISU.AnzeigeRollo.erzeugeAnzeige = function(id, anw) {
	return new VISU.AnzeigeRollo(id, anw);
};


/*
 * Konstruktor und Fabrikmethode für Balkenanzeigen
 */
VISU.AnzeigeBalken = function(param) {
    this.sollData = 22;
    this.istData = 22;
    
    var hauptStrichLaenge = 10;        //Länge eines Hauptskalentriches
    var unterStrichLaenge = 5;         //Länege eines Zwischenstriches
    var korr = 0.5;                    //Korrektur wg. Linienstärke kleiner 1
    var offsetX = 7;                   //Sklalenoffset X
    var offsetY = 20;                  //Sklalenoffset Y
    var textOffsetX = -4               //x-Offset Skalenbeschriftung
    var textOffsetY = -5;             //y-Offset Skalenbeschriftung
    var breiteSollbereich = 10;        //Dicke der Anzeige Sollbereich
    var breiteIstBalken = Math.round(param.breite * 0.8);
    var sollZeiger = 10;               //Größe Sollwertzeiger
    
    var element = document.getElementById(param.id);
    var ctx = element.getContext('2d');
    
    var tb, lastX, i, x, x2, j, sollAnfang, sollEnde, endeIstBalken, startSollZeiger;
    
	ctx.font = "9px helvetica";    //Schriftart Skalenbeschriftung
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 0.5;

    this.aktualisiere = function() {
        
        //Begrenzungen
        if (this.istData < param.minWert) {
            this.istData = param.minWert;
        }
        if (this.istData > param.maxWert) {
            this.istData = param.maxWert;
        }
        if (this.sollData < param.minSoll) {
            this.sollData = param.minSoll;
        }
        if (this.sollData > param.maxSoll) {
            this.sollData = param.maxSoll;
        }
        
        //Canvas löschen        
        ctx.clearRect(0, 0, element.offsetWidth, element.offsetHeight);
        
        //Beginn Bargraph zeichnen
        ctx.save();
        
        //Verschiebung des Nullpunktes um die Offsets
        ctx.translate(offsetX, offsetY);

        //Skalenhintergrund
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(0, 0, param.laenge + korr*2, param.breite);

        //Istwert-Skala zeichnen
        tb = param.laenge / param.hauptTeiler;
        lastX = 0;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,0.5)'; //für Text
        for (i = 0; i <= param.hauptTeiler; i++) {
            x = i * tb;
            ctx.moveTo(x +  korr, korr);
            ctx.lineTo(x + korr, hauptStrichLaenge + korr);
            
            ctx.fillText((param.maxWert - param.minWert) / param.hauptTeiler * i + param.minWert, x + textOffsetX, textOffsetY);
            
            if (i > 0 && param.unterTeiler > 1) {
                for (j = 1; j < param.unterTeiler; j++) {
                    x2 = (x - lastX) / param.unterTeiler;
                    ctx.moveTo(x + korr - x2*j, korr);
                    ctx.lineTo(x + korr - x2*j, unterStrichLaenge + korr);
                }
            }
            lastX = x;
        }
        
        ctx.stroke();
        
        //Begrenzung Sollwert zeichnen
        if (param.anzSoll) {
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            sollAnfang = param.laenge * (param.minSoll - param.minWert) / (param.maxWert - param.minWert);
            sollEnde = param.laenge * (param.maxSoll - param.minWert) / (param.maxWert - param.minWert);
            ctx.fillRect(sollAnfang, param.breite - breiteSollbereich,
                         sollEnde - sollAnfang + korr * 2, breiteSollbereich);
            
        }
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        
        //Istwertbalken zeichnen
        ctx.fillStyle = 'rgba(120,150,160,0.5)';
        endeIstBalken = param.laenge * (this.istData - param.minWert) / (param.maxWert - param.minWert);
        ctx.fillRect(0, (param.breite - breiteIstBalken) / 2, endeIstBalken + korr * 2, breiteIstBalken);
        
        
        //Sollwertzeiger zeichnen
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        startSollZeiger = param.laenge * (this.sollData - param.minWert) / (param.maxWert - param.minWert);
        ctx.moveTo(startSollZeiger + korr, param.breite + 1);
        ctx.lineTo(startSollZeiger + sollZeiger / 2 + korr, param.breite + 1 + sollZeiger + korr);
        ctx.lineTo(startSollZeiger - sollZeiger / 2 + korr, param.breite + 1 + sollZeiger + korr);
        ctx.closePath();
        
        ctx.stroke();
        
        ctx.restore();
    }    
};

VISU.AnzeigeBalken.erzeugeAnzeige = function(param) {
    return new VISU.AnzeigeBalken(param);
};


/*
 * Konstruktor und Fabrikmethode für Charts
 * Hintere Y-Skala wird nur angezeigt, wenn minY2 und maxY2 angegeben sind. 
 * Anzeige des zweiten Graphen richtet sich dann dann nach dieser Skala.
 * Zoom gilt nur für ersten Graph.
 */
VISU.AnzeigeChart = function(param){
    var self = this;
    this.param = param;
    this.minY = param.minY;
    this.maxY = param.maxY;
    this.minY2 = param.minY2;
    this.maxY2 = param.maxY2;
    this.teilerY = param.teilerY;
    this.subTeilerY = param.subTeilerY;
    this.zoomed = false;
    
    this.element = document.getElementById(param.id);
    this.ctx = this.element.getContext('2d');
    this.ctx.font = "9px helvetica"; //Schriftart Skalenbeschriftung
    this.data1 = [19.7, 20, 20.5, 20.8, 21, 21, 21.2, 20.5, 20, 20, 20.2, 20.3, 20.1, 20, 19.7, 19.5, 19.3, 19, 19, 18.7, 18.6, 18.4, 18.4, 18.3];
    //this.data2 = [15, 15, 16, 16.5, 17.5, 18, 18, 19.5, 19.6, 19.7, 20, 20.1, 20.1, 20.2, 20.5, 23.5, 24, 24.2, 24.6, 26, 26, 27, 28, 28.5];
    
    this._korr = 0.5;                             //Korrektur wg. Linienstärke kleiner 1
    this._offsetX = 30;                           //Sklalenoffset X
    this._offsetY = 17;                           //Sklalenoffset Y
    this._textYOffsetX = -14;                     //x-Offset Y-Skalenbeschriftung vorn
    this._textYOffsetY = -2;                      //y-Offset Y-Skalenbeschriftung vorn und hinten
    this._textY2OffsetX = param.laenge + 3;       //x-Offset Y-Skalenbeschriftung hinten
    this._textXOffsetX = 8;                       //x-Offset Y-Skalenbeschriftung vorn
    this._textXOffsetY = -10;                     //y-Offset Y-Skalenbeschriftung vorn
    this._labelOffsetX = 0;                       //x-Offset Label
    this._labelOffsetY = param.hoehe + 8;         //y-Offset Label
    this._zoomAnzOffsetX = param.laenge - 30;     //x-Offset für Zoom-Anzeige
    this._styleGitter = 'rgba(255,255,255,0.3)';  //für Gitterlinien
    this._styleSubGitter = 'rgba(255,255,255,0.07)'; //für Zwischenlinien
    this._backGround1 = 'rgba(255,255,255,0.07)'; //äußerer Hintergrung
    this._backGround2 = 'rgba(255,255,255,0.03)'; //innerer Hintergrund
    this._borderStyle = 'rgba(255, 255, 255, 1)'; //linke und rechte Außenlinie
    this._lineWidthGitter = 0.3;
    this._lineWidthGraph = 0.6;
    
    this.element.onmousedown = this.element.ontouchstart = function(e) {
        e.preventDefault();
        if (self.param.zoom > 0) self.zoom();
    };
    
    this.aktualisiere(); //bei Objekterstell. 1 mal zeichnen
};

VISU.AnzeigeChart.prototype.aktualisiere = function() {
        var th, th2, i, x, y, beschrY, jetzt, stunde, tb, graphOffset;
    
        this.ctx.save();
        
        this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    
        //äußerer Hintergrund und Seitenlinien
        this.ctx.fillStyle = this._backGround1;
        this.ctx.fillRect(0, 0, this.element.width, this.element.height);
        this.ctx.save();
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = this._borderStyle;
        this.ctx.strokeStyle = this._borderStyle;
        this.ctx.lineWidth = 0.5;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, this.element.height);
        this.ctx.moveTo(this.element.width, 0);
        this.ctx.lineTo(this.element.width, this.element.height);
        this.ctx.stroke();
        this.ctx.restore();
        
        //innerer Hintergrund, Label und Achsen
        this.ctx.translate(this._offsetX, this.element.height - this._offsetY); //Verschiebung des Nullpunktes an den Chart-Nullpunkt, Y-Werte negiert rechnen
        this.ctx.fillStyle = this._backGround2;
        this.ctx.fillRect(0, 0, this.param.laenge, -this.param.hoehe);
        this.ctx.fillStyle = this.param.styleText;
        this.ctx.fillText(this.param.label, this._labelOffsetX, -this._labelOffsetY);
        if (this.zoomed === true) {
            this.ctx.fillText('Zoom', this._zoomAnzOffsetX, -this._labelOffsetY);
        }
        
        if (this.param.achsen === true) {
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            this.ctx.beginPath();
            this.ctx.moveTo(this._korr, -this.param.hoehe - this._korr);
            this.ctx.lineTo(this._korr, -this._korr);
            this.ctx.lineTo(this.param.laenge + this._korr, -this._korr);
            this.ctx.stroke();
        }
        
        //Y-Teilung und Skala
        this.ctx.lineWidth = this._lineWidthGitter;
        this.ctx.strokeStyle = this._styleGitter;
        this.ctx.beginPath();
        th = this.param.hoehe / this.teilerY;
        for (i = 1; i < this.teilerY; i++) {
            y = i * th;
            this.ctx.moveTo(this._korr, -y - this._korr);
            this.ctx.lineTo(this.param.laenge + this._korr, -y - this._korr);
            
            //Skala vorn
            this.ctx.fillStyle = this.param.styleY1;
            beschrY = (this.maxY - this.minY) / this.teilerY * i + this.minY;
            beschrY = String(beschrY);
            if (beschrY.length == 1) 
                beschrY = "  " + beschrY;
            this.ctx.fillText(beschrY, this._textYOffsetX, -this._textYOffsetY - y);
            
            //Skala hinten
            if (this.param.minY2 === undefined && this.param.maxY2 === undefined || this.zoomed === true) {
                this.minY2 = this.minY;
                this.maxY2 = this.maxY;
            }
            
            if (typeof this.data2 == 'object' && this.param.styleY2 != undefined) {
                this.ctx.fillStyle = this.param.styleY2;
            }
            
            beschrY = (this.maxY2 - this.minY2) / this.teilerY * i + this.minY2;
            beschrY = String(beschrY);
            if (beschrY.length == 1) 
                beschrY = "   " + beschrY;
            else 
                if (beschrY.length == 2) 
                    beschrY = " " + beschrY;
            this.ctx.fillText(beschrY, this._textY2OffsetX, -this._textYOffsetY - y);
        }
        this.ctx.stroke();
        
        //Unterteilung
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = this._styleSubGitter;
        th2 = this.param.hoehe / (this.teilerY * this.subTeilerY);
        for (i = 1; i < this.teilerY * this.subTeilerY; i++) {
            y = i * th2;
            this.ctx.moveTo(this._korr, -y - this._korr);
            this.ctx.lineTo(this.param.laenge + this._korr, -y - this._korr);
        }
        this.ctx.stroke();
        this.ctx.restore();
        
        //X-Teilung
        this.ctx.fillStyle = this.param.styleText; //für Text
        this.ctx.beginPath();
        jetzt = new Date();
        stunde = jetzt.getHours() + 1;
        tb = this.param.laenge / this.param.teilerX;
        
        for (i = 0; i <= this.param.teilerX - 1; i = i + 2) {
            if (stunde == 24) 
                stunde = 0;
            else 
                if (stunde == 25) 
                    stunde = 1;
            x = i * tb;
            this.ctx.moveTo(x + this._korr, -this._korr);
            this.ctx.lineTo(x + this._korr, -this.param.hoehe - this._korr);
            this.ctx.fillText(stunde, x + this._textXOffsetX, -this._textXOffsetY);
            stunde = stunde + 2;
        }
        this.ctx.stroke();
        
        //Graphen
        /*
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = "rgba(0, 0, 0, 1)";
        */
        graphOffset = this.param.laenge / this.param.teilerX;
        this.ctx.lineWidth = this._lineWidthGraph;
        
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.param.laenge, -this.param.hoehe);
        this.ctx.clip();
        
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.param.styleGraph1;
        this.ctx.moveTo(graphOffset + this._korr, -((this.param.hoehe * (this.data1[0] - this.minY) / (this.maxY - this.minY)) + this._korr));
        for (i = 1; i < this.data1.length; i++) {
            //console.log(this.data1[i]);
            this.ctx.lineTo(graphOffset + this._korr + i * this.param.laenge / (this.data1.length + 1), -((this.param.hoehe * (this.data1[i] - this.minY) / (this.maxY - this.minY)) + this._korr));
        }
        this.ctx.stroke();
        
        if (this.data2) {
        
            if (!this.minY2 || !this.maxY2) {
                this.minY2 = this.minY;
                this.maxY2 = this.maxY;
            }
            this.ctx.beginPath();
            if (this.param.styleGraph2 != undefined) this.ctx.strokeStyle = this.param.styleGraph2;
            this.ctx.moveTo(graphOffset + this._korr, -((this.param.hoehe * (this.data2[0] - this.minY2) / (this.maxY2 - this.minY2)) + this._korr));
            for (i = 1; i < this.data2.length; i++) {
                this.ctx.lineTo(graphOffset + this._korr + i * this.param.laenge / (this.data2.length + 1), -((this.param.hoehe * (this.data2[i] - this.minY2) / (this.maxY2 - this.minY2)) + this._korr));
            }
            this.ctx.stroke();
        }
        this.ctx.restore();   
};
    
VISU.AnzeigeChart.prototype.zoom = function() {
    
    var i, data1min, data1max;
    
    if (this.zoomed === true) {
        this.minY = this.param.minY;
        this.maxY = this.param.maxY;
        this.minY2 = this.param.minY2;
        this.maxY2 = this.param.maxY2;
        this.teilerY = this.param.teilerY;
        this.subTeilerY = this.param.subTeilerY;
        this.zoomed = false;
    }
    else {
        //Die Zoom-Werte werden nur für den 1. Graph berechnet
        this.zoomed = true;
        data1min = this.data1[0];
        data1max = this.data1[0];
        //Min-/Maxwerte finden
        for (i = 1; i < this.data1.length; i++) {
            if (this.data1[i] < data1min) {
                data1min = this.data1[i];
            }
            if (this.data1[i] > data1max) {
                data1max = this.data1[i];
            }
        }
        /*
        if (this.data2) {
            for (i = 1; i < this.data2.length; i++) {
                if (this.data2[i] < data2min) {
                    data2min = this.data2[i];
                }
                if (this.data2[i] > data2max) {
                    data2max = this.data2[i];
                }
            }
        }
        else {
            data2min = data1min;
            data2max = data1max;
        }
        */
        this.minY = Math.ceil(data1min / this.param.zoom) * this.param.zoom - this.param.zoom;
        this.maxY = Math.floor(data1max / this.param.zoom) * this.param.zoom + this.param.zoom;
        
        if (this.maxY - this.minY <= this.param.zoom) {
            this.maxY += this.param.zoom;
        }
        
        this.teilerY = (this.maxY - this.minY) / this.param.zoom;
        this.subTeilerY = this.param.zoomSubTeilerY;
    }
    this.aktualisiere(); 
};

VISU.AnzeigeChart.erzeugeAnzeige = function(param) {
    return new VISU.AnzeigeChart(param);
};


/*
 * Konstruktor und Fabrikmethode für Buttons
 */
// Konstruktor
VISU.Button = function(id, funkt, wert0, wert1, bild0, bild1) {
    var self = this;
    this.element = document.getElementById(id);
    this.text = this.element.getElementsByTagName('span')[0];
    this.bildNormal = bild0;
    this.bildBetaet = bild1;
    this.wert0 = wert0;
    this.wert1 = wert1;
    this.funkt = funkt;

    //Handler
    this.element.onmousedown = this.element.ontouchstart = function(e) {
        e.preventDefault();
        self.down();
    };
    this.element.onmouseup = this.element.ontouchend = function(e) {
        e.preventDefault();
        self.up();
    };
    this.element.onmouseout = this.element.ontouchleave = function(e) {
        e.preventDefault();
        self.out();
    };
    
};

VISU.Button.prototype.down = function() {
    this.element.style.backgroundImage = "url(" + this.bildBetaet.src + ")";
    if (this.wert1 != undefined && typeof this.funkt == 'function') this.funkt(this.wert1);
};

VISU.Button.prototype.up = function() { 
    this.element.style.backgroundImage = "url(" + this.bildNormal.src + ")";
    if (this.wert0 != undefined && typeof this.funkt == 'function') this.funkt(this.wert0);
};
  
VISU.Button.prototype.out = function() { 
    this.element.style.backgroundImage = "url(" + this.bildNormal.src + ")";
};

VISU.Button.erzeugeStdButt = function(id, funkt, wert0, wert1) {
    return new VISU.Button(id, funkt, wert0, wert1, 
    VISU.bild.buttonStd, VISU.bild.buttonStdPressed);
};

VISU.Button.erzeugeBreitenButt = function(id, funkt, wert0, wert1) {
    return new VISU.Button(id, funkt, wert0, wert1, 
    VISU.bild.buttonBreit, VISU.bild.buttonBreitPressed);
};

VISU.Button.erzeugeTouchfeld = function(id, funkt, bild1, wert0, wert1) {
    return new VISU.Button(id, funkt, wert0, wert1,
    VISU.bild.transp, bild1);
};

VISU.Button.erzeugeCustomButton = function(id, funkt, bild0, bild1, wert0, wert1) {
    return new VISU.Button(id, funkt, wert0, wert1, bild0, bild1);
};

VISU.Button.erzeugeCloseButton = function(id, funkt, wert0, wert1) {
    return new VISU.Button(id, funkt, wert0, wert1, 
    VISU.bild.iconClose, VISU.bild.iconCloseClicked);
};


/*
 * Konstruktor und Fabrikmethode für Buttons mit Statusanzeige
 */
// Konstruktor
VISU.ButtonAnzeige = function(id, funkt, wert0, wert1, bild0, bild0clicked, bild1, bild1clicked) {
    var self = this;
    this.element = document.getElementById(id);
    this.text = this.element.getElementsByTagName('span')[0];
    this.bildNormal = bild0;
    this.bildBetaet = bild0clicked;
    this.bildEin = bild1;
    this.bildEinBetaet = bild1clicked;
    this.wert0 = wert0;
    this.wert1 = wert1;
    this.funkt = funkt;
    this.anzeige = false;
    this.clicked = false;
    
    //Handler
    this.element.onmousedown = this.element.ontouchstart = function(e) {
        e.preventDefault();
        self.down();
    };
    this.element.onmouseup = this.element.ontouchend = function(e) {
        e.preventDefault();
        self.up();
    };
	this.element.onmouseout = this.element.ontouchleave = function(e) {
        e.preventDefault();
        self.out();
    };
};

VISU.ButtonAnzeige.prototype.down = function() {
    this.element.style.backgroundImage = "url(" + (this.anzeige ? this.bildEinBetaet : this.bildBetaet).src + ")";
    if (this.wert1 != undefined && typeof this.funkt == 'function') this.funkt(this.wert1);
    this.clicked = true;
};

VISU.ButtonAnzeige.prototype.up = function() { 
    this.element.style.backgroundImage = "url(" + (this.anzeige ? this.bildEin : this.bildNormal).src + ")";
    if (this.wert0 != undefined && typeof this.funkt == 'function') this.funkt(this.wert0);
    this.clicked = false;
};
  
VISU.ButtonAnzeige.prototype.out = function() { 
    this.element.style.backgroundImage = "url(" + (this.anzeige ? this.bildEin : this.bildNormal).src + ")";
    this.clicked = false;
};
    
VISU.ButtonAnzeige.prototype.aktualisiere = function() {
    if (this.clicked === false) {
        this.element.style.backgroundImage = "url(" + (this.anzeige ? this.bildEin : this.bildNormal).src + ")";
    }
    else {
        this.element.style.backgroundImage = "url(" + (this.anzeige ? this.bildEinBetaet : this.bildBetaet).src + ")";
    }
};

VISU.ButtonAnzeige.erzeugeStdButt = function(id, funkt, wert0, wert1) {
    return new VISU.ButtonAnzeige(id, funkt, wert0, wert1, 
    VISU.bild.buttonStd, VISU.bild.buttonStdPressed, VISU.bild.buttonStdEin, VISU.bild.buttonStdEinPressed);
};


/*
 * Konstruktor und Fabrikmethode für Buttons mit Toggle-Funktion
 */
// Konstruktor
VISU.ButtonToggle = function(id, typ, funkt, wert0, wert1, bild0, bildclick, bild1) {
    var self = this;
    this.element = document.getElementById(id);
    this.typ = typ;
    this.bildAus = bild0;
    this.bildClicked = bildclick;
    this.bildEin = bild1;
    this.funkt = funkt;
	this.wert0 = wert0;
	this.wert1 = wert1;
    this.anzeige = false;
    this.text = this.element.getElementsByTagName('span')[0];

    this.toggle = function(e) {
        e.preventDefault();
        self.element.style.backgroundImage = "url(" + self.bildClicked.src + ")";
		if (self.anzeige == false) {
			self.setzeEin();
		}
        else self.setzeAus();
    };
    
    this.release = function(e) {
        e.preventDefault();
        self.aktualisiere();
    };

    //Handler
    this.element.onmousedown= this.element.ontouchstart = this.toggle;
    this.element.onmouseup= this.element.ontouchend = this.release;
};

VISU.ButtonToggle.prototype.setzeEin = function() {
    if (this.wert1 != undefined && typeof this.funkt == 'function') this.funkt(this.wert1);
};

VISU.ButtonToggle.prototype.setzeAus = function() {
    if (this.wert0 != undefined && typeof this.funkt == 'function') this.funkt(this.wert0);
};

VISU.ButtonToggle.prototype.aktualisiere = function() {
    this.element.style.backgroundImage = "url(" + (this.anzeige ? this.bildEin : this.bildAus).src + ")";
};

VISU.ButtonToggle.erzeugePfeilRunterButt = function(id, funkt, wert0, wert1) {
    return new VISU.ButtonToggle(id, 1, funkt, wert0, wert1, 
    VISU.bild.pfeilRunter, VISU.bild.pfeilRunterClicked, VISU.bild.pfeilRunterAngew);
};

VISU.ButtonToggle.erzeugePfeilRechtsButt = function(id, funkt, wert0, wert1) {
    return new VISU.ButtonToggle(id, 1, funkt, wert0, wert1, 
    VISU.bild.pfeilRechts, VISU.bild.pfeilRechtsClicked, VISU.bild.pfeilRechtsAngew);
};

VISU.ButtonToggle.erzeugePfeilHochButt = function(id, funkt, wert0, wert1) {
    return new VISU.ButtonToggle(id, 1, funkt, wert0, wert1, 
    VISU.bild.pfeilHoch, VISU.bild.pfeilHochClicked, VISU.bild.pfeilHochAngew);
};

VISU.ButtonToggle.erzeugeStdButt = function(id, funkt, wert0, wert1) {
    return new VISU.ButtonToggle(id, 2, funkt, wert0, wert1, 
    VISU.bild.buttonStd, VISU.bild.buttonStdPressed, VISU.bild.buttonStdEin);
};


/*
 * Konstruktor und Fabrikmethode für Buttons mit Bildern
 */
VISU.PicButton = function(id, funkt, wert0, wert1, bild) {
    var self = this;
    this.element = document.getElementById(id);
    //this.text = this.element.getElementsByTagName('span')[0];
    //this.bild = this.element.getElementsByTagName('img')[0];
    this.wert0 = wert0;
    this.wert1 = wert1;
    this.funkt = funkt;

    //Handler
    this.element.onmousedown = this.element.ontouchstart = function(e) {
        e.preventDefault();
        self.down();
    };
    this.element.onmouseup = this.element.ontouchend =function(e) {
        e.preventDefault();
        self.up();
    };
	this.element.onmouseout= this.element.ontouchleave = function(e) {
        e.preventDefault();
        self.out();
    };
};

VISU.PicButton.prototype.down = function() {
    this.element.style.opacity = 1;
    if (this.wert1 != undefined && typeof this.funkt == 'function') this.funkt(this.wert1);
};

VISU.PicButton.prototype.up = function() { 
    this.element.style.opacity = 0.6;
    if (this.wert0 != undefined && typeof this.funkt == 'function') this.funkt(this.wert0);
};
  
VISU.PicButton.prototype.out = function() { 
    this.element.style.opacity = 0.6;
};

VISU.PicButton.erzeuge = function(id, funkt, wert0, wert1, bild) {
    return new VISU.PicButton(id, funkt, wert0, wert1, bild);
};


/*
 * Konstruktor und Fabrikmethode für Layer
 */
// Konstruktor
VISU.Layer = function(param){
    var self = this,
        elem;
    
    //Canvas
    if (param.canvas) {
        //Hintergründe zeichnen
        for (elem in param.canvas) {
            //Dragbar bei Widgets;
            if (elem == 'bar') {
                if (param.mainLabel) {
                    param.canvas[elem].mainLabel = param.mainLabel;
                }
                VISU.zeichneForm(param.id + '_dragbar',  param.canvas[elem]);  
            }
            else {
                //Label von Main- und Sublayern übergeben
                if (param.mainLabel) {
                    param.canvas[elem].mainLabel = param.mainLabel;
                }
                VISU.zeichneForm(param.id + '_canvas', param.canvas[elem]);
            }
        }
    }
    
    //Koordinaten speichern
    function saveKoord() {
        localStorage[param.id + '_X'] = self.element.offsetLeft;
        localStorage[param.id + '_Y'] = self.element.offsetTop;
        
        for (i in VISU.layer) {
            localStorage[VISU.layer[i].param.id + '_Z'] = document.getElementById(VISU.layer[i].param.id).style.zIndex;
        }
    }
    
    this.param = param;
    this.eingeblendet = false;
    this.gesperrt = false;
    this.pressed = false;
    this.element = document.getElementById(param.id);
    this.dragBar = document.getElementById(param.id + '_dragbar');
          
    this.blendeEin = function() {
        self.eingeblendet = true;
        if (typeof self.param.setzeSperrFlag == 'function') {
            self.param.setzeSperrFlag();
            self.sperrInterval = window.setInterval(self.param.setzeSperrFlag, 10000); //Refresh-Zeit, Reset-Zeit in SPS 3s
        }
        self.element.style.visibility = 'visible';   
        self.setzeZIndex('200');
        self.element.style.MozTransition = "opacity 500ms ease-out";
        self.element.style.webkitTransition = "opacity 500ms ease-out";
        self.element.style.opacity = 1;
    };

    this.blendeAus = function() {
        
        function fade() {
            self.element.style.visibility = 'hidden';
            if (self.sperrInterval) window.clearInterval(self.sperrInterval);
            if (typeof self.param.setzeSperrFlag == 'function') {
                self.param.entfSperrFlag();
            }
            self.eingeblendet = false;
            self.element.removeEventListener('transitionend', fade, false);
            self.element.removeEventListener('webkitTransitionEnd', fade, false);
        }
            
        self.element.style.MozTransition = "opacity 500ms ease-out";
        self.element.style.webkitTransition = "opacity 500ms ease-out";
        self.element.style.opacity = 0;
        
        self.element.addEventListener('transitionend', fade, false);
        self.element.addEventListener('webkitTransitionEnd', fade, false);
        
    };

    this.setzeZIndex = function(index) {
        var l, z, i;       
        if (self.element.style.zIndex !== index && self.dragBar !== null) {
            for (l in VISU.layer) {              
                self.element.style.zIndex = index;
                if (VISU.layer[l].element.style.zIndex !== '0') {
                    i = parseInt(VISU.layer[l].element.style.zIndex, 10);
                    z = (i - 1).toString();
                    if (!isNaN(z)) {
                        VISU.layer[l].element.style.zIndex = (i - 1).toString();
                    }
                }  
            }
        }
    };
    
    this.element.onmousedown = this.element.ontouchstart = function(e) {
            self.setzeZIndex('200');
    };
    
    this.element.onmouseup = this.element.ontouchend = function(e) {
            setTimeout(saveKoord, 2000);
    };
    
    //Make Layer draggable
    if (this.dragBar !== null) {

        this.move = function(sollPos, startPos) {
            
            //this.versatzX = sollPos.X - startPos.X + this.param.transX;
            //this.versatzY = sollPos.Y - startPos.Y + this.param.transY;
            this.versatzX = sollPos.X - startPos.X;
            this.versatzY = sollPos.Y - startPos.Y;
            
            if (param.magnetic && this.versatzY <= this.minY) {
                this.versatzY = this.minY;
            }
            
            this.element.style.MozTransform = 'translate(' + this.versatzX + 'px,' + this.versatzY + 'px)';
            this.element.style.webkitTransform = 'translate(' + this.versatzX + 'px,' + this.versatzY + 'px)';
        };

		this.dragBar.onmousedown = this.dragBar.ontouchstart = function(e) {
            
            function mausBewegung(e) {
                e.preventDefault();
                e.stopPropagation();
                
                var aktPos = holeKoord(e);
                self.move(aktPos, self.startMausPos);
            }
            
            function magnet() {
                
                function resetTrans() {
                    self.element.removeEventListener('transitionend', resetTrans, false);
                    self.element.removeEventListener('webkitTransitionEnd', resetTrans, false);
                    self.element.style.top = (self.element.offsetTop + self.versatzY) + 'px';
                    self.element.style.left = (self.element.offsetLeft + self.versatzX) + 'px';
                    self.element.style.MozTransition = null;
                    self.element.style.webkitTransition = null;
                    self.element.style.webkitTransform = null;
                    self.element.style.MozTransform = null;
                    self.versatzX = 0;
                    self.versatzY = 0;
                } 
                
                //Widgets an oberen Rand ziehen
                if (param.magnetic && self.element.offsetTop + self.versatzY < 0) {

                    self.element.style.MozTransition = "-moz-transform 500ms ease-out";
                    self.element.addEventListener('transitionend', resetTrans, false);
                    self.element.style.MozTransform = 'translate(' + self.versatzX + 'px,' + self.minY + 'px)';

                    self.element.style.webkitTransition = "-webkit-transform 500ms ease-out";
                    self.element.addEventListener('webkitTransitionEnd', resetTrans, false);
                    self.element.style.webkitTransform = 'translate(' + self.versatzX + 'px,' + self.minY + 'px)';
                    
                    self.versatzY = self.minY;
                } else {
                    resetTrans();
                }
            }
            
            function initMove() {
                self.minY = -(self.element.offsetTop + self.dragBar.offsetTop + 3);
                self.element.style.MozTransition = "-moz-transform linear";
                self.element.style.webkitTransition = "-webkit-transform linear";
            };
            
            function holeKoord(e) {
                var pos = {};
                if (e.changedTouches) {
                    //Touchscreens
                    pos.X = e.changedTouches[0].clientX;
                    pos.Y = e.changedTouches[0].clientY;
                } else {
                    pos.X = e.clientX;
                    pos.Y = e.clientY;
                }
                return pos;
            }
            
            initMove();
            
            self.startMausPos = holeKoord(e);
            document.ontouchmove = document.onmousemove = mausBewegung;
            document.ontouchend = document.onmouseup = function(e) {
                e.preventDefault();
                document.ontouchmove = document.ontouchend = document.onmousemove = document.onmouseup = null;
                magnet();
            }
        };
    }
};

VISU.Layer.erzeugeLayer = function(param) {
    return new VISU.Layer(param);
};

VISU.Layer.erzeugeMainLayer = function(param) {
    //Canvas-BG wegen Schatten an den Anfang von param.canvas setzen
    var canvas = param.canvas,
        c, w;
    param.canvas = {};
    param.canvas.bg = VISU.canvas.mainLayerBg;
    for (c in  canvas) {
        param.canvas[c] = canvas[c];
    }
    //gespeicherte XYZ-Werte setzen
    //gespeicherte XYZ-Werte setzen
    var w = document.getElementById(param.id);
    w.style.left = localStorage[param.id + '_X'] + 'px';
    w.style.top = localStorage[param.id + '_Y'] + 'px';
    w.style.zIndex = localStorage[param.id + '_Z'];
    return new VISU.Layer(param);
};

VISU.Layer.erzeugeSubLayer = function(param) {
     //Canvas-BG wegen Schatten an den Anfang von param.canvas setzen
    var canvas = param.canvas,
    c;
    param.canvas = {};
    param.canvas.bg = VISU.canvas.subLayerBg;
    for (c in  canvas) {
        param.canvas[c] = canvas[c];
    }
    return new VISU.Layer(param);
};

VISU.Layer.erzeugeWidget = function(param) {
    //Größe der Hintergrundzeichnung an Canvas anpassen
    var e = document.getElementById(param.id + '_canvas'),
    widgDragBarTop, widgDragBarLeft, b, w;
    
    param.canvas.bg.width = e.offsetWidth - 10;             //-10 wegen Platz für Schatten
    param.canvas.bg.height = e.offsetHeight - 10;           //-10 wegen Platz für Schatten
    //X- und Y-Positionen für Dragbar
    widgDragBarTop = (param.canvas.bg.y + param.canvas.bg.height - 5); 
    widgDragBarLeft = (param.canvas.bg.x + param.canvas.bg.width - 20);
    b = document.getElementById(param.id + '_dragbar');
    //Dragbar-Canvas versetzen
    b.style.top = widgDragBarTop + 'px';
    b.style.left = widgDragBarLeft - b.offsetWidth + 'px';
    //gespeicherte XYZ-Werte setzen
    //gespeicherte XYZ-Werte setzen
    var w = document.getElementById(param.id);
    w.style.left = localStorage[param.id + '_X'] + 'px';
    w.style.top = localStorage[param.id + '_Y'] + 'px';
    w.style.zIndex = localStorage[param.id + '_Z'];
    return new VISU.Layer(param);
};


/*
 *  Sonstige Funktionen zur Objekterzeugung
 */
VISU.erzeugeBildObjekt = function(datei) {
    var bild = new Image();
    bild.src = VISU.DIR_BILDER + datei;
    return bild;	
};


/*
 *  Funktion zum Zeichnen vesch. Formen (f. Canvas)
 */
VISU.zeichneForm = function(id,p) {
    var elem = document.getElementById(id),
    ctx = elem.getContext('2d'),
    fill = false,
    drawBox, drawLabel, drawDragBar, rg, radgrad, elem, lg, lingrad,
    einzug, dragBarWidth, verklein, korr, einzugX, einzugY,
    vertOffs, labelOffsX, labelOffsY;
            
    drawBox = function(x, y, width, height) {
        /*ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
        */
        ctx.beginPath();
        ctx.moveTo(x, y + p.radius);
        ctx.lineTo(x, y + height - p.radius);
        ctx.quadraticCurveTo(x, y + height, x + p.radius, y + height);
        ctx.lineTo(x + width - p.radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - p.radius);
        ctx.lineTo(x + width, y + p.radius);
        ctx.quadraticCurveTo(x + width, y, x + width - p.radius, y);
        ctx.lineTo(x + p.radius, y);
        ctx.quadraticCurveTo(x, y, x, y + p.radius);
        ctx.stroke();
        if (fill) ctx.fill();
    };
    
    drawLabel = function(text, offsX, offsY, align) {
        ctx.save();
        /*ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 1;
        ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
        */
        
        ctx.font = "14px helvetica";
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.textAlign = align;
        ctx.fillText(text, offsX, offsY);
        ctx.restore();           
    };
    
    drawDragBar = function(){
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(0, p.height - p.radius);
        ctx.quadraticCurveTo(0, p.height, p.radius, p.height);
        ctx.lineTo(p.width - p.radius, p.height);
        ctx.quadraticCurveTo(p.width, p.height, p.width, p.height - p.radius);
        ctx.lineTo(p.width, 5);
        ctx.stroke();
        ctx.fill();
    };
    
    if (p.radialGradient) {
        rg = p.radialGradient;
        radgrad = ctx.createRadialGradient(rg.x1, rg.y1, rg.r1, rg.x2, rg.y2, rg.r2);
        for (elem in p.colorStops) {
            radgrad.addColorStop(p.colorStops[elem].r, p.colorStops[elem].s)
        }
        ctx.fillStyle = radgrad;
        fill = true;
    }
    else 
        if (p.linearGradient) {
            lg = p.linearGradient;
            lingrad = ctx.createLinearGradient(lg.x1, lg.y1, lg.x2, lg.y2);
            for (elem in p.colorStops) {
                lingrad.addColorStop(p.colorStops[elem].x, p.colorStops[elem].s)
            }
            ctx.fillStyle = lingrad;
            fill = true;
        }
        else 
            if (p.fillStyle) {
                ctx.fillStyle = p.fillStyle;
                fill = true;
            }
            
    ctx.strokeStyle = p.strokeStyle;
    ctx.lineWidth = p.lineWidth;
            
    switch (p.shape) {
        case 'mainLayerBg':
            einzug = 100;
            dragBarWidth = 40;
            verklein = 10;
            korr = 0;
            
            ctx.save();
            
            if (p.shadow) {
                ctx.shadowOffsetX = 4;
                ctx.shadowOffsetY = 4;
                ctx.shadowBlur = 10;
                ctx.shadowColor = "rgba(10, 10, 10, 0.2)";
            }
            
            //Fenster
            ctx.beginPath();
            ctx.moveTo(p.x, p.y + p.radius);
            ctx.lineTo(p.x, p.y + p.height - p.radius);
            ctx.quadraticCurveTo(p.x, p.y + p.height, p.x + p.radius, p.y + p.height);
            ctx.lineTo(p.x + p.width - p.radius - einzug, p.y + p.height);
            ctx.lineTo(p.x + p.width - dragBarWidth, p.y + p.height - einzug + p.radius);
            ctx.lineTo(p.x + p.width - dragBarWidth, p.y + p.radius);
            ctx.quadraticCurveTo(p.x + p.width - dragBarWidth, p.y, p.x + p.width - p.radius - dragBarWidth, p.y);
            ctx.lineTo(p.x + p.radius, p.y);
            ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + p.radius);
            ctx.stroke();
            if (fill) ctx.fill();
            
            //Anfasser
            ctx.fillStyle = 'rgba(96,122,137,0.9)';
            //ctx.fillStyle = 'rgba(74,108,120,0.8)';
            ctx.strokeStyle = 'rgba(0,0,0,0)';
            ctx.beginPath();
            ctx.moveTo(p.x + p.width - einzug + korr, p.y + p.height - verklein);
            ctx.lineTo(p.x + p.width - p.radius, p.y + p.height - verklein);
            ctx.quadraticCurveTo(p.x + p.width, p.y  + p.height - verklein, p.x + p.width, p.y + p.height - verklein - p.radius);
            ctx.lineTo(p.x + p.width, p.y + p.height - einzug + p.radius);
            ctx.lineTo(p.x + p.width, p.y + p.radius + verklein);
            ctx.quadraticCurveTo(p.x + p.width, p.y + verklein, p.x + p.width - p.radius, p.y + verklein);
            ctx.lineTo(p.x + p.width - dragBarWidth, p.y + verklein);
            ctx.lineTo(p.x + p.width - dragBarWidth, p.y + p.height - einzug + p.radius);
        
            ctx.fill();
            
            //Label
            ctx.translate(p.x + p.width, p.y + p.height);
            ctx.rotate(270 * VISU.grad);
            if (p.mainLabel) drawLabel(p.mainLabel, 550, -15, 'right');
            
            ctx.restore();
            
            break;
        case 'subLayerBg':
            einzugX = 40;
            einzugY = 300;
            
            ctx.save();
            /*ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
            */
            ctx.beginPath();
            ctx.moveTo(p.x, p.y + p.radius);
            ctx.lineTo(p.x, p.y + p.height - p.radius);
            ctx.quadraticCurveTo(p.x, p.y + p.height, p.x + p.radius, p.y + p.height);
            ctx.lineTo(p.x + p.width - p.radius, p.y + p.height);
            ctx.quadraticCurveTo(p.x + p.width, p.y + p.height, p.x + p.width, p.y + p.height - p.radius);
        
            ctx.lineTo(p.x + p.width, p.y + p.height - einzugY + p.radius/2);      
            ctx.quadraticCurveTo(p.x + p.width, p.y + p.height - einzugY, 
                                 p.x + p.width - p.radius/2, p.y + p.height - einzugY - p.radius/2);
            ctx.lineTo(p.x + p.width - einzugX + p.radius/2, p.y + p.height - einzugY - einzugX + p.radius/2);
            ctx.quadraticCurveTo(p.x + p.width - einzugX, p.y + p.height - einzugY - einzugX,
                                 p.x + p.width - einzugX, p.y + p.height - einzugY - einzugX - p.radius);
    
            ctx.lineTo(p.x + p.width - einzugX, p.y + p.radius);
            ctx.quadraticCurveTo(p.x + p.width - einzugX, p.y, p.x + p.width - p.radius - einzugX, p.y);        
            ctx.lineTo(p.x + p.radius, p.y);
            ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + p.radius);
            ctx.stroke();
            if (fill) ctx.fill();
            
            //Label
            ctx.translate(p.x + p.width, p.y + p.height);
            ctx.rotate(270 * VISU.grad);
            if (p.mainLabel) drawLabel(p.mainLabel, 270, -15, 'right');
            ctx.restore();
            break;
        case 'groupBg':
            ctx.save();
            if (p.shadow) {
                ctx.shadowOffsetX = 4;
                ctx.shadowOffsetY = 4;
                ctx.shadowBlur = 10;
                ctx.shadowColor = "rgba(10, 10, 10, 0.4)";
            }
            drawBox(p.x, p.y, p.width, p.height);
            ctx.restore(); 
            
            if (p.label) {
                vertOffs = 0;
                labelOffsX = 12;
                labelOffsY = 22;
                ctx.save();
                ctx.translate(p.x, p.y);
                if (p.labelOrient == 'vert') {
                    ctx.rotate(270 * VISU.grad);
                    vertOffs = p.height;
                }
                ctx.font = "14px helvetica";
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.fillText(p.label, labelOffsX - vertOffs, labelOffsY);
                ctx.restore();           
            }
            break;
        case 'widgBg':
            ctx.save();
            if (p.shadow) {
                ctx.shadowOffsetX = 4;
                ctx.shadowOffsetY = 4;
                ctx.shadowBlur = 10;
                ctx.shadowColor = "rgba(10, 10, 10, 0.4)";
            }
            drawBox(p.x, p.y, p.width, p.height);
            ctx.restore();
           
            ctx.clearRect(p.x + 25, p.y + p.height - 5, p.width - 50, 5);
            
            ctx.save();
            ctx.lineCap = 'square';
            ctx.strokeStyle = 'rgba(96,122,137,0.9)';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(p.x + 25, p.y + p.height - 2.6);
            ctx.lineTo(p.x + p.width - 25, p.y + p.height - 2.5);
            ctx.stroke();
            ctx.restore();
            break;
        case 'widgDragBar' :
            if (p.shadow) {
                ctx.shadowOffsetX = 4;
                ctx.shadowOffsetY = 4;
                ctx.shadowBlur = 10;
                ctx.shadowColor = "rgba(10, 10, 10, 0.4)";
            }
        
            switch (p.dragBarPos) {
                case 'right':
                    //Noch nicht getestet
                    
                    p.width = elem.height - 10;
                    p.height = elem.width - 10;
                    
                    ctx.rotate(270 * VISU.grad);
                    
                    drawDragBar();
                    
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.shadowBlur = 0;
                    ctx.shadowColor = "rgba(0, 0, 0, 0)";
                    
                    if (p.mainLabel) {
                        drawLabel(p.mainLabel, 20, 20, 'left');
                    }
                    break;  
                default:
                    
                    p.width = elem.width - 10;
                    p.height = elem.height - 10;

                    drawDragBar();
                    
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.shadowBlur = 0;
                    ctx.shadowColor = "rgba(0, 0, 0, 0)";
                    
                    if (p.mainLabel) {
                        drawLabel(p.mainLabel, 20, 25, 'left');
                    }
            }
            break;
        default:
            drawBox(p.x, p.y, p.width, p.height);
    }
        
};


/*
 * Konstruktor und Fabrikmethode für scrollbare Schaltuhr-Anzeige
 */
VISU.AnzeigeScroller = function(param) {
    var self = this,
    i;
    this.param = param;
    this.element = document.getElementById(param.id);
    this.ctx = this.element.getContext('2d');
    
    this.data = new Array(28);
    for (i = 0, i2 = 1; i < 28; i++, i2++) {
        this.data[i] = {
            tag: 0,
            kw: 0,
            monat: 0,
            name: 'keine daten',
            bWecken: false,
            bAufstehen: false,
            bGehen: false,
            bKommen: false,
            bSchlafen: false,
            tAufstehen: '00:00',
            tGehen: '00:00',
            tKommen: '00:00',
            tSchlafen: '00:00',
            wtag: i2
        }
        i2 = i2 < 7 ? i2 : 0;
    }
    this.weckerEin = false;
    
    this.bgData = ["Mo","Di","Mi","Do","Fr","Sa","So"];
    this.monatsNamen = ['Jan','Feb','Mrz','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
    this.mouseOver = false;
    this.lastMausY = 0;
    
    this.frameFullHeight = this.param.frameHoehe + this.param.abstand;
    this.startTransPosY = -this.frameFullHeight + this.param.offsetY ;
    this.minTransPosY = -this.frameFullHeight * 2;
    this.maxTransPosY = 0;
    this.aktTransPosY = this.frameFullHeight;
    
    this.frameCounter = 0;
    this.minCounter = -1;
    this.maxCounter = this.param.frameAnzahl;
    this.angezeigteFrames = Math.ceil(this.param.laengeGes / this.frameFullHeight) + 1;
    this.restLaenge = (this.angezeigteFrames - 1) * this.frameFullHeight - this.param.laengeGes + this.param.offsetY*2;
    
    this.draw = function() {
        
        var colorAct = 'rgba(114, 197, 80, 0.8)',     //Farbe Schaltpunkt aktiv
            colorInact = 'rgba(255,255,255,0.5)',   //Farbe Schaltpunkt inaktiv
            colorWeckerAus = 'rgba(197,114,80,0.8)',   //Farbe Wecken aktiv, aber Wecker aus
            i, offs, count;
        
        //Zeichnen
        self.ctx.clearRect(0, 0, self.element.offsetWidth, self.element.offsetHeight);
        self.ctx.save();
        
        self.ctx.translate(0, self.aktTransPosY);
        
        for (i = 0; i <= self.angezeigteFrames; i++) {
        
            offs = i * self.frameFullHeight;
            
            VISU.zeichneForm(self.param.id, {
                shape: 'groupBg',
                x: 0.5,
                y: 0.5 + offs,
                width: self.param.frameBreite,
                height: self.param.frameHoehe,
                radius: 4,
                strokeStyle: 'rgba(255,255,255,0.7)',
                fillStyle: 'rgba(255,255,255,0.05)',
                lineWidth: 0.5
            })
            
            self.ctx.fillStyle = 'rgba(255,255,255,0.3)';
            
            //Beschriftung Hintergund
            self.ctx.save();
            /*
            self.ctx.shadowOffsetX = 0;
            self.ctx.shadowOffsetY = 0;
            self.ctx.shadowBlur = 10;
            self.ctx.shadowColor = 'rgba(255,255,255,1)';
            */
            
            count = self.frameCounter + i;
            
            if (count >= 0 && count < self.maxCounter) {
                //console.log(count);
                self.ctx.font = "50px helvetica";
                self.ctx.fillText(self.bgData[self.data[count].wtag - 1], 15, offs + 50);
                
                //Daten anzeigen
                self.ctx.font = "42px helvetica";
                self.ctx.fillText(VISU.fixVkStellen(self.data[count].tag, 2), 180, offs + 45); //Tag des Monats
                self.ctx.font = "14px helvetica";
                self.ctx.fillText(self.monatsNamen[self.data[count].monat - 1], 190, offs + 60); //Monat
                self.ctx.fillText('KW ' + VISU.fixVkStellen(self.data[count].kw, 2), 190, offs + 150); //KW
                self.ctx.fillStyle = 'rgba(150, 170, 255, 0.6)';
                self.ctx.fillText(self.data[count].name, 20, offs + 150); //Schicht
                
                self.ctx.font = "12px helvetica";
                
                
                if (self.data[count].bWecken === true){
                    self.ctx.fillStyle = (self.weckerEin === true ? colorAct : colorWeckerAus);
                }
                else {
                    self.ctx.fillStyle = colorInact;
                }
                self.ctx.fillText('Wecken: ' + (self.data[count].bWecken === true ? 'Ein' : 'Aus'), 20, offs + 80);
                
                self.ctx.fillStyle = (self.data[count].bAufstehen === true ? colorAct : colorInact);
                self.ctx.fillText('Aufstehen: ' + self.data[count].tAufstehen, 20, offs + 100);
                
                self.ctx.fillStyle = (self.data[count].bSchlafen === true ? colorAct : colorInact);
                self.ctx.fillText('Schlafen: ' + self.data[count].tSchlafen, 140, offs + 100);
                
                self.ctx.fillStyle = (self.data[count].bGehen === true ? colorAct : colorInact);
                self.ctx.fillText('Gehen: ' + self.data[count].tGehen, 20, offs + 120);
                
                self.ctx.fillStyle = (self.data[count].bKommen === true ? colorAct : colorInact);
                self.ctx.fillText('Kommen: ' + self.data[count].tKommen, 140, offs + 120);
                
            }
            self.ctx.restore(); 
        }
        self.ctx.restore();
    };
    
    this.scroll = function(aktMausY) {
    
        //Falsche Positionswerte ignorieren
        if ((aktMausY < this.element.offsetTop && aktMausY > this.element.offsetTop + this.element.offsetHeight)
        || isNaN(aktMausY)) return;
        
        //Scroll-Bewegung berechnen
        this.bewegY = aktMausY - this.lastMausY;
        this.aktTransPosY = this.aktTransPosY + this.bewegY * 1;
        
        //Scroll-Begrenzungen
        if (this.bewegY > 0 && this.frameCounter <= this.minCounter && this.aktTransPosY > this.startTransPosY) {
            this.aktTransPosY = this.startTransPosY;
        }
        else if (this.bewegY <= 0 && this.frameCounter > this.maxCounter - 1 - this.angezeigteFrames && this.aktTransPosY < this.startTransPosY - this.restLaenge + this.param.abstand - 1) {
            this.aktTransPosY = this.startTransPosY - this.restLaenge + this.param.abstand - 1;
        }
        
        //Versatz und Counter
        if (this.aktTransPosY < this.minTransPosY - this.restLaenge + this.param.abstand) {
            this.aktTransPosY = this.startTransPosY - this.restLaenge + this.param.abstand;
            this.frameCounter++;
        }
        else 
            if (this.aktTransPosY > this.maxTransPosY) {
                this.aktTransPosY = this.startTransPosY;
                this.frameCounter--;
            }
        
        //Zeichnen
        this.draw();
        this.lastMausY = aktMausY;          
    };
    
    this.fadeScroll = function() {
        
        self.fadeScrollMouse = self.lastMausY - self.fadeScrollVal;
        self.scroll(self.fadeScrollMouse);
        
        if (self.fadeScrollVal > 1) {
            self.fadeScrollVal = self.fadeScrollVal - 1;
            window.setTimeout(self.fadeScroll, 25);
        }
        else 
            if (self.fadeScrollVal < -1) {
                self.fadeScrollVal = self.fadeScrollVal + 1;
                window.setTimeout(self.fadeScroll, 25);
            }
            else {
                document.addEventListener("mousemove", self.selectFrame, false);
                document.addEventListener("touchmove", self.selectFrame, false);
            }
    };
    
    this.selectFrame = function(e) {
 
        if (self.element.parentNode.style.visibility != 'visible') return;
        
        var pos = holeKoord(e),
            i;
        
        if ( ! (self.element.offsetLeft + self.element.offsetParent.offsetLeft < pos.X && pos.X < self.element.offsetLeft + self.element.offsetParent.offsetLeft + self.param.frameBreite + self.param.offsetX)) {
            self.mouseOver = false;
            return;
        }

        //Zeichnen
        self.draw();
        
        for (i = 0 ; i <= self.angezeigteFrames; i++) {
           if (pos.Y - self.element.offsetTop - self.element.offsetParent.offsetTop < self.aktTransPosY + (1 + i) * self.frameFullHeight) {
               self.selectedFrame = self.frameCounter + i;
               break;
           }
       }
       
       self.mouseOver = true;

       //Frame-Mausover zeichnen
       self.ctx.save();
       self.ctx.translate(0, self.aktTransPosY);
       
       VISU.zeichneForm(self.param.id, {
                shape: 'groupBg',
                x: 0.5,
                y: 0.5 + (self.selectedFrame - self.frameCounter) * self.frameFullHeight,
                width: self.param.frameBreite,
                height: self.param.frameHoehe,
                radius: 4,
                strokeStyle: 'rgba(255,255,255,0.5)',
                fillStyle: 'rgba(255,255,255,0.05)',
                lineWidth: 0.5
            })
       
       self.ctx.restore();
       
       self.dropZone = self.selectedFrame + 1;

    };
    
    //Events
    function mausBewegung(e) {
        e.preventDefault();
        e.stopPropagation();
        var pos = holeKoord(e);
        self.scroll(pos.Y);
    }
    
    function holeKoord(e) {
            var pos = {};
            if (e.changedTouches) {
                //Touchscreens
                pos.X = e.changedTouches[0].clientX;
                pos.Y = e.changedTouches[0].clientY;
            } else {
                pos.X = e.clientX;
                pos.Y = e.clientY;
            }
            return pos;
        }
    
    this.element.onmousedown = this.element.ontouchstart = function(e) {
        e.preventDefault();
        e.stopPropagation();
        var time = new Date();
        var pos = holeKoord(e);
        
        self.selectFrame(e);
        
        //Doppelclick
        if (self.selectedFrame == self.clickedFrame && time.getTime() < self.startTime + 250) {
            self.param.execOnDoubleClick(self.selectedFrame + 1);
        }  
        
        self.startPos = self.lastMausY = pos.Y;
        self.startTime = time.getTime();
        self.clickedFrame = self.selectedFrame;
        self.fadeScrollVal = 0;
        self.element.onmousemove = self.element.ontouchmove = mausBewegung;
    };
    
    this.element.onmouseup = this.element.ontouchend = function(e) {
        e.preventDefault();
        e.stopPropagation();
        var pos = holeKoord(e);
        self.element.onmousemove = self.element.ontouchmove = null;

        if (self.droppingActive) {
            self.dropData(pos.Y);
        }
        else {
            var posDiff = self.startPos - pos.Y,
                time = new Date(),
                endTime = time.getTime(),
                timeDiff = endTime - self.startTime + 1; // +1 um Division durch Null zu verhindern
            //var speed = posDiff / timeDiff * 40;
            if (timeDiff < 500) {
                if (posDiff > 10 || posDiff < -10) {
                    self.fadeScrollVal = posDiff / timeDiff * 30;
                    document.removeEventListener("mousemove", self.selectFrame, false);
                    document.removeEventListener("touchmove", self.selectFrame, false);
                    self.fadeScroll();
                }
            }
        }
    };
    
    this.element.onmouseout = this.element.ontouchleave = function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.element.onmousemove = self.element.ontouchmove = null;
        self.draw();
    };

    document.addEventListener("mousemove", self.selectFrame, false);
    document.addEventListener("touchmove", self.selectFrame, false);
    
    //Erster Aufruf
    this.scroll(0);   
};

VISU.AnzeigeScroller.erzeuge = function(param) {
    return new VISU.AnzeigeScroller(param);
};


/*
 * Konstruktor und Fabrikmethoden für Drag-And-Drop-Elemente
 */
VISU.DataElement = function(id, data, dropTarget, dropFunction) {
    var self = this;
    this.element = document.getElementById(id);
    this.text = this.element.getElementsByTagName('span')[0];
    this.data = data;
    this.dropTarget = dropTarget;
    this.dropFunction = dropFunction;
    
    this.move = function(sollPos, startPos) {
            
        this.versatzX = sollPos.X - startPos.X;
        this.versatzY = sollPos.Y - startPos.Y;
        
        this.dragElement.style.MozTransform = 'translate(' + this.versatzX + 'px,' + this.versatzY + 'px)';
        this.dragElement.style.webkitTransform = 'translate(' + this.versatzX + 'px,' + this.versatzY + 'px)';
    };
    
    this.element.onmousedown = this.element.ontouchstart = function(e) {
        
        e.stopPropagation();
        e.preventDefault();
        
        function mausBewegung(e) {
            e.preventDefault();
            e.stopPropagation();
            var aktPos = holeKoord(e);
            self.move(aktPos, self.startMausPos);
        }

        function holeKoord(e) {
            var pos = {};
            if (e.changedTouches) {
                //Touchscreens
                pos.X = e.changedTouches[0].clientX;
                pos.Y = e.changedTouches[0].clientY;
            } else {
                pos.X = e.clientX;
                pos.Y = e.clientY;
            }
            return pos;
        }

        self.dragElement = self.element.cloneNode(true);
        self.element.parentNode.appendChild(self.dragElement);
        self.dragElement.style.position = 'absolute';
        self.dragElement.style.top = (self.element.offsetTop) + "px"; 
        self.dragElement.style.left = (self.element.offsetLeft) + "px";
        self.dragElement.style.opacity = 0.5;
        self.dragElement.style.MozTransition = "-moz-transform linear";
        self.dragElement.style.webkitTransition = "-webkit-transform linear";
        self.startMausPos = holeKoord(e);
        
        document.ontouchmove = document.onmousemove = mausBewegung;
        
        document.ontouchend = document.onmouseup = function(e) {
            
            function removeDragElement() {
                self.dragElement.removeEventListener('transitionend', removeDragElement, false);
                self.dragElement.removeEventListener('webkitTransitionEnd', removeDragElement, false);
                self.dragElement.style.MozTransition = null;
                self.dragElement.style.webkitTransition = null;
                self.dragElement.style.webkitTransform = null;
                self.dragElement.style.MozTransform = null;
                self.dragElement.parentNode.removeChild(self.dragElement);
            }
            
            e.stopPropagation();
            e.preventDefault();
            document.ontouchmove = document.ontouchend = document.onmousemove = document.onmouseup = null;
            
            if (self.dropTarget.mouseOver) {
                self.dropFunction(self.data, self.dropTarget.dropZone);
                self.dragElement.innerHTML = "";
                self.dragElement.style.webkitTransform = null;
                self.dragElement.style.MozTransform = null;
                self.dragElement.style.top = (self.dragElement.offsetTop + self.versatzY) + "px"; 
                self.dragElement.style.left = (self.dragElement.offsetLeft + self.versatzX) + "px";
                self.dragElement.style.MozTransition = "-moz-transform 500ms ease-out";
                self.dragElement.style.webkitTransition = "-webkit-transform 500ms ease-out";
                self.dragElement.addEventListener('transitionend', removeDragElement, false);
                self.dragElement.addEventListener('webkitTransitionEnd', removeDragElement, false);
                self.dragElement.style.MozTransform = 'scale(0.1)';
                self.dragElement.style.webkitTransform = 'scale(0.1)';
            } else { 
                self.dragElement.style.MozTransition = "-moz-transform 300ms ease-out";
                self.dragElement.style.webkitTransition = "-webkit-transform 300ms ease-out";
                self.dragElement.addEventListener('transitionend', removeDragElement, false);
                self.dragElement.addEventListener('webkitTransitionEnd', removeDragElement, false);
                self.dragElement.style.MozTransform = 'translate(' + self.element.offsetLeft + 'px,' + self.element.offsetTop + 'px)';
                self.dragElement.style.webkitTransform = 'translate(0px,0px)';
            }
        };
    };
};

VISU.DataElement.erzeugePreset = function(id, preset) {
    return new VISU.DataElement(id, preset, VISU.anzeig.pers.zeitLeiste, VISU.comm.sendPreset);
};


/*
 * Datum und Uhrzeit
 */
VISU.AnzeigeUhr = function(id, typ) {
    
    this.element = document.getElementById(id);
    var tage = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    var self = this;

    this.aktualisiere = function() {
        var jetzt = new Date();
        var tag = jetzt.getDate();
        var monat = jetzt.getMonth() + 1;
        var jahr = jetzt.getYear();
        if (jahr < 2000) jahr = jahr + 1900;
        var stunden = jetzt.getHours();
        var minuten = jetzt.getMinutes();
        var sekunden = jetzt.getSeconds();
        var woTag = jetzt.getDay();
        var vortag = ((tag < 10) ? "0" : "");
        var vormon = ((monat < 10) ? ".0" : ".");
        var vorstd = ((stunden < 10) ? "0" : "");
        var vormin = ((minuten < 10) ? ":0" : ":");
        var vorsek = ((sekunden < 10) ? ":0" : ":");
        var datum = tage[woTag] + ", " + vortag + tag + vormon + monat + "." + jahr;
        var uhrzeit = vorstd + stunden + vormin + minuten + vorsek + sekunden; 
        self.element.innerHTML = ((typ == 'datum') ? datum : uhrzeit);
    }
};

VISU.AnzeigeUhr.erzeugeDigiUhr = function(id) {
    return new VISU.AnzeigeUhr(id, 'uhr')
};

VISU.AnzeigeUhr.erzeugeDatum = function(id) {
    return new  VISU.AnzeigeUhr(id, 'datum')
};


/*
 * Meldebox
 */
VISU.AnzeigeMeldeBox = function(param) {
    var self = this,
    i;
    this.element = document.getElementById(param.id);
    this.ctx = this.element.getContext('2d');
    this.data = new Array(100);
    this.element.onmousedown = this.element.ontouchstart = param.mousedown;
    
    for (i = 0; i < 100; i++) {
        this.data[i] = {
            gekommen: "",
            gegangen: "",
            status: 0
        }
    }
    
    this.aktualisiere = function() {
        
        var draw, sp5txt, sp6txt, xoffs = 57, cnt = 1, k, i, id;
        
        self.ctx.clearRect(0,0,self.element.width,self.element.height);
        
        //Hintergrund Spaltenköpfe
        self.ctx.fillStyle = 'rgba(158,170,186,0.3)';
        self.ctx.fillRect(param.spalte1 - 3, 27, param.spalte2 - param.spalte1 - 1, 17);
        self.ctx.fillRect(param.spalte2 - 3, 27, param.spalte3 - param.spalte2 - 1, 17);
        self.ctx.fillRect(param.spalte3 - 3, 27, param.spalte4 - param.spalte3 - 1, 17);
        self.ctx.fillRect(param.spalte4 - 3, 27, param.spalte5 - param.spalte4 - 1, 17);
        self.ctx.fillRect(param.spalte5 - 3, 27, param.spalte6 - param.spalte5 - 1, 17);
        self.ctx.fillRect(param.spalte6 - 3, 27, self.element.width - param.spalte6 - 10, 17);
        
        //Spaltenbeschriftung
        self.ctx.fillStyle = 'rgba(255,255,255,0.5)';
        self.ctx.font = "12px helvetica";
        self.ctx.fillText('Id', param.spalte1, 40);
        self.ctx.fillText('Typ', param.spalte2, 40);
        self.ctx.fillText('Text', param.spalte3, 40);
        self.ctx.fillText('Gekommen', param.spalte4, 40);
        self.ctx.fillText('Gegangen', param.spalte5, 40);
        self.ctx.fillText('Status', param.spalte6, 40); 
        
        //Meldungen nach Klassen sortiert ausgeben
        for (k = 0; k < 3; k++) {
        
            for (i = 0, id = 1; i < 100; i++, id++) {
                if (self.data[i].status != 0 && param.txt[id] != undefined) {
                
                    self.ctx.save();
                    
                    //Farben und Sortierung
                    switch (param.txt[id].typ) {
                        case 'Hinweis':
                            self.ctx.fillStyle = param.farbeHinw;
                            if (k == 2) draw = true;
                            break;
                        case 'Warnung':
                            self.ctx.fillStyle = param.farbeMeld;
                            if (k == 1) draw = true;
                            break;
                        case 'Alarm':
                            self.ctx.fillStyle = param.farbeAlarm;
                            if (k == 0) draw = true;
                            break;
                        default:
                            self.ctx.fillStyle = 'rgba(255,255,255,0.3)';
                    }
                    
                    sp5txt = (self.data[i].gegangen != '01.01.70, 00:00' ? self.data[i].gegangen : '')
                    
                    //Statustext
                    switch (self.data[i].status) {
                        case 1:
                            sp6txt = 'ansteh.';
                            break;
                        case 2:
                            sp6txt = 'quitt.';
                            break;
                        case 3:
                        case 4:
                            sp6txt = 'gegang.';
                            break;
                        default:
                            sp6txt = 'unbek.';
                    }
                    
                    //Meldung ausgeben (max. 11)
                    if (draw === true && cnt < 11) {
                        self.ctx.fillText(id, param.spalte1, xoffs);
                        self.ctx.fillText(param.txt[id].typ, param.spalte2, xoffs);
                        self.ctx.fillText(param.txt[id].text, param.spalte3, xoffs);
                        self.ctx.fillText(self.data[i].gekommen, param.spalte4, xoffs);
                        self.ctx.fillText(sp5txt, param.spalte5, xoffs);
                        self.ctx.fillText(sp6txt, param.spalte6, xoffs);
                        xoffs += 15;
                        draw = false;
                        cnt++;
                    }
                    
                    self.ctx.restore();
                }
            }
        }
    }
};

VISU.AnzeigeMeldeBox.erzeugeBox = function(param) {
    return new VISU.AnzeigeMeldeBox(param);
};


/*
 * Logbuch
 */
VISU.AnzeigeLogbuch = function(param) {
    var self = this, i;
    this.element = document.getElementById(param.id);
    this.ctx = this.element.getContext('2d');
    this.data = new Array(50);
    
    for (i = 0; i < 50; i++) {
        this.data[i] = {
            zeit: "",
            id: 0,
            status: 0
        }
    }
    
    this.aktualisiere = function() {
        
        var sp2txt, xoffs = 30, i;
        
        self.ctx.clearRect(0,0,self.element.width,self.element.height);
        
        //Hintergrund zeichnen
        //VISU.zeichneForm(param.id,param.bg);
        
        //Hintergrund Spaltenköpfe
        self.ctx.fillStyle = 'rgba(158,170,186,0.3)';
        self.ctx.fillRect(param.spalte1 - 3, 0, param.spalte2 - param.spalte1 - 1, 17);
        self.ctx.fillRect(param.spalte2 - 3, 0, param.spalte3 - param.spalte2 - 1, 17);
        self.ctx.fillRect(param.spalte3 - 3, 0, param.spalte4 - param.spalte3 - 1, 17);
        self.ctx.fillRect(param.spalte4 - 3, 0, param.spalte5 - param.spalte4 - 1, 17);
        self.ctx.fillRect(param.spalte5 - 3, 0, self.element.width - param.spalte5 - 15, 17);
        
        //Spaltenbeschriftung
        self.ctx.fillStyle = 'rgba(255,255,255,0.5)';
        self.ctx.font = "12px helvetica";
        self.ctx.fillText('Zeit', param.spalte1, 13);
        self.ctx.fillText('Status', param.spalte2, 13);
        self.ctx.fillText('Id', param.spalte3, 13);
        self.ctx.fillText('Typ', param.spalte4, 13);
        self.ctx.fillText('Text', param.spalte5, 13); 
        
        for (i = 0; i < 50; i++) {
            if (self.data[i].status != 0) {
                
                //Farben und Sortierung
                switch (param.txt[self.data[i].id].typ) {
                    case 'Hinweis':
                        self.ctx.fillStyle = param.farbeHinw;
                        break;
                    case 'Warnung':
                        self.ctx.fillStyle = param.farbeMeld;
                        break;
                    case 'Alarm':
                        self.ctx.fillStyle = param.farbeAlarm;
                        break;
                    default:
                        self.ctx.fillStyle = 'rgba(255,255,255,0.3)';
                }
                
                //Statustext
                switch (self.data[i].status) {
                    case 1:
                        sp2txt = 'gekommen';
                        break;
                    case 2:
                        sp2txt = 'quittiert';
                        break;
                    case 3:
                        sp2txt = 'gegangen';
                        break;
                    default:
                        sp2txt = 'unbekannt';
                }
                
                //Meldung ausgeben
                self.ctx.fillText(self.data[i].zeit, param.spalte1, xoffs);
                self.ctx.fillText(sp2txt, param.spalte2, xoffs);
                self.ctx.fillText(self.data[i].id, param.spalte3, xoffs);
                self.ctx.fillText(param.txt[self.data[i].id].typ, param.spalte4, xoffs);
                self.ctx.fillText(param.txt[self.data[i].id].text, param.spalte5, xoffs);
                
                xoffs += 15;

            }
        }  
    }
};

VISU.AnzeigeLogbuch.erzeuge = function(param) {
    return new VISU.AnzeigeLogbuch(param);
};


/*
 * Anzeige Pumpe
 */
VISU.AnzeigePumpe = function(param) {
    var self = this, i;
    this.element = document.getElementById(param.id);
    this.ctx = this.element.getContext('2d');
    this.intervTime = Math.floor(1000/param.rate);
    this.interval;  //Speicher für Intervall
    this.angle = VISU.grad * 360 / param.segm;    //Segmentwinkel
    this.rotAngle = 0;
    this.data = false;
    this.laeuft = false;     //Animation läuft
    //Zeichen
    this.draw = function() {
        
        var korr = (1 - param.segmLen)/(param.segm-1);
        var innerRad = param.radius/2;
       
        self.ctx.clearRect(0,0,self.element.width,self.element.height);
        
        self.ctx.save();
        
        self.ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        self.ctx.fillStyle = 'rgba(255,255,255,0.5)';
        self.ctx.lineWidth = 10;
        
        self.ctx.translate(param.x,param.y);
        
        //Gehäuse
        self.ctx.beginPath();
        self.ctx.arc(0,0,param.radius + self.ctx.lineWidth/2,0,Math.PI*2,false);
        self.ctx.stroke();
        
        //Durchbrüche
        self.ctx.clearRect(-param.durchbrBreite / 2,0,param.durchbrBreite,self.element.height/2);
        self.ctx.clearRect(-param.durchbrBreite / 2,0,param.durchbrBreite,-self.element.height/2);
        
        self.ctx.lineWidth = 2;
        
        //Äußerer Ring
        self.ctx.beginPath();
        self.ctx.arc(0, 0, param.radius + 10 + self.ctx.lineWidth / 2, 0, Math.PI * 2, false);
        self.ctx.stroke();
        
        //Anschlüsse
        self.ctx.clearRect(-param.anschlBreite / 2,0,param.anschlBreite,self.element.height/2);
        self.ctx.clearRect(-param.anschlBreite / 2,0,param.anschlBreite,-self.element.height/2);
        
        //Welle
        self.ctx.beginPath();
        self.ctx.arc(0,0,innerRad,0,Math.PI*2,false);
        self.ctx.fill();
        
        
        self.startAngle = self.rotAngle;
        self.endAngle = self.startAngle + self.angle*param.segmLen;
       
        self.ctx.strokeStyle = 'rgba(255,255,255,0.9)';
        self.ctx.lineWidth = 1;
        
        for (i = 1; i <= param.segm; i++) {
            self.ctx.beginPath();
            self.ctx.arc(0,0,innerRad + 2,self.endAngle,self.startAngle,true);
            self.ctx.arc(0,0,param.radius - 2,self.startAngle - korr,self.endAngle + korr,false);
            self.ctx.closePath();
            self.ctx.stroke(); 
            self.ctx.fill();
            self.startAngle = self.endAngle + self.angle*(1-param.segmLen);
            self.endAngle = self.startAngle + self.angle*param.segmLen;
        }
        
        self.ctx.restore();
        
    };
    //Rotation
    this.rotate = function() {
        if (self.rotAngle > 360) self.rotAngle -= 360; 
        self.rotAngle += param.speed;
        self.draw();
    };
    
    //Animation starten/stoppen in Abh. von self.data
    this.aktualisiere = function() {
        if (self.data === false) {
            self.stop();
        }
        else if (self.data === true && self.laeuft === false) {
            self.start();
        }
    };
    
    //Animation start
    this.start = function() {
        if (self.laeuft === false) this.interval =  window.setInterval(self.rotate, self.intervTime);
        self.laeuft = true;
    };
    //Animation stop
    this.stop = function() {
        window.clearInterval(self.interval);
        self.laeuft = false;
    };
    this.draw();
};

VISU.AnzeigePumpe.erzeuge = function(param) {
    return new VISU.AnzeigePumpe(param);
};


/*
 * Anzeige Mischer
 */
VISU.AnzeigeMischer = function(param) {
    var self = this;
    this.element = document.getElementById(param.id);
    this.ctx = this.element.getContext('2d');
    this.data = 0; //Mischer-Wert 0 - 100 %
    this.startAngle = 90; //Mischer-Stellung zu
    
    this.aktualisiere = function() {
      
        self.ctx.clearRect(0, 0, self.element.width, self.element.height);
        
        self.ctx.save();
        
        self.ctx.translate(param.x,param.y);
        
        self.ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        self.ctx.fillStyle = 'rgba(255,255,255,0.5)';
        self.ctx.lineWidth = 10;
        
        //Gehäuse
        self.ctx.beginPath();
        self.ctx.arc(0, 0, param.radius + self.ctx.lineWidth / 2, 0, Math.PI * 2, false);
        self.ctx.stroke();
        
        //Durchbrüche
        self.ctx.clearRect(-param.durchbrBreite / 2,0,param.durchbrBreite,self.element.height/2);
        self.ctx.clearRect(0,-param.durchbrBreite / 2,-self.element.width/2,param.durchbrBreite);
        self.ctx.clearRect(-param.durchbrBreite / 2,0,param.durchbrBreite,-self.element.height/2);
        
        self.ctx.lineWidth = 2;
        
        //Äußerer Ring
        self.ctx.beginPath();
        self.ctx.arc(0, 0, param.radius + 10 + self.ctx.lineWidth / 2, 0, Math.PI * 2, false);
        self.ctx.stroke();
        
        //Anschlüsse
        self.ctx.clearRect(-param.anschlBreite / 2,0,param.anschlBreite,self.element.height/2);
        self.ctx.clearRect(0,-param.anschlBreite / 2,-self.element.width/2,param.anschlBreite);
        self.ctx.clearRect(-param.anschlBreite / 2,0,param.anschlBreite,-self.element.height/2);
        
        //Welle
        self.ctx.beginPath();
        self.ctx.arc(0, 0, 5, 0, Math.PI * 2, false);
        self.ctx.fill();
        
        //Mischerklappe
        self.ctx.lineWidth = 1;

        self.ctx.rotate(VISU.grad*self.startAngle + VISU.grad * self.data * 0.9); // 0.9 ^= 100% = 90°
        
        self.ctx.beginPath();
        self.ctx.moveTo(param.radius / 2,10);
        self.ctx.lineTo(0,10);
        self.ctx.arc(0,0,10,VISU.grad*90,VISU.grad*270,false);
        self.ctx.lineTo(param.radius / 2,-10);
        self.ctx.arc(0,0,param.radius - 2,VISU.grad*320,VISU.grad*40,false);
        self.ctx.closePath();
        self.ctx.fill();
        self.ctx.stroke();
        
        
        self.ctx.restore();
    };
    this.aktualisiere();
};

VISU.AnzeigeMischer.erzeuge = function(param) {
    return new VISU.AnzeigeMischer(param);
};

/*
 * Anzeige Rohre
 */
VISU.AnzeigeRohrNetz = function(param) {
    var self = this;
    this.element = document.getElementById(param.id);
    this.ctx = this.element.getContext('2d');
    this.temp = 0; //Vorlauftemp für Farbe
    this.laeuft = false; //Animation läuft
    
    this.draw = function() {
        self.ctx.clearRect(0, 0, self.element.width, self.element.height);
        self.ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        self.ctx.fillStyle = 'rgba(255,255,255,0.5)';
        self.ctx.lineWidth = 2;
        var startX = 65;
        var startX2 = 217;
        var startY = 40;
        var endY = 540;
        var mischX = 191;
        var mischY = 337;
        var rohr = 26;
        
        
        /*
        self.ctx.beginPath();
        self.ctx.moveTo(startX, startY);
        self.ctx.lineTo(startX, endY);
        self.ctx.moveTo(startX + rohr, startY);
        self.ctx.lineTo(startX + rohr, endY);
        self.ctx.stroke();
        */
        //Rohr Warwmw. + Vorlauf
        self.ctx.beginPath();
        self.ctx.moveTo(startX2, startY);
        self.ctx.lineTo(startX2, endY);
        self.ctx.moveTo(startX2 + rohr, startY);
        self.ctx.lineTo(startX2 + rohr, endY);
   
        //Rohr Rücklauf
        self.ctx.moveTo(startX + rohr, mischY);
        self.ctx.lineTo(mischX, mischY);
        self.ctx.moveTo(startX + rohr, mischY + rohr);
        self.ctx.lineTo(mischX, mischY + rohr);
        self.ctx.stroke();
        
        //Farbe Rücklauf
        var lingrad = self.ctx.createLinearGradient(startX + rohr, 0, 200, 0);
        lingrad.addColorStop(0, 'rgba(50,0,150,0.7)');
        lingrad.addColorStop(1, 'rgba(0,0,100,0)');
        self.ctx.fillStyle = lingrad;
        self.ctx.fillRect(startX + rohr, mischY + 2, 100, rohr - 4);
        
        //Farbe Warwmw. + Vorlauf
        lingrad = self.ctx.createLinearGradient(startX2 + 2, startY, rohr - 4, endY - startY);
        lingrad.addColorStop(0, 'rgba(100,0,100,0.7)');
        lingrad.addColorStop(0.5, 'rgba(0,0,0,0)');
        lingrad.addColorStop(1, 'rgba(150,0,0,0.7)');
        self.ctx.fillStyle = lingrad;
        self.ctx.fillRect(startX2 + 2, startY, rohr - 4, endY - startY);
        
        //Pumpe und Mischer ausschneiden
        self.ctx.clearRect(startX2 - 1, 156, 28, 108);
        self.ctx.clearRect(startX2 - 1, 311, 28, 78);
        //self.ctx.clearRect(startX + rohr - 1, mischY + 1, 5, rohr - 2);
        
        self.ctx.fillStyle = 'rgba(255,255,255,0.5)';
        self.ctx.font = "10px helvetica";
        
        self.ctx.fillText('Rücklauf >>', startX + 28, mischY + 17);
        
        self.ctx.save();
        self.ctx.translate(startX2 + 17, endY );
        self.ctx.rotate(270 * VISU.grad);
        self.ctx.fillText('Warmwasser 40 - 70 °C >>', 3, 0);
        self.ctx.fillText('Vorlauf >>', 447, 0);
        self.ctx.restore();

    };
 
    this.draw(); //Zeichnen   
};

VISU.AnzeigeRohrNetz.erzeuge = function(param) {
    return new VISU.AnzeigeRohrNetz(param);
};


/*
 * Tabbelle für Heizkreise
 */
VISU.AnzeigeHeizkreise = function(param) {
    
    var self = this;
    this.element = document.getElementById(param.id);
    this.ctx = this.element.getContext('2d');
    this.typ = new Array(13);
    this.status = new Array(13);
    this.name = ["Schlafzimmer Bett","Schlafzimmer","Kinderzimmer hinten","Kinderzimmer vorn",
                "Bad vorn","Bad Podest","WC","Flur Arbeitsbereich","WZ Küchenbereich","WZ Esstisch",
                "WZ Mitte","WZ Hinten","Bad Heizkörper"];
    
    
    this.aktualisiere = function(){
    
        var sp3txt, sp4txt, xoffs = 30, i;
        
        self.ctx.clearRect(0, 0, self.element.width, self.element.height);
        
        //Hintergrund zeichnen
        //VISU.zeichneForm(param.id,param.bg);
        //self.ctx.fillStyle = 'rgba(4, 23, 35, 0.8)';
        //self.ctx.fillRect(param.spalte1 - 3, xoffs - 12, self.element.width - 30, 13 * 15);
        
        //Hintergrund Spaltenköpfe
        self.ctx.fillStyle = 'rgba(158,170,186,0.3)';
        self.ctx.fillRect(param.spalte1 - 3, 0, param.spalte2 - param.spalte1 - 1, 17);
        self.ctx.fillRect(param.spalte2 - 3, 0, param.spalte3 - param.spalte2 - 1, 17);
        self.ctx.fillRect(param.spalte3 - 3, 0, param.spalte4 - param.spalte3 - 1, 17);
        self.ctx.fillRect(param.spalte4 - 3, 0, self.element.width - param.spalte4 - 15, 17);
        
        //Spaltenbeschriftung
        self.ctx.fillStyle = 'rgba(255,255,255,0.5)';
        self.ctx.font = "12px helvetica";
        self.ctx.fillText('HK', param.spalte1, 13);
        self.ctx.fillText('Name', param.spalte2, 13);
        self.ctx.fillText('Typ', param.spalte3, 13);
        self.ctx.fillText('Ventil', param.spalte4, 13);

        for (i = 0; i < 13; i++) {
            
            switch (self.typ[i]) {
                case "NC":
                    sp3txt = "Möhlenhoff AA4004 NC";
                    break;
                case "NO":
                    sp3txt = "Möhlenhoff AA4104 NO";
                    break;
                default:
                    sp3txt = "kein Antrieb vorh.";         
            }
            
            switch (self.status[i]) {
                case 1:
                    sp4txt = "startet";
                    break;
                case 2:
                    sp4txt = "schließt";
                    break;
                case 3:
                    sp4txt = "geschl.";
                    break;
                case 4:
                    sp4txt = "öffnet";
                    break;
                case 5:
                    sp4txt = "offen";
                    break;
                default:
                    sp4txt = "";         
            }
                   
            self.ctx.fillText(i + 1, param.spalte1, xoffs);
            self.ctx.fillText(self.name[i], param.spalte2, xoffs);
            self.ctx.fillText(sp3txt, param.spalte3, xoffs);
            self.ctx.fillText(sp4txt, param.spalte4, xoffs);

            xoffs += 15;
        }  
    };
    
    this.aktualisiere();
};

VISU.AnzeigeHeizkreise.erzeuge = function(param) {
    return new VISU.AnzeigeHeizkreise(param);
};


//Funktion für feste Stellenanzahl, z.B. 001 statt 1
VISU.fixVkStellen = function(zahl, stellen) {
    if(! stellen) stellen = 0;
    var str = zahl.toString(10);
    while (str.length < stellen) {
        str = '0' + str;
    } 
    return str;
};


//-------------------------------------------------------------------------


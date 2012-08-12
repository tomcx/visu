/**
 * @author T.Schmidt, 17.02.2009
 * 
 * Layerdefinitionen
 * 
 */

VISU.init.layer = function() {

    VISU.layer = {
        wohnung: VISU.Layer.erzeugeMainLayer({
            id: 'layer_wohnung',
            mainLabel: 'Ü b e r s i c h t   W o h n u n g',
            canvas: {}
        }),
        rollobedien: VISU.Layer.erzeugeSubLayer({
            id: 'rollobox',
            mainLabel: 'R o l l o s t e u e r u n g',
            canvas: {
                pos: VISU.canvas.rolloPosBg,
                fkt: VISU.canvas.rolloFunktBg,
                anw: VISU.canvas.rolloAnwBg
            },
            setzeSperrFlag: function() {
                VISU.comm.cx.writeBool({addr: '%MB12000', val: 1});
            },
            entfSperrFlag: function() {
                VISU.comm.cx.writeBool({addr: '%MB12001', val: 1});
            } 
        }),
        raumbedien: VISU.Layer.erzeugeSubLayer({
            id: 'raumbox',
            mainLabel: 'R a u m s t e u e r u n g',
            canvas: {
                heiz: VISU.canvas.raumHeizBg,
                licht: VISU.canvas.raumLichtBg,
                sond: VISU.canvas.raumSonderBg
            },
            //draggable: true,
            setzeSperrFlag: function() {
                VISU.comm.cx.writeBool({addr: '%MB12004', val: 1});
            },
            entfSperrFlag: function() {
                VISU.comm.cx.writeBool({addr: '%MB12005', val: 1});
            }
        }),
        personal: VISU.Layer.erzeugeMainLayer({
            id: 'layer_personal',
            mainLabel: 'P e r s ö n l i c h e   E i n s t e l l u n g e n',
            canvas: {},
            setzeSperrFlag: function() {
                VISU.comm.cx.writeBool({addr: '%MB12008', val: 1});
            },
            entfSperrFlag: function() {
                VISU.comm.cx.writeBool({addr: '%MB12009', val: 1});
            },
        }),
        presetsTag: VISU.Layer.erzeugeLayer({
            id: 'presetboxT',
            mainLabel: 'T a g e s p r e s e t s',
            canvas: {
                bg: VISU.canvas.presetboxBg
            }
        }),
        presetsWoche: VISU.Layer.erzeugeLayer({
            id: 'presetboxW',
            mainLabel: 'W o c h e n p r e s e t s',
            canvas: {
                bg: VISU.canvas.presetboxBg
            }
        }),
        zeiteinst: VISU.Layer.erzeugeLayer({
            id: 'zeitbox',
            mainLabel: 'Z e i t e i n s t e l l u n g',
            canvas: {
                bg: VISU.canvas.presetboxBg,
                sp: VISU.canvas.schaltpunkteBg
            }
        }),
        einstell: VISU.Layer.erzeugeMainLayer({
            id: 'layer_einstell',
            mainLabel: 'A l l g e m e i n e   E i n s t e l l u n g e n',
            canvas: {
                xmas: VISU.canvas.einstXmasBg,
                nacht: VISU.canvas.einstNachtBg
            },
            setzeSperrFlag: function() {
                VISU.comm.cx.writeBool({addr: '%MB12012', val: 1});
            },
            entfSperrFlag: function() {
                VISU.comm.cx.writeBool({addr: '%MB12013', val: 1});
            },
        }),
        log: VISU.Layer.erzeugeMainLayer({
            id: 'layer_log',
            mainLabel: 'L o g b u c h  M e l d u n g e n',
            canvas: {},
        }),
        fbh: VISU.Layer.erzeugeMainLayer({
            id: 'layer_fbh',
            mainLabel: 'F u ß b o d e n h e i z u n g',
            canvas: {},
            setzeSperrFlag: function() {
                VISU.comm.cx.writeBool({addr: '%MB12014', val: 1});
            },
            entfSperrFlag: function() {
                VISU.comm.cx.writeBool({addr: '%MB12015', val: 1});
                VISU.anzeig.fbh.pumpe.stop(); //Pumpenanimation ausschalten
            },
        }),
        nav: VISU.Layer.erzeugeWidget({
            id: 'widg_menu',
            canvas: {
                bg: VISU.canvas.widgBg,
                bar: VISU.canvas.widgDragBar
            },
            draggable: true,
            magnetic: true,
            mainLabel: 'H a u p t m e n ü'
        }),
        meldebox: VISU.Layer.erzeugeWidget({
            id: 'widg_meldebox',
            canvas: {
                bg: VISU.canvas.widgBg,
                bar: VISU.canvas.widgDragBar
            },
            magnetic: true,
            mainLabel: 'M e l d u n g e n'
        }),
        clock: VISU.Layer.erzeugeWidget({
            id: 'widg_clock',
            canvas: {
                bg: VISU.canvas.widgBg,
                bar: VISU.canvas.widgDragBar
            },
            magnetic: true,
            mainLabel: '    U h r z e i t'
        }),
        aussentemp: VISU.Layer.erzeugeWidget({
            id: 'widg_aussentemp',
            canvas: {
                bg: VISU.canvas.widgBg,
                bar: VISU.canvas.widgDragBar
            },
            magnetic: true,
            mainLabel: 'A u ß e n t e m p'
        }),
        pers: VISU.Layer.erzeugeWidget({
            id: 'widg_pers',
            canvas: {
                bg: VISU.canvas.widgBg,
                bar: VISU.canvas.widgDragBar
            },
            magnetic: true,
            mainLabel: '  P e r s o n e n'
        }),
        visinfo: VISU.Layer.erzeugeLayer({
            id: 'layer_visinfo'
        })
        
    }
}

VISU.init.layer_2 = function() {
    
    VISU.layer.presetsTag.presets = ['---','---','---','---','---','---','---','---','---','---'];
    VISU.layer.presetsWoche.presets = ['---','---','---','---','---','---','---','---','---','---'];
    
}


/**
 * @author T.Schmidt
 * 
 * Definitionen für mit Canvas generierte Hintergründe
 * 
 */
                
VISU.init.canvas = function() {
    
    VISU.canvas = {
        mainLayerBg: {
            shape: 'mainLayerBg',
            x: 7,       //from left
            y: 1,       //from top
            width: 780,
            height: 590,
            radius: 8,
            shadow: true,
            strokeStyle: 'rgba(82,102,107,1)',
            //fillStyle: 'rgba(0, 0 , 0, 0.8)',
            fillStyle: 'rgba(4, 23, 35, 0.9)',
            lineWidth: 2,
        },
        subLayerBg: {
            shape: 'subLayerBg',
            x: 7,       //from left
            y: 1,       //from top
            width: 780,
            height: 590,
            radius: 8,
            strokeStyle: 'rgba(82,102,107,1)',
            fillStyle: 'rgba(4, 23, 35, 0.9)',
            //fillStyle: 'rgba(0, 0, 0, 0.8)',
            lineWidth: 2,
        },
        widgBg: {
            shape: 'widgBg',
            shadow: true,
            x: 0.5,
            y: 0.5,
            radius: 8,
            strokeStyle: 'rgba(255,255,255,0.5)',
            shadow: true,
            //fillStyle: 'rgba(32, 64, 78, 0.7)',
            //fillStyle: 'rgba(32, 71, 88, 0.1)',
            //fillStyle: 'rgba(0, 0, 0, 0.4)',
            fillStyle: 'rgba(4, 23, 35, 0.8)',
            lineWidth: 1,
        },
        widgDragBar: {
            shape: 'widgDragBar',
            shadow: true,
            x: 0.5,
            y: 0.5,
            radius: 8,
            shadow: true,
            fillStyle: 'rgba(96,122,137,0.9)',
            //strokeStyle: 'rgba(0,0,0,0.2)',
            strokeStyle: 'rgba(96,122,137,0.9)',
            lineWidth: 1,
        },
        rolloPosBg: {
            shape: 'groupBg',
            x: 55.5,
            y: 112.5,
            width: 215,
            height: 371,
            radius: 8,
            strokeStyle: 'rgba(255,255,255,0.3)',
            fillStyle: 'rgba(53, 69, 83, 0.6)',
            lineWidth: 1,
            label: 'P o s i t i o n e n',
            labelOrient: 'vert'
        },
        rolloFunktBg: {
            shape: 'groupBg',
            x: 277.5,
            y: 112.5,
            width: 338,
            height: 234,
            radius: 8,
            strokeStyle: 'rgba(255,255,255,0.3)',
            fillStyle: 'rgba(53, 69, 83, 0.6)',
            lineWidth: 1,
            label: 'F u n k t i o n e n'
        },
        rolloAnwBg: {
            shape: 'groupBg',
            x: 277.5,
            y: 353.5,
            width: 338,
            height: 130,
            radius: 8,
            strokeStyle: 'rgba(255,255,255,0.3)',
            fillStyle: 'rgba(53, 69, 83, 0.6)',
            lineWidth: 1,
            label: 'A n w a h l e n'
        },
        raumHeizBg: {
            shape: 'groupBg',
            x: 25.5,
            y: 69.5,
            width: 413,
            height: 362,
            radius: 8,
            strokeStyle: 'rgba(255,255,255,0.3)',
            //fillStyle: 'rgba(32, 71, 88, 0.6)',
            fillStyle: 'rgba(53, 69, 83, 0.6)',
            lineWidth: 1,
            label: 'T e m p e r a t u r'
        },
        raumLichtBg: {
            shape: 'groupBg',
            x: 445.5,
            y: 69.5,
            width: 261,
            height: 502,
            radius: 8,
            strokeStyle: 'rgba(255,255,255,0.3)',
            //fillStyle: 'rgba(32, 71, 88, 0.6)',
            fillStyle: 'rgba(53, 69, 83, 0.6)',
            lineWidth: 1,

            label: 'L i c h t'
        },
        raumSonderBg: {
            shape: 'groupBg',
            x: 25.5,
            y: 438.5,
            width: 413,
            height: 133,
            radius: 8,
            strokeStyle: 'rgba(255,255,255,0.3)',
            fillStyle: 'rgba(53, 69, 83, 0.6)',
            lineWidth: 1,
            label: 'S o n d e r f u n k t i o n e n'
        },
        presetboxBg: {
            shape: 'subLayerBg',
            x: 7,       //from left
            y: 1,       //from top
            width: 495,
            height: 590,
            radius: 8,
            strokeStyle: 'rgba(82,102,110,0.9)',
            fillStyle: 'rgba(4, 23, 35, 0.9)',
            lineWidth: 2
        },
        schaltpunkteBg: {
            shape: 'groupBg',
            x: 38.5,
            y: 20.5,
            width: 390,
            height: 185,
            radius: 8,
            strokeStyle: 'rgba(255,255,255,0.3)',
            //fillStyle: 'rgba(32, 71, 88, 0.6)',
            fillStyle: 'rgba(53, 69, 83, 0.6)',
            lineWidth: 1,
            label: 'S c h a l t p u n k t e'
        },
        heizHandBg: {
            shape: 'groupBg',
            x: 30.5,
            y: 390.5,
            width: 390,
            height: 185,
            radius: 8,
            strokeStyle: 'rgba(255,255,255,0.3)',
            fillStyle: 'rgba(32, 71, 88, 0.6)',
            lineWidth: 1,
            label: 'H a n d b e t r i e b'
        },
        einstXmasBg: {
            shape: 'groupBg',
            x: 35.5,
            y: 35.5,
            width: 600,
            height: 133,
            radius: 8,
            strokeStyle: 'rgba(255,255,255,0.3)',
            //fillStyle: 'rgba(32, 71, 88, 0.6)',
            fillStyle: 'rgba(53, 69, 83, 0.6)',
            lineWidth: 1,
            label: 'W e i h n a c h t s s c h a l t u n g'
        },
        einstNachtBg: {
            shape: 'groupBg',
            x: 35.5,
            y: 180.5,
            width: 600,
            height: 133,
            radius: 8,
            strokeStyle: 'rgba(255,255,255,0.3)',
            //fillStyle: 'rgba(32, 71, 88, 0.6)',
            fillStyle: 'rgba(53, 69, 83, 0.6)',
            lineWidth: 1,
            label: 'N a c h t b e t r i e b'
        }

    };

};







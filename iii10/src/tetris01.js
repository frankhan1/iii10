var Tetris01Layer;
Tetris01Layer = cc.Layer.extend({
    sprite: [], // color sprite[1~20][1~29]
    size: null,
    dx: 20, // remove range
    dy: 2,  // dropping  range
    delLine: [], //  keep which line is full
    line: [],   //   delLine.pop() ~ remove a line from delLine[]
    counter: 0, //    calculate score
    tetris: [0, 1, 2, 3, 4, 5, 6], // main sprite[0 ~ 6] replace T,I,O,L,J,N,Z..
    t: 0, // [0 ~ 6] random index of tetris[]
    td: 0, // change direction to 0v, 1> ,2^ ,3<
    // Ry: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], // max. value of y
    // ty: [[0, 0, -20, -20, 0, 0, 20, 20, 20, 20], [-30, -10, -10, 10, 10, 30, 30, 10, -10, -30], [0, 0, 20, 20, 0, 0, -20, -20, -20, -20], [30, 10, 10, -10, -10, -30, -30, -10, 10, 30]],
    // // ty[direction 0~v,1~>,2~^,3~<][points 0,1,2,3,4,5,6,7,8,9]
    // oy: [[-20, -20, -20, 0, 20, 20, 20, 0, 0, 0], [-20, 0, 20, 20, 20, 0, -20, -20, 0, 0], [20, 20, 20, 0, -20, -20, -20, 0, 0, 0], [20, 0, -20, -20, -20, 0, 20, 20, 0, 0]],
    // iy: [[-10, -10, -10, -10, -10, 10, 10, 10, 10, 10], [-40, -20, 0, 20, 40, 40, 20, 0, -20, -40], [10, 10, 10, 10, 10, -10, -10, -10, -10, -10], [40, 20, 0, -20, -40, -40, -20, 0, 20, 40]],
    // ly: [[-30, -30, -30, -10, -10, 10, 30, 30, 10, -10], [-20, 0, 20, 20, 0, 0, 0, -20, -20, -20], [30, 30, 30, 10, 10, -10, -30, -30, -10, 10], [20, 0, -20, -20, 0, 0, 0, 20, 20, 20]],
    // jy: [[-30, -30, -30, -10, 10, 30, 30, 10, -10, -10], [-20, 0, 20, 20, 20, 20, 0, 0, 0, -20], [30, 30, 30, 10, -10, -30, -30, -10, 10, 10], [20, 0, -20, -20, -20, -20, 0, 0, 0, 20]],
    // ny: [[-30, -30, -10, 10, 10, 30, 30, 10, -10, -10], [0, 20, 20, 20, 0, 0, -20, -20, -20, 0], [30, 30, 10, -10, -10, -30, -30, -10, 10, 10], [0, -20, -20, -20, 0, 0, 20, 20, 20, 0]],
    // zy: [[-20, -20, -20, 0, 0, 20, 20, 20, 0, 0], [-10, 10, 30, 30, 10, 10, -10, -30, -30, -10], [20, 20, 20, 0, 0, -20, -20, -20, 0, 0], [10, -10, -30, -30, -10, -10, 10, 30, 30, 10]],
    // Ty: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    // current direction & points value
    tArray: [], //  non-duplicate random numbers for sprite use
    nArray: [
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]],
    // 22*32   check which position is occupied
    newSpit: false,  //   create new color sprite
    tt: 0, // x-axis
    mm: 0,  // y-axis
    clearYes: false,
    heiNo: false,
    reStart: false,
    EffectPlay: true,

    ctor: function () {
        this._super();
        this.size = cc.winSize;
        //  non-sequential numbers for sprite use
        for (var i = 0; i < 200; i++) {
            this.tArray[i] = i
        }
        this.shuffle(this);

        var title = new cc.LabelTTF("俄羅斯方塊", "Arial", 38);
        title.x = this.size.width / 8;
        title.y = this.size.height * 8 / 9;
        title.setColor(cc.color(255, 0, 0));
        title.ignoreAnchorPointForPosition(false);
        this.addChild(title, 1);

        var title5 = new cc.LabelTTF("韓鵬程 製作", "Arial", 20);
        title5.x = 800;
        title5.y = this.size.height * 1 / 9;
        title5.setColor(cc.color(0, 0, 255));
        title5.ignoreAnchorPointForPosition(false);
        this.addChild(title5, 1);

        var title1 = new cc.LabelTTF("空白鍵 --> 暫停 ", "Arial", 20);
        title1.x = 100;
        title1.y = this.size.height * 6 / 9;
        title1.setColor(cc.color(0, 0, 255));
        title1.ignoreAnchorPointForPosition(false);
        this.addChild(title1, 1);

        var title2 = new cc.LabelTTF("enter鍵 --> 繼續 ", "Arial", 20);
        title2.x = 100;
        title2.y = this.size.height * 5 / 9;
        title2.setColor(cc.color(0, 0, 255));
        title2.ignoreAnchorPointForPosition(false);
        this.addChild(title2, 1);

        var title3 = new cc.LabelTTF("▲翻轉  ▼快墜", "Arial", 20);
        title3.x = 800;
        title3.y = this.size.height * 4 / 9;
        title3.setColor(cc.color(255,0,255));
        title3.ignoreAnchorPointForPosition(false);
        this.addChild(title3, 1);

        var title3a = new cc.LabelTTF("◄左移  ►右移", "Arial", 20);
        title3a.x = 800;
        title3a.y = this.size.height * 3 / 9;
        title3a.setColor(cc.color(255, 0, 255));
        title3a.ignoreAnchorPointForPosition(false);
        this.addChild(title3a, 1);

        var title4 = new cc.LabelTTF("esc  鍵 --> 重新", "Arial", 20);
        title4.x = 100;
        title4.y = this.size.height * 4 / 9;
        title4.setColor(cc.color(0, 0, 255));
        title4.ignoreAnchorPointForPosition(false);
        this.addChild(title4, 1);

        var title4a = new cc.LabelTTF("backspace --> 結束", "Arial", 20);
        title4a.x = 100;
        title4a.y = this.size.height * 3 / 9;
        title4a.setColor(cc.color(0, 0, 255));
        title4a.ignoreAnchorPointForPosition(false);
        this.addChild(title4a, 1);

        var t2 = new cc.LabelTTF("得分 : ", "", 20);
        t2.x = 750;
        t2.y = this.size.height * 8 / 10;
        t2.setColor(cc.color(255, 0, 0));
        t2.ignoreAnchorPointForPosition(false);
        this.addChild(t2, 1);

        this.t3 = new cc.LabelTTF(" ", "", 20);
        this.t3.attr({
            x: 850,
            y: this.size.height * 8 / 10
        });
        this.t3.setColor(cc.color(255, 0, 0));
        this.t3.ignoreAnchorPointForPosition(false);
        this.addChild(this.t3, 1);

        this.t3c = new cc.LayerColor(
            cc.color(255, 255, 255, 100),
            100, 38);
        this.t3c.x = 850;
        this.t3c.y = this.size.height * 8 / 10;
        this.t3c.ignoreAnchorPointForPosition(false);
        this.addChild(this.t3c, 1);

        var t4 = new cc.LabelTTF("時間 : ", "", 20);
        t4.x = 750;
        t4.y = this.size.height * 7 / 10;
        t4.setColor(cc.color(255, 0, 0));
        t4.ignoreAnchorPointForPosition(false);
        this.addChild(t4, 1);

        this.t5 = new cc.LabelTTF(" ", "", 20);
        this.t5.attr({
            x: 850,
            y: this.size.height * 7 / 10
        });
        this.t5.setColor(cc.color(255, 0, 0));
        this.t5.ignoreAnchorPointForPosition(false);
        this.addChild(this.t5, 1);

        this.t5c = new cc.LayerColor(
            cc.color(255, 255, 255, 100),
            100, 38);
        this.t5c.x = 850;
        this.t5c.y = this.size.height * 7 / 10;
        this.t5c.ignoreAnchorPointForPosition(false);
        this.addChild(this.t5c, 1);

        this.russia = new cc.Sprite(res.Russia_png);
        this.russia.attr({
            x: this.size.width * 4.2 / 9,
            y: this.size.height * 98 / 100
        });
        this.addChild(this.russia, 3);

        this.tetris = new cc.Sprite(res.Bg_png);
        this.tetris.attr({
            x: this.size.width / 2,
            y: this.size.height / 2
        });
        this.addChild(this.tetris, 0);

        this.onEnterTransitionDidFinish();
        this.tetrisCreate(this);
        this.myKeyListener(this);
        this.scheduleUpdate(this);

        return true;
    },

    onEnterTransitionDidFinish: function () {
        this._super();
        // cc.log("Background Music");
        cc.audioEngine.playMusic("res/bgMusic.mp3", true);
    },

    myKeyListener: function (layer) {
        cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (keyCode, event) {
                    layer.tt = parseInt((layer.tetris[layer.t].x - 250) / 20) + 1;  //  current X position
                    layer.mm = parseInt((layer.tetris[layer.t].y - 10) / 20) + 1;// current Y position
                    cc.log("keyCode= " + keyCode);
                    switch (keyCode) {
                        case  8 :  //  press backspace key STOP
        //                   window.location.replace("http://localhost:63342/tempRoadtrip/generic.html#three");
      //                    location.replace("http://localhost:63342/tempRoadtrip/generic.html#three");
                            location.href="http://localhost:63342/tempRoadtrip/generic.html#three";

                            break;
                        case  13 :  //   press space key ---->  CONTINUE
                            layer.scheduleUpdate(layer);
                            cc.audioEngine.resumeMusic();
                            cc.audioEngine.resumeAllEffects();
                            break;
                        case 27 :  //  press esc key --->  RESTART
                            for (i = 1; i < 21; i++) {
                                for (j = 1; j < 31; j++) {
                                    if (layer.nArray[i][j] != -1) {
                                        layer.nArray[i][j] = -1
                                    }
                                }
                            }
                            cc.audioEngine.stopMusic();
                            cc.audioEngine.stopAllEffects();
                            cc.director.pushScene(new Tetris01Scene()); //場景切換+變數傳遞
                            break;
                        case  32 :  //   press enter key ---->PAUSE
                            // for (i = 1; i < 21; i++) {
                            //     for (j = 1; j < 31; j++) {
                            //         if (layer.nArray[i][j] != -1) {
                            //             cc.log(i + ' ' + j + ' ' + layer.nArray[i][j] + ' ')
                            //         }
                            //     }
                            // }
                            cc.audioEngine.pauseMusic();
                            cc.audioEngine.pauseAllEffects();
                            layer.unscheduleUpdate(layer);

                            break;
                        case  37 :   //   press <- key  ----> MOVE TO  LEFT
                            if ((layer.td % 2) == 0) {      // no changed the direction
                                wid = layer.tetris[layer.t].width;
                                hei = layer.tetris[layer.t].height
                            } else {                        // be changed the direction
                                wid = layer.tetris[layer.t].height;
                                hei = layer.tetris[layer.t].width
                            }
                            switch (layer.t % 7) {
                                case 0:   //  T
                                    switch (layer.td) {
                                        case 0 : //  T T
                                            if ((layer.nArray[layer.tt - 2][layer.mm] == -1) && (layer.nArray[layer.tt - 1][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 1:
                                            if ((layer.nArray[layer.tt - 2][layer.mm - 1] == -1) && (layer.nArray[layer.tt - 2][layer.mm] == -1) && (layer.nArray[layer.tt - 2][layer.mm + 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 2:
                                            if ((layer.nArray[layer.tt - 1][layer.mm] == -1) && (layer.nArray[layer.tt - 2][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 3:
                                            if ((layer.nArray[layer.tt - 1][layer.mm + 1] == -1) && (layer.nArray[layer.tt - 2][layer.mm] == -1) && (layer.nArray[layer.tt - 1][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                    }
                                    break;
                                case 1: // I
                                    switch (layer.td) {
                                        case 0 : //  I ▁
                                        case 2:
                                            if (layer.nArray[layer.tt - 3][layer.mm] == -1) {
                                                layer.clearYes = true;
                                                //             cc.log("tt " + layer.tt + " mm " + layer.mm);
                                            }
                                            break;
                                        case 1:
                                        case 3:
                                            if (layer.nArray[layer.tt - 1][layer.mm] == -1 && layer.nArray[layer.tt - 1][layer.mm - 1] == -1 && layer.nArray[layer.tt - 1][layer.mm + 1] == -1 && layer.nArray[layer.tt - 1][layer.mm - 2] == -1) {
                                                layer.clearYes = true
                                            }
                                            break;
                                    }
                                    break;
                                case 2: // O
                                    switch (layer.td) {
                                        case 0 : //  O O
                                        case 1:
                                        case 2:
                                        case 3:
                                            if ((layer.nArray[layer.tt - 2][layer.mm] == -1) && (layer.nArray[layer.tt - 2][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                    }
                                    break;
                                case 3: // L
                                    switch (layer.td) {
                                        case 0 : //  L L
                                            if ((layer.nArray[layer.tt - 2][layer.mm + 1] == -1) && (layer.nArray[layer.tt - 2][layer.mm] == -1) && (layer.nArray[layer.tt - 2][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 1:
                                            if ((layer.nArray[layer.tt][layer.mm] == -1) && (layer.nArray[layer.tt - 2][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 2:
                                            if ((layer.nArray[layer.tt - 2][layer.mm + 1] == -1) && (layer.nArray[layer.tt - 1][layer.mm] == -1) && (layer.nArray[layer.tt - 1][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 3:
                                            if ((layer.nArray[layer.tt - 2][layer.mm] == -1) && (layer.nArray[layer.tt - 2][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                    }
                                    break;
                                case 4: // J
                                    switch (layer.td) {
                                        case 0 : //  J J
                                            if ((layer.nArray[layer.tt - 1][layer.mm + 1] == -1) && (layer.nArray[layer.tt - 1][layer.mm] == -1) && (layer.nArray[layer.tt - 2][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 1:
                                            if ((layer.nArray[layer.tt - 2][layer.mm] == -1) && (layer.nArray[layer.tt][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 2:
                                            if ((layer.nArray[layer.tt - 2][layer.mm + 1] == -1) && (layer.nArray[layer.tt - 2][layer.mm] == -1) && (layer.nArray[layer.tt - 2][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 3:
                                            if ((layer.nArray[layer.tt - 2][layer.mm] == -1) && (layer.nArray[layer.tt - 2][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                    }
                                    break;
                                case 5: // N
                                    switch (layer.td) {
                                        case 0 : //  N N
                                        case 2:
                                            if ((layer.nArray[layer.tt - 2][layer.mm + 1] == -1) && (layer.nArray[layer.tt - 2][layer.mm] == -1) && (layer.nArray[layer.tt - 1][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 1:
                                        case 3:
                                            if ((layer.nArray[layer.tt - 1][layer.mm] == -1) && (layer.nArray[layer.tt - 2][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                    }
                                    break;
                                case 6: // Z
                                    switch (layer.td) {
                                        case 0 : //  Z Z
                                        case 2:
                                            if ((layer.nArray[layer.tt - 2][layer.mm] == -1) && (layer.nArray[layer.tt - 1][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 1:
                                        case 3:
                                            if ((layer.nArray[layer.tt - 1][layer.mm + 1] == -1) && (layer.nArray[layer.tt - 2][layer.mm] == -1) && (layer.nArray[layer.tt - 2][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                    }
                                    break;
                            }

                            ////
                            if ((layer.clearYes == true) && ((layer.tetris[layer.t].y - hei / 2) >= 10)       //  Y range : 10 ~ 650
                                && ((layer.tetris[layer.t].x - wid / 2 ) >= 260)) {   //  X range : 250 ~ 650
                                layer.tetris[layer.t].x -= layer.dx;
                                layer.tt = parseInt((layer.tetris[layer.t].x - 250) / 20) + 1;  //  current X position
                                layer.mm = parseInt((layer.tetris[layer.t].y - 10) / 20) + 1;   // current Y position
                                //          cc.log("mm,tt " + layer.mm + " " + layer.tt);
                                layer.clearYes = false;
                            }

                            break;
                        case  38 ://  press ^ key  ----> counterclockwise TURN 90 degree
                            if ((layer.td % 2) == 0) {          // no changed the direction
                                wid = layer.tetris[layer.t].width;
                                hei = layer.tetris[layer.t].height
                            } else {
                                wid = layer.tetris[layer.t].height;
                                hei = layer.tetris[layer.t].width
                            }
                            if ((layer.tetris[layer.t].y - wid / 2 >= 10 ) && ((layer.tetris[layer.t].x - hei / 2 >= 260)
                                && (layer.tetris[layer.t].x + hei / 2 <= 640) )
                            ) {
                                if (layer.td < 3) {    //  td range : 0 ~ 3
                                    layer.td += 1;
                                }
                                else {
                                    layer.td = 0
                                }

                                layer.tetris[layer.t].runAction(cc.rotateBy(0, -90));
                                if ((layer.td % 2) == 1) {    //   first turn
                                    if ((layer.t % 7) == 1) {   //  I
                                        layer.tetris[layer.t].x += 10;
                                    } else if ((layer.t % 7) !== 2) {  // != O
                                        layer.tetris[layer.t].x -= 10;
                                    }
                                } else {
                                    if ((layer.t % 7) == 1) {  //  I
                                        layer.tetris[layer.t].x -= 10;
                                    } else if ((layer.t % 7) !== 2) {  //  != O
                                        layer.tetris[layer.t].x += 10;
                                    }
                                }
                                layer.tt = parseInt((layer.tetris[layer.t].x - 250) / 20) + 1;  //  current X position
                                //     cc.log("mm,tt " + layer.mm + " " + layer.tt);


                            }
                            break;
                        case  39 :  // press -> key ----> MOVE TO RIGHT
                            if ((layer.td % 2) == 0) {              // no changed the direction
                                wid = layer.tetris[layer.t].width;
                                hei = layer.tetris[layer.t].height
                            } else {
                                wid = layer.tetris[layer.t].height;
                                hei = layer.tetris[layer.t].width
                            }

                            switch (layer.t % 7) {
                                case 0:   //  T
                                    switch (layer.td) {
                                        case 0 : //  T T
                                            if ((layer.nArray[layer.tt + 2][layer.mm] == -1) && (layer.nArray[layer.tt + 1][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 1:
                                            if ((layer.nArray[layer.tt][layer.mm + 1] == -1) && (layer.nArray[layer.tt + 1][layer.mm] == -1) && (layer.nArray[layer.tt][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 2:
                                            if ((layer.nArray[layer.tt + 1][layer.mm] == -1) && (layer.nArray[layer.tt + 2][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 3:
                                            if ((layer.nArray[layer.tt + 1][layer.mm + 1] == -1) && (layer.nArray[layer.tt + 1][layer.mm] == -1) && (layer.nArray[layer.tt + 1][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                    }
                                    break;
                                case 1: // I
                                    switch (layer.td) {
                                        case 0 : //  I ▁
                                        case 2:
                                            if (layer.nArray[layer.tt + 2][layer.mm] == -1) {
                                                //       cc.log("tt " + layer.tt + " mm " + layer.mm + " " + layer.nArray[layer.tt + 2][layer.mm] + " " + layer.tetris[layer.t].y);

                                                layer.clearYes = true;
                                            }
                                            break;
                                        case 1:
                                        case 3:
                                            if (layer.nArray[layer.tt + 1][layer.mm + 1] == -1 && layer.nArray[layer.tt + 1][layer.mm] == -1 && layer.nArray[layer.tt + 1][layer.mm - 1] == -1 && layer.nArray[layer.tt + 1][layer.mm - 2] == -1) {
                                                layer.clearYes = true
                                            }
                                            break;
                                    }
                                    break;
                                case 2: // O
                                    if ((layer.nArray[layer.tt + 1][layer.mm] == -1) && (layer.nArray[layer.tt + 1][layer.mm - 1]) == -1) {
                                        layer.clearYes = true
                                    }
                                    break;
                                case 3: // L
                                    switch (layer.td) {
                                        case 0 : //  L L
                                            if ((layer.nArray[layer.tt][layer.mm + 1] == -1) && (layer.nArray[layer.tt][layer.mm] == -1) && (layer.nArray[layer.tt + 1][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 1:
                                            if ((layer.nArray[layer.tt + 2][layer.mm] == -1) && (layer.nArray[layer.tt + 2][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 2:
                                            if ((layer.nArray[layer.tt + 1][layer.mm + 1] == -1) && (layer.nArray[layer.tt + 1][layer.mm] == -1) && (layer.nArray[layer.tt + 1][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 3:
                                            if ((layer.nArray[layer.tt + 2][layer.mm] == -1) && (layer.nArray[layer.tt][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                    }
                                    break;

                                case 4: // J
                                    switch (layer.td) {
                                        case 0 : //  J J
                                            if ((layer.nArray[layer.tt + 1][layer.mm + 1] == -1) && (layer.nArray[layer.tt + 1][layer.mm] == -1) && (layer.nArray[layer.tt + 1][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 1:
                                            if ((layer.nArray[layer.tt + 2][layer.mm] == -1) && (layer.nArray[layer.tt + 2][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 2:
                                            if ((layer.nArray[layer.tt + 1][layer.mm + 1] == -1) && (layer.nArray[layer.tt][layer.mm] == -1) && (layer.nArray[layer.tt][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 3:
                                            if ((layer.nArray[layer.tt][layer.mm] == -1) && (layer.nArray[layer.tt + 2][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                    }
                                    break;
                                case 5: // N
                                    switch (layer.td) {
                                        case 0 : //  N N
                                        case 2:
                                            if ((layer.nArray[layer.tt][layer.mm + 1] == -1) && (layer.nArray[layer.tt + 1][layer.mm] == -1) && (layer.nArray[layer.tt + 1][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 1:
                                        case 3:
                                            if ((layer.nArray[layer.tt + 2][layer.mm] == -1) && (layer.nArray[layer.tt + 1][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                    }
                                    break;
                                case 6: // Z
                                    switch (layer.td) {
                                        case 0 : //  Z Z
                                        case 2:
                                            if ((layer.nArray[layer.tt + 1][layer.mm] == -1) && (layer.nArray[layer.tt + 2][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                        case 1:
                                        case 3:
                                            if ((layer.nArray[layer.tt + 1][layer.mm + 1] == -1) && (layer.nArray[layer.tt + 1][layer.mm] == -1) && (layer.nArray[layer.tt][layer.mm - 1] == -1)) {
                                                layer.clearYes = true
                                            }
                                            break;
                                    }
                                    break;
                            }
                            //     cc.log("mm,tt " + layer.mm + " " + layer.tt);

                            ///
                            if ((layer.clearYes == true) && ((layer.tetris[layer.t].y - hei / 2 ) >= 10)
                                && ((layer.tetris[layer.t].x + wid / 2 ) <= 640)) {
                                layer.tetris[layer.t].x += layer.dx;
                                layer.tt = parseInt((layer.tetris[layer.t].x - 250) / 20) + 1;  //  current X position
                                layer.mm = parseInt((layer.tetris[layer.t].y - 10) / 20) + 1;   // current Y position
                                layer.clearYes = false;
                            }
                            break;
                        case  40 :   // press v key  ----> faster dropping down
                            if ((layer.td % 2) == 0) {              // no changed the direction
                                wid = layer.tetris[layer.t].width;
                                hei = layer.tetris[layer.t].height
                            } else {
                                wid = layer.tetris[layer.t].height;
                                hei = layer.tetris[layer.t].width
                            }
                            layer.mm = parseInt((layer.tetris[layer.t].y - 10) / 20) + 1;  //   !  .y - 10)
                            layer.tt = parseInt((layer.tetris[layer.t].x - 250) / 20) + 1;
                            //  current X position
                            //  cc.log("x= " + layer.tetris[layer.t].x);
                            switch (layer.t % 7) {
                                case 0 :   //  T
                                    switch (layer.td) {
                                        case 0 : //  T T
                                            if ((layer.nArray[layer.tt - 1][layer.mm - 1] == -1 ) && (layer.nArray[layer.tt][layer.mm - 2] == -1 )
                                                && (layer.nArray[layer.tt + 1][layer.mm - 1] == -1 ) &&
                                                (layer.nArray[layer.tt - 1][layer.mm - 2] == -1 ) && (layer.nArray[layer.tt][layer.mm - 3] == -1 )
                                                && (layer.nArray[layer.tt + 1][layer.mm - 2] == -1 ) && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                        case 1 :    // T  |--

                                            if ((layer.nArray[layer.tt - 1][layer.mm - 2] == -1 ) && (layer.nArray[layer.tt][layer.mm - 1] == -1 )
                                                && (layer.nArray[layer.tt - 1][layer.mm - 3] == -1 ) && (layer.nArray[layer.tt][layer.mm - 2] == -1 )
                                                && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                        case 2 :    //  T _|_

                                            if ((layer.nArray[layer.tt - 1][layer.mm - 2] == -1 ) && (layer.nArray[layer.tt][layer.mm - 2] == -1 )
                                                && (layer.nArray[layer.tt + 1][layer.mm - 2] == -1 ) &&
                                                (layer.nArray[layer.tt - 1][layer.mm - 3] == -1 ) && (layer.nArray[layer.tt][layer.mm - 3] == -1 )
                                                && (layer.nArray[layer.tt + 1][layer.mm - 3] == -1 ) && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                        case 3 :    //  T --|

                                            if ((layer.nArray[layer.tt - 1][layer.mm - 1] == -1 ) && (layer.nArray[layer.tt][layer.mm - 2] == -1 )
                                                && (layer.nArray[layer.tt - 1][layer.mm - 2] == -1 ) && (layer.nArray[layer.tt][layer.mm - 3] == -1)
                                                && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                    }
                                    break;
                                case 1 :   //  I
                                    switch (layer.td) {
                                        //  .....
                                        case 0 : //  I ▁
                                        case 2:
                                            if ((layer.nArray[layer.tt - 2][layer.mm - 1] == -1) && (layer.nArray[layer.tt - 1][layer.mm - 1] == -1 )
                                                && (layer.nArray[layer.tt][layer.mm - 1] == -1 ) && (layer.nArray[layer.tt + 1][layer.mm - 1] == -1 )
                                                && (layer.nArray[layer.tt - 2][layer.mm - 2] == -1) && (layer.nArray[layer.tt - 1][layer.mm - 2] == -1)
                                                && (layer.nArray[layer.tt][layer.mm - 2] == -1 ) && (layer.nArray[layer.tt + 1][layer.mm - 2] == -1)
                                                && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                        case 1 :    // I |
                                        case 3 :
                                            if ((layer.nArray[layer.tt][layer.mm - 3] == -1) && (layer.nArray[layer.tt][layer.mm - 4] == -1)
                                                && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                    }
                                    break;
                                case 2 :   //  O
                                    if ((layer.nArray[layer.tt - 1][layer.mm - 2] == -1) && (layer.nArray[layer.tt][layer.mm - 2] == -1)
                                        && (layer.nArray[layer.tt - 1][layer.mm - 3] == -1) && (layer.nArray[layer.tt][layer.mm - 3] == -1)
                                        && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                        layer.tetris[layer.t].y -= 40
                                    }
                                    break;
                                case 3 :   //  L
                                    switch (layer.td) {
                                        case 0 : //  L L
                                            if ((layer.nArray[layer.tt - 1][layer.mm - 2] == -1) && (layer.nArray[layer.tt][layer.mm - 2] == -1) &&
                                                (layer.nArray[layer.tt - 1][layer.mm - 3] == -1) && (layer.nArray[layer.tt][layer.mm - 3] == -1)
                                                && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                        case 1 :    // L  __|
                                            if ((layer.nArray[layer.tt - 1][layer.mm - 2] == -1) && (layer.nArray[layer.tt][layer.mm - 2] == -1)
                                                && (layer.nArray[layer.tt + 1][layer.mm - 2] == -1) &&
                                                (layer.nArray[layer.tt - 1][layer.mm - 3] == -1) && (layer.nArray[layer.tt][layer.mm - 3] == -1)
                                                && (layer.nArray[layer.tt + 1][layer.mm - 3] == -1) && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                        case 2 :    //  L  7
                                            if ((layer.nArray[layer.tt - 1][layer.mm] == -1) && (layer.nArray[layer.tt][layer.mm - 2] == -1) &&
                                                (layer.nArray[layer.tt - 1][layer.mm - 1] == -1) && (layer.nArray[layer.tt][layer.mm - 3] == -1)
                                                && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                        case 3 :    //  L  ┌--
                                            if ((layer.nArray[layer.tt - 1][layer.mm - 2] == -1) && (layer.nArray[layer.tt][layer.mm - 1] == -1) &&
                                                (layer.nArray[layer.tt + 1][layer.mm - 1] == -1) &&
                                                (layer.nArray[layer.tt - 1][layer.mm - 3] == -1) && (layer.nArray[layer.tt][layer.mm - 2] == -1) &&
                                                (layer.nArray[layer.tt + 1][layer.mm - 2] == -1) && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                    }
                                    break;
                                case 4 :   //  J
                                    switch (layer.td) {
                                        case 0 : //  J J
                                            if ((layer.nArray[layer.tt - 1][layer.mm - 2] == -1) && (layer.nArray[layer.tt][layer.mm - 2] == -1) &&
                                                (layer.nArray[layer.tt - 1][layer.mm - 3] == -1) && (layer.nArray[layer.tt][layer.mm - 3] == -1)
                                                && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                        case 1 :    // J --i
                                            if ((layer.nArray[layer.tt - 1][layer.mm - 1] == -1) && (layer.nArray[layer.tt][layer.mm - 1] == -1) &&
                                                (layer.nArray[layer.tt + 1][layer.mm - 2] == -1) &&
                                                (layer.nArray[layer.tt - 1][layer.mm - 2] == -1) && (layer.nArray[layer.tt][layer.mm - 2] == -1) &&
                                                (layer.nArray[layer.tt + 1][layer.mm - 3] == -1) && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                        case 2 :    //  J |-
                                            if ((layer.nArray[layer.tt - 1][layer.mm - 2] == -1) && (layer.nArray[layer.tt][layer.mm] == -1) &&
                                                (layer.nArray[layer.tt - 1][layer.mm - 3] == -1) && (layer.nArray[layer.tt][layer.mm - 1] == -1)
                                                && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                        case 3 :    //  J └—
                                            if ((layer.nArray[layer.tt - 1][layer.mm - 2] == -1) && (layer.nArray[layer.tt][layer.mm - 2] == -1) &&
                                                (layer.nArray[layer.tt + 1][layer.mm - 2] == -1) &&
                                                (layer.nArray[layer.tt - 1][layer.mm - 3] == -1) && (layer.nArray[layer.tt][layer.mm - 3] == -1) &&
                                                (layer.nArray[layer.tt + 1][layer.mm - 3] == -1) && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                    }
                                    break;
                                case 5 :   //  N
                                    switch (layer.td) {
                                        case 0 : //  N N
                                        case 2 :
                                            if ((layer.nArray[layer.tt - 1][layer.mm - 1] == -1) && (layer.nArray[layer.tt][layer.mm - 2] == -1) &&
                                                (layer.nArray[layer.tt - 1][layer.mm - 2] == -1) && (layer.nArray[layer.tt][layer.mm - 3] == -1)
                                                && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                        case 1 :    // N _|▔
                                        case 3 :
                                            if ((layer.nArray[layer.tt - 1][layer.mm - 2] == -1) && (layer.nArray[layer.tt][layer.mm - 2] == -1) &&
                                                (layer.nArray[layer.tt + 1][layer.mm - 1] == -1) &&
                                                (layer.nArray[layer.tt - 1][layer.mm - 3] == -1) && (layer.nArray[layer.tt][layer.mm - 3] == -1) &&
                                                (layer.nArray[layer.tt + 1][layer.mm - 2] == -1) && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;

                                    }
                                    break;
                                case 6 :   //  Z
                                    switch (layer.td) {
                                        case 0 : //  Z Z
                                        case 2 :
                                            if ((layer.nArray[layer.tt - 1][layer.mm - 1] == -1) && (layer.nArray[layer.tt][layer.mm - 2] == -1)
                                                && (layer.nArray[layer.tt + 1][layer.mm - 2] == -1) &&
                                                (layer.nArray[layer.tt - 1][layer.mm - 2] == -1) && (layer.nArray[layer.tt][layer.mm - 3] == -1)
                                                && (layer.nArray[layer.tt + 1][layer.mm - 3] == -1) && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;
                                        case 1 :    // Z ┌┘
                                        case 3 :
                                            if ((layer.nArray[layer.tt - 1][layer.mm - 2] == -1) && (layer.nArray[layer.tt][layer.mm - 1] == -1) &&
                                                (layer.nArray[layer.tt - 1][layer.mm - 3] == -1) && (layer.nArray[layer.tt][layer.mm - 2] == -1)
                                                && ((layer.tetris[layer.t].y - hei / 2 ) >= 50)) {
                                                layer.tetris[layer.t].y -= 40
                                            }
                                            break;

                                    }
                                    break;
                            }
                            break;
                        default :
//                      cc.log(" Ty[] " + layer.Ty);
                            break;
                    }
                }
            },
            this
        )
        ;
    },

    update: function (dt) {


        this.mm = parseInt((this.tetris[this.t].y - 10) / 20) + 1;  //   !  .y - 10)
        this.tt = parseInt((this.tetris[this.t].x - 250) / 20) + 1;  //  current X position
        //  cc.log("x= " + this.tetris[this.t].x);
        switch (this.t % 7) {
            case 0 :   //  T
                switch (this.td) {
                    case 0 : //  T T
                        if ((this.nArray[this.tt - 1][this.mm - 1] == -1 ) && (this.nArray[this.tt][this.mm - 2] == -1 ) && (this.nArray[this.tt + 1][this.mm - 1] == -1 )) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                       //     cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            this.nArray[this.tt - 1][this.mm] = this.nArray[this.tt][this.mm] = this.nArray[this.tt + 1][this.mm] = this.nArray[this.tt][this.mm - 1] = this.t;
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);

                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;
                    case 1 :    // T  |--

                        if ((this.nArray[this.tt - 1][this.mm - 2] == -1 ) && (this.nArray[this.tt][this.mm - 1] == -1 )) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.nArray[this.tt][this.mm] = this.nArray[this.tt - 1][this.mm + 1] = this.nArray[this.tt - 1][this.mm] = this.nArray[this.tt - 1][this.mm - 1] = this.t;
                            cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            this.tetris[this.t].y += 10;
                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;

                        }
                        break;
                    case 2 :    //  T _|_

                        if ((this.nArray[this.tt - 1][this.mm - 2] == -1 ) && (this.nArray[this.tt][this.mm - 2] == -1 )
                            && (this.nArray[this.tt + 1][this.mm - 2] == -1 )) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            this.nArray[this.tt - 1][this.mm - 1] = this.nArray[this.tt][this.mm] = this.nArray[this.tt][this.mm - 1] = this.nArray[this.tt + 1][this.mm - 1] = this.t;
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);

                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;
                    case 3 :    //  T --|

                        if ((this.nArray[this.tt - 1][this.mm - 1] == -1 ) && (this.nArray[this.tt][this.mm - 2] == -1 )) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            this.nArray[this.tt - 1][this.mm] = this.nArray[this.tt][this.mm + 1] = this.nArray[this.tt][this.mm] = this.nArray[this.tt][this.mm - 1] = this.t;
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            this.tetris[this.t].y += 10;

                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;
                }
                break;
            case 1 :   //  I
                switch (this.td) {
                    //  .....
                    case 0 : //  I ▁
                    case 2:
                        if ((this.nArray[this.tt - 2][this.mm - 1] == -1) && (this.nArray[this.tt - 1][this.mm - 1] == -1)
                            && (this.nArray[this.tt][this.mm - 1] == -1 ) && (this.nArray[this.tt + 1][this.mm - 1]) == -1) {
                            this.tetris[this.t].y -= this.dy;
                        } else {
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            this.tetris[this.t].y += 10;

                            //    cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            //    cc.log(" t= " + this.t + " tt= " + this.tt + " mm= " + this.mm);
                            this.nArray[this.tt - 2][this.mm] = this.nArray[this.tt - 1][this.mm] = this.nArray[this.tt][this.mm] = this.nArray[this.tt + 1][this.mm] = this.t;
                            //      cc.log("nArray[tt-2~+1][mm]= " + this.nArray[this.tt - 2][this.mm] + " " + this.nArray[this.tt - 1][this.mm] + " " + this.nArray[this.tt][this.mm] + " " + this.nArray[this.tt + 1][this.mm]);
                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break
                    case 1 :    // I |
                    case 3:
                        if (this.nArray[this.tt][this.mm - 3] == -1) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            //          cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            //          cc.log(" t= " + this.t + " tt= " + this.tt + " mm= " + this.mm);
                            this.nArray[this.tt][this.mm - 2] = this.nArray[this.tt][this.mm - 1] = this.nArray[this.tt][this.mm] = this.nArray[this.tt][this.mm + 1] = this.t;
                            //          cc.log("nArray[tt][mm-2~+1]= " + this.nArray[this.tt][this.mm - 2] + " " + this.nArray[this.tt][this.mm - 1] + " " + this.nArray[this.tt][this.mm] + " " + this.nArray[this.tt][this.mm + 1]);
                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;
                }
                break;
            case 2 :   //  O
                if ((this.nArray[this.tt - 1][this.mm - 2] == -1) && (this.nArray[this.tt][this.mm - 2] == -1)) {
                    this.tetris[this.t].y -= this.dy
                } else {
                    this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                    //   cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                    this.nArray[this.tt - 1][this.mm] = this.nArray[this.tt - 1][this.mm - 1] = this.nArray[this.tt][this.mm] = this.nArray[this.tt][this.mm - 1] = this.t;

                    this.score(this);
                    this.checkLine(this);
                    this.tetrisCreate(this);
                    this.td = 0;
                }
                break;
            case 3 :   //  L
                switch (this.td) {
                    case 0 : //  L L
                        if ((this.nArray[this.tt - 1][this.mm - 2] == -1) && (this.nArray[this.tt][this.mm - 2] == -1)) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            this.tetris[this.t].y += 10;

                            //    cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);

                            this.nArray[this.tt - 1][this.mm + 1] = this.nArray[this.tt - 1][this.mm - 1] = this.nArray[this.tt - 1][this.mm] = this.nArray[this.tt][this.mm - 1] = this.t;

                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;
                    case 1 :    // L  __|
                        if ((this.nArray[this.tt - 1][this.mm - 2] == -1) && (this.nArray[this.tt][this.mm - 2] == -1) && (this.nArray[this.tt + 1][this.mm - 2] == -1)) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            //       cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            this.nArray[this.tt - 1][this.mm - 1] = this.nArray[this.tt][this.mm - 1] = this.nArray[this.tt + 1][this.mm - 1] = this.nArray[this.tt + 1][this.mm] = this.t;
                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;
                    case 2 :    //  L  7
                        if ((this.nArray[this.tt - 1][this.mm] == -1) && (this.nArray[this.tt][this.mm - 2] == -1)) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            this.tetris[this.t].y += 10;

                            //       cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            this.nArray[this.tt - 1][this.mm + 1] = this.nArray[this.tt][this.mm - 1] = this.nArray[this.tt][this.mm + 1] = this.nArray[this.tt][this.mm] = this.t;
                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;
                    case 3 :    //  L  ┌--
                        if ((this.nArray[this.tt - 1][this.mm - 2] == -1) && (this.nArray[this.tt][this.mm - 1] == -1) && (this.nArray[this.tt + 1][this.mm - 1] == -1)) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            //        cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            this.nArray[this.tt - 1][this.mm] = this.nArray[this.tt - 1][this.mm - 1] = this.nArray[this.tt][this.mm] = this.nArray[this.tt + 1][this.mm] = this.t;
                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;
                }
                break;
            case 4 :   //  J
                switch (this.td) {
                    case 0 : //  J J
                        if ((this.nArray[this.tt - 1][this.mm - 2] == -1) && (this.nArray[this.tt][this.mm - 2] == -1)) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            //    cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            this.tetris[this.t].y += 10;

                            this.nArray[this.tt - 1][this.mm - 1] = this.nArray[this.tt][this.mm + 1] = this.nArray[this.tt][this.mm] = this.nArray[this.tt][this.mm - 1] = this.t;

                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;
                    case 1 :    // J --i
                        if ((this.nArray[this.tt - 1][this.mm - 1] == -1) && (this.nArray[this.tt][this.mm - 1] == -1)
                            && (this.nArray[this.tt + 1][this.mm - 2] == -1)) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            //           cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            this.nArray[this.tt - 1][this.mm] = this.nArray[this.tt][this.mm] = this.nArray[this.tt + 1][this.mm] = this.nArray[this.tt + 1][this.mm - 1] = this.t;

                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;
                    case 2 :    //  J |-
                        if ((this.nArray[this.tt - 1][this.mm - 2] == -1) && (this.nArray[this.tt][this.mm] == -1)) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            //           cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            this.nArray[this.tt - 1][this.mm + 1] = this.nArray[this.tt - 1][this.mm] = this.nArray[this.tt - 1][this.mm - 1] = this.nArray[this.tt][this.mm + 1] = this.t;
                            this.tetris[this.t].y += 10;

                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;
                    case 3 :    //  J └—
                        if ((this.nArray[this.tt - 1][this.mm - 2] == -1) && (this.nArray[this.tt][this.mm - 2] == -1)
                            && (this.nArray[this.tt + 1][this.mm - 2] == -1)) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            //          cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            this.nArray[this.tt - 1][this.mm] = this.nArray[this.tt - 1][this.mm - 1] = this.nArray[this.tt][this.mm - 1] = this.nArray[this.tt + 1][this.mm - 1] = this.t;

                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;
                }
                break;
            case 5 :   //  N
                switch (this.td) {
                    case 0 : //  N N
                    case 2 :
                        if ((this.nArray[this.tt - 1][this.mm - 1] == -1) && (this.nArray[this.tt][this.mm - 2] == -1)) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            //      cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            this.nArray[this.tt - 1][this.mm + 1] = this.nArray[this.tt - 1][this.mm] = this.nArray[this.tt][this.mm] = this.nArray[this.tt][this.mm - 1] = this.t;
                            this.tetris[this.t].y += 10;

                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;
                    case 1 :    // N _|▔
                    case 3 :
                        if ((this.nArray[this.tt - 1][this.mm - 2] == -1) && (this.nArray[this.tt][this.mm - 2] == -1)
                            && (this.nArray[this.tt + 1][this.mm - 1] == -1)) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            //        cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            this.nArray[this.tt - 1][this.mm - 1] = this.nArray[this.tt][this.mm - 1] = this.nArray[this.tt][this.mm] = this.nArray[this.tt + 1][this.mm] = this.t;

                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;

                }
                break;
            case 6 :   //  Z
                switch (this.td) {
                    case 0 : //  Z Z
                    case 2 :
                        if ((this.nArray[this.tt - 1][this.mm - 1] == -1) && (this.nArray[this.tt][this.mm - 2] == -1)
                            && (this.nArray[this.tt + 1][this.mm - 2] == -1)) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            //           cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            this.nArray[this.tt - 1][this.mm] = this.nArray[this.tt][this.mm] = this.nArray[this.tt][this.mm - 1] = this.nArray[this.tt + 1][this.mm - 1] = this.t;

                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;
                    case 1 :    // Z ┌┘
                    case 3 :
                        if ((this.nArray[this.tt - 1][this.mm - 2] == -1) && (this.nArray[this.tt][this.mm - 1] == -1)) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.tetris[this.t].y -= ((this.tetris[this.t].y - 10) % 20);
                            this.tetris[this.t].y += 10;

                            //             cc.log("y " + (this.tetris[this.t].y) + " " + (this.tetris[this.t].y - 10) % 20);
                            this.nArray[this.tt - 1][this.mm - 1] = this.nArray[this.tt - 1][this.mm] = this.nArray[this.tt][this.mm] = this.nArray[this.tt][this.mm + 1] = this.t;

                            this.score(this);
                            this.checkLine(this);
                            this.tetrisCreate(this);
                            this.td = 0;
                        }
                        break;

                }
                break;
        }

        for (k = 1; k < 21; k++) {
            if (this.nArray[k][30] != -1) {
                this.reStart = true
            }
        }
        if (this.reStart) {
            this.reStart = false;
            for (i = 1; i < 21; i++) {
                for (j = 1; j < 31; j++) {
                    var ij = i + 20 * (j - 1);
                    this.removeChild(this.tetris[this.nArray[i][j]]);
                    this.removeChild(this.sprite[ij])
                }
            }
            this.unscheduleUpdate(this);
            cc.audioEngine.stopMusic("res/bgMusic.mp3");
            cc.audioEngine.stopAllEffects();
            if (this.isEffectPlay) {
                cc.audioEngine.playEffect("res/Smuglyanka.mp3", true);
                this.isEffectPlay = false;
            } else {
                cc.audioEngine.playEffect("res/Russian.mp3", true);
                this.isEffectPlay = true;
            }
        }
        var d = new Date();
        var n = d.toLocaleTimeString();
        var t5s = " " + n;
        this.t5.setString(t5s);
    }
    ,

    shuffle: function (layer) {
        var i, j, x;
        for (i = layer.tArray.length; i; i--) {
            j = parseInt(Math.random() * i);
            x = layer.tArray[i - 1];
            layer.tArray[i - 1] = layer.tArray[j];
            layer.tArray[j] = x;
        }
    }
    ,

    score: function (layer) {
        layer.counter += 10;
        layer.t3s = " " + layer.counter;
        layer.t3.setString(layer.t3s);
    }
    ,

    ccLog: function (layer) {
        //   cc.log("X: " + layer.tetris[layer.t].x + " Y: " + layer.tetris[layer.t].y + " '0:' " + layer.Ry[0] + " " + layer.Ry[1] + " " + layer.Ry[2] + " " + layer.Ry[3] + " " + layer.Ry[4] + " '5:' " + layer.Ry[5] + " " + layer.Ry[6] + " " + layer.Ry[7] + " " +
        //        layer.Ry[8] + " " + layer.Ry[9] + " '10-' " + layer.Ry[10] + " " + layer.Ry[11] + " " + layer.Ry[12] + " " + layer.Ry[13] + " " + layer.Ry[14] + " '15-' " + layer.Ry[15] + " " + layer.Ry[16] + " " + layer.Ry[17] + " " + layer.Ry[18] + " " +
        //        layer.Ry[19] + " '20-' " + layer.Ry[20]);
        cc.log("tt= " + layer.tt + " mm= " + layer.mm + " nArray[tt-2~tt+1][layer.mm]= " + layer.nArray[layer.tt - 2][layer.mm] + " " + layer.nArray[layer.tt - 1][layer.mm] + " " + layer.nArray[layer.tt][layer.mm] + " " + layer.nArray[layer.tt + 1][layer.mm]);
        // cc.log("Ry[layer.tt] " + layer.Ry[layer.tt] + " layer.Ry[layer.tt - 1] " + layer.Ry[layer.tt - 1] + " hight " + layer.tetris[layer.t].height + " width " + layer.tetris[layer.t].width);
        //
        // for (var xi = 1; xi < 21; xi++) {
        //     for (var yj = 1; yj < 30; yj++) {
        //         cc.log(" xi= " + xi + " " + layer.nArray[xi]);
        //     }
        // }
    }
    ,

    tetrisCreate: function (layer) {
        layer.t = layer.tArray.shift();
        //  shift() read & move data form head , unshift() add plus data from head
        // layer.t = 6;
        var rest = "", x1 = 0;
        switch (layer.t % 7) {
            case 0 :
                rest = res.TB;
                x1 = 0;     //  when start drop down X adjust x1 position
                break;
            case 1 :
                rest = res.IG;
                x1 = -30;       //  start drop down X position
                break;
            case 2 :
                rest = res.OO;
                x1 = -10;
                break;
            case 3 :
                rest = res.LR;
                x1 = -30;
                break;
            case 4 :
                rest = res.JP;
                x1 = -10;
                break;
            case 5 :
                rest = res.NB;
                x1 = -10;
                break;
            case 6 :
                rest = res.ZP;
                x1 = -40;
                break;
        }
        layer.tetris[layer.t] = new cc.Sprite(rest);
        layer.tetris[layer.t].attr({
            x: 480 + x1,
            y: 640
        });
        this.addChild(layer.tetris[layer.t], 2);

    }
    ,

    checkLine: function (layer) {
        for (var j = 1; j < 30; j++) {  //  check nArray[][] which line be occupied  ?
            var w = 0;
            for (var i = 1; i < 21; i++) {
                if (layer.nArray[i][j] != -1) {
                    w++;
                }
            }
            if (w == 20) {
                layer.delLine.push(j);  // add value form bottom
                //  cc.log("delLine= " + layer.delLine + " length " + layer.delLine.length);
                for (jj = 1; jj < 29; jj++) {
                    for (var ii = 1; ii < 21; ii++) {
                        //   cc.log("w= " + w + " J= " + j + " ii= " + ii + "nArray[ii][j]= " + layer.nArray[ii][j] + " layer.tetris[layer.nArray[ii][j]]" + layer.tetris[layer.nArray[ii][j]]);
                        this.removeChild(layer.tetris[layer.nArray[ii][jj]]);
                    }
                }

                for (i = 1; i < 29; i++) {
                    for (j = 1; j < 21; j++) {
                        var ij = j + 20 * (i - 1);
                        this.removeChild(layer.sprite[ij])
                    }
                }
                cc.audioEngine.stopMusic("res/bgMusic.mp3");
                cc.audioEngine.stopAllEffects();
                if (this.isEffectPlay) {
                    cc.audioEngine.playEffect("res/Smuglyanka.mp3", true);
                    this.isEffectPlay = false;
                } else {
                    cc.audioEngine.playEffect("res/Russian.mp3", true);
                    this.isEffectPlay = true;
                }


                layer.counter += 500;
                layer.score(this);
            }
        }

        //  pop()	Removes the last element of an array, and returns that element
        while (layer.delLine.length > 0) {
            layer.newSpit = true;
            layer.line = layer.delLine.pop();
            for (var jj = layer.line; jj < 30; jj++) {
                for (var iii = 1; iii < 21; iii++) {
                    layer.nArray[iii][jj] = layer.nArray[iii][jj + 1];

                }
            }
            // for (i = 0; i < 22; i++) {
            //     if (layer.Ry[i] > 10) {
            //         layer.Ry[i] -= 20;
            //     }
            // }
        }


        if (layer.newSpit) {        // create new color sprite
            for (i = 1; i < 29; i++) {
                for (j = 1; j < 21; j++) {
                    if ((layer.nArray[j][i]) != -1) {
                        //  cc.log(" " + i + " " + j + " " + layer.nArray[j][i]);
                        var color = "";
                        switch (layer.nArray[j][i] % 7) {
                            case 0 :
                                color = res.TB1;
                                break;
                            case 1:
                                color = res.IG1;
                                break;
                            case 2:
                                color = res.OO1;
                                break;
                            case 3:
                                color = res.LR1;
                                break;
                            case 4:
                                color = res.JP1;
                                break;
                            case 5:
                                color = res.NB1;
                                break;
                            case 6:
                                color = res.ZP1;
                                break;
                        }
                        var ji = j + 20 * (i - 1);

                        layer.sprite[ji] = new cc.Sprite(color);
                        layer.sprite[ji].attr({
                            x: 260 + (j - 1) * 20,
                            y: i * 20
                        });
                        this.addChild(layer.sprite[ji], 3);
                        // cc.log("ji " + ji + " x  " + ( 260 + (j - 1) * 20) + " y " + i * 20);
                    }
                }
            }
            layer.newSpit = false;
        }
    }
})
;

var Tetris01Scene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new Tetris01Layer();
        this.addChild(layer);
        this.focused = true;
    }
});


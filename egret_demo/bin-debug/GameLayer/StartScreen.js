var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var StartScreen = (function (_super) {
    __extends(StartScreen, _super);
    function StartScreen() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    // private startBtn:egret.Bitmap;
    // private helpBtn:egret.Bitmap;
    // private title:egret.Bitmap;
    // private rank:egret.Bitmap;
    StartScreen.prototype.hideStartScreen = function (evt) {
        var _this = this;
        var tw = egret.Tween.get(this.start_screen);
        tw.to({ y: -GameConfig.getHeight(), alpha: 1 }, 0.5 * 1000).call(function () {
            // this.removeChildren();
            console.log('完成');
        });
        tw.call(function () {
            var event = new GameEvent(GameEvent.GAME_GO);
            _this.dispatchEvent(event);
        });
    };
    StartScreen.prototype.init = function () {
        var screenW = Data.getStageWidth();
        var screenH = Data.getStageHeight();
        console.log(screenW, screenH);
        var start_screen = new egret.Sprite();
        start_screen.graphics.beginFill(0x000000, 0.5);
        start_screen.graphics.drawRect(0, 0, screenW, screenH);
        start_screen.graphics.endFill();
        start_screen.touchEnabled = true;
        this.start_screen = start_screen;
        this.addChild(start_screen);
        start_screen.once(egret.TouchEvent.TOUCH_BEGIN, this.hideStartScreen, this);
        // start_screen.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.hideStartScreen, this);
        var gameDetailText = new egret.TextField();
        gameDetailText.textColor = 0xffffff;
        gameDetailText.width = GameConfig.getWidth();
        gameDetailText.textAlign = "center";
        gameDetailText.text = "点击下面方形即可变圆\n松开即变回方形1";
        gameDetailText.size = 50;
        gameDetailText.lineSpacing = 15;
        gameDetailText.bold = true;
        gameDetailText.y = 500;
        start_screen.addChild(gameDetailText);
        var startGameText = new egret.TextField();
        startGameText.textColor = 0xffffff;
        startGameText.width = GameConfig.getWidth();
        startGameText.textAlign = "center";
        startGameText.text = "点击开始";
        startGameText.size = 60;
        startGameText.bold = true;
        startGameText.y = 1000;
        start_screen.addChild(startGameText);
    };
    //  排行按钮回调
    StartScreen.prototype.rankCallback = function (evt) {
    };
    //  开始按钮回调
    StartScreen.prototype.startBtnCallback = function (evt) {
    };
    //  help按钮回调
    StartScreen.prototype.helpBtnCallback = function (evt) {
    };
    return StartScreen;
}(egret.Sprite));
__reflect(StartScreen.prototype, "StartScreen");

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
var EndScreen = (function (_super) {
    __extends(EndScreen, _super);
    function EndScreen() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    /**
     * 获取最高成绩
     */
    EndScreen.prototype.onGetHotScoreText = function (num) {
        if (num === void 0) { num = 0; }
        return "\u5386\u53F2\u6700\u9AD8\uFF1A" + localStorage.getItem('high_score');
    };
    /**
     * 获取超越了{number}的人数
     */
    EndScreen.prototype.onGetSurpassPlayerText = function (num) {
        if (num === void 0) { num = 0; }
        return "\u8D85\u8D8A\u4E86" + num + "%\u7684\u73A9\u5BB6";
    };
    EndScreen.prototype.hideStartScreen = function (evt) {
        var _this = this;
        var tw = egret.Tween.get(this.end_screen);
        tw.to({ y: -GameConfig.getHeight(), alpha: 1 }, 0.5 * 1000).call(function () {
            // this.removeChildren();
            console.log('完成');
        });
        tw.call(function () {
            var event = new GameEvent(GameEvent.GAME_GO);
            _this.dispatchEvent(event);
        });
    };
    /* 再玩一次 */
    EndScreen.prototype.onBtn1 = function () {
        var event = new GameEvent(GameEvent.GAME_BTN1);
        this.dispatchEvent(event);
    };
    /* btn2 */
    EndScreen.prototype.onBtn2 = function () {
        var event = new GameEvent(GameEvent.GAME_BTN2);
        this.dispatchEvent(event);
    };
    /* btn3 */
    EndScreen.prototype.onBtn3 = function () {
        var event = new GameEvent(GameEvent.GAME_BTN3);
        this.dispatchEvent(event);
    };
    EndScreen.prototype.init = function () {
        var end_screen = new egret.Sprite();
        end_screen.graphics.beginFill(GameConfig.getGameColor());
        end_screen.graphics.drawRect(0, 0, GameConfig.getWidth(), GameConfig.getHeight());
        end_screen.graphics.endFill();
        end_screen.touchEnabled = true;
        this.end_screen = end_screen;
        this.addChild(end_screen);
        // end_screen.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.hideStartScreen, this);
        // 最高成绩是：{query}
        var highScoreText = new egret.TextField();
        highScoreText.textColor = 0xffffff;
        highScoreText.width = GameConfig.getWidth();
        highScoreText.textAlign = "center";
        highScoreText.text = this.onGetHotScoreText();
        highScoreText.size = 65;
        highScoreText.lineSpacing = 15;
        highScoreText.y = 180;
        this.high_score_text = highScoreText;
        end_screen.addChild(highScoreText);
        // 分数
        var gameScore = new egret.Sprite();
        gameScore.graphics.beginFill(0xffffff);
        gameScore.graphics.drawCircle(GameConfig.getWidth() / 2, 0, 90);
        gameScore.graphics.endFill();
        gameScore.y = 400;
        end_screen.addChild(gameScore);
        var gameScoreText = new egret.TextField();
        gameScoreText.textColor = GameConfig.getGameColor();
        gameScoreText.width = GameConfig.getWidth();
        gameScoreText.textAlign = "center";
        gameScoreText.text = GameConfig.getGameScore();
        gameScoreText.size = 64;
        gameScoreText.bold = true;
        gameScoreText.y = -20;
        gameScore.addChild(gameScoreText);
        // 超越了{number}%的玩家
        var surpassPlayerText = new egret.TextField();
        surpassPlayerText.textColor = 0xffffff;
        surpassPlayerText.width = GameConfig.getWidth();
        surpassPlayerText.textAlign = "center";
        surpassPlayerText.text = this.onGetSurpassPlayerText();
        surpassPlayerText.size = 55;
        surpassPlayerText.lineSpacing = 15;
        surpassPlayerText.y = 550;
        this.surpass_player_text = surpassPlayerText;
        end_screen.addChild(surpassPlayerText);
        // 再玩一次按钮
        var endBtn1 = new egret.Sprite();
        endBtn1.graphics.beginFill(0xff0000, 0);
        endBtn1.graphics.lineStyle(4, 0xffffff);
        endBtn1.graphics.drawRoundRect(0, 0, 200, 70, 20, 20);
        endBtn1.graphics.endFill();
        endBtn1.touchEnabled = true;
        endBtn1.y = 780;
        endBtn1.x = 100;
        end_screen.addChild(endBtn1);
        endBtn1.once(egret.TouchEvent.TOUCH_BEGIN, this.onBtn1, this);
        var endBtn1Text = new egret.TextField();
        endBtn1Text.textColor = 0xffffff;
        endBtn1Text.text = '再玩一次';
        endBtn1Text.size = 30;
        endBtn1Text.width = 200;
        endBtn1Text.textAlign = "center";
        endBtn1Text.y = 20;
        endBtn1.addChild(endBtn1Text);
        // 排行榜按钮
        var endBtn2 = new egret.Sprite();
        endBtn2.graphics.beginFill(0xff0000, 0);
        endBtn2.graphics.lineStyle(4, 0xffffff);
        endBtn2.graphics.drawRoundRect(0, 0, 200, 70, 20, 20);
        endBtn2.graphics.endFill();
        endBtn2.touchEnabled = true;
        endBtn2.y = 780;
        endBtn2.x = GameConfig.getWidth() - 300;
        end_screen.addChild(endBtn2);
        endBtn2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtn2, this);
        var endBtn2Text = new egret.TextField();
        endBtn2Text.textColor = 0xffffff;
        endBtn2Text.text = '排行榜';
        endBtn2Text.size = 30;
        endBtn2Text.width = 200;
        endBtn2Text.textAlign = "center";
        endBtn2Text.y = 20;
        endBtn2.addChild(endBtn2Text);
        // 更多游戏
        var endBtn3 = new egret.Sprite();
        endBtn3.graphics.beginFill(0xff0000);
        endBtn3.graphics.drawRoundRect(0, 0, 200, 70, 20, 20);
        endBtn3.graphics.endFill();
        endBtn3.touchEnabled = true;
        endBtn3.y = 650;
        endBtn3.x = GameConfig.getWidth() / 2 - 100;
        endBtn3.width = GameConfig.getWidth();
        end_screen.addChild(endBtn3);
        endBtn3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtn3, this);
        var endBtn3Text = new egret.TextField();
        endBtn3Text.textColor = 0xffffff;
        endBtn3Text.text = "更多游戏";
        endBtn3Text.size = 30;
        endBtn3Text.width = 200;
        endBtn3Text.textAlign = "center";
        endBtn3Text.y = 20;
        endBtn3.addChild(endBtn3Text);
        // console.log("分数" + this.GAME_SCORE);
        // const gameScoreText:egret.TextField = new egret.TextField();
        // gameScoreText.textColor = 0xff9999;
        // gameScoreText.width = GameConfig.getWidth();
        // gameScoreText.textAlign = "center";
        // gameScoreText.text = '90';
        // gameScoreText.size = 60;
        // gameScoreText.bold = true;
        // gameScoreText.y = -20;
        // gameScore.addChild(gameScoreText);
    };
    //  排行按钮回调
    EndScreen.prototype.rankCallback = function (evt) {
    };
    //  开始按钮回调
    EndScreen.prototype.startBtnCallback = function (evt) {
    };
    //  help按钮回调
    EndScreen.prototype.helpBtnCallback = function (evt) {
    };
    return EndScreen;
}(egret.Sprite));
__reflect(EndScreen.prototype, "EndScreen");

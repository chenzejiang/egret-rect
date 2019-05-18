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
var ConLayer = (function (_super) {
    __extends(ConLayer, _super);
    function ConLayer(isTime) {
        var _this = _super.call(this) || this;
        _this.time1 = null;
        _this.game_over_text = egret.TextField;
        _this.BOSS_SHAPE = 1; // boss的形状 1=方 0=圆 
        _this.CREAT_RECT_SHAPE = 0; // 新创建的形状 1=方 0=圆
        _this.SIZE = 80; // 形状的大小
        _this.GAME_SCORE = "0"; // 游戏分数
        _this.init(isTime);
        return _this;
    }
    /**
     * 游戏结束动画
     */
    ConLayer.prototype.onGameOverText = function () {
        var _this = this;
        var game_over_text = new egret.TextField();
        game_over_text.textColor = 0xffffff;
        game_over_text.width = GameConfig.getWidth();
        game_over_text.textAlign = "center";
        game_over_text.text = "游 戏 结 束";
        game_over_text.size = 80;
        game_over_text.alpha = 0.6;
        game_over_text.bold = true;
        game_over_text.y = -100;
        this.con_layer.addChild(game_over_text);
        var tw = egret.Tween.get(game_over_text);
        tw.to({ y: 300 }, 1.5 * 1000);
        tw.call(function () {
            _this.onShowEndScreen();
        });
    };
    /**
     * 隐藏游戏界面，显示游戏结束
     */
    ConLayer.prototype.onShowEndScreen = function () {
        var _this = this;
        var tw = egret.Tween.get(this.con_layer);
        tw.to({ y: -GameConfig.getHeight(), alpha: 0 }, 0.5 * 1000);
        tw.call(function () {
            console.log('显示游戏结束界面');
            _this.removeChildren();
            // 动画结束显示结束
            var event = new GameEvent(GameEvent.GAME_OVER);
            _this.dispatchEvent(event);
        });
    };
    /**
     * 计算游戏分数
     */
    ConLayer.prototype.onAddGameScore = function () {
        var new_score = String(Number(this.GAME_SCORE) + 1);
        this.GAME_SCORE = new_score;
        this.game_score.text = new_score;
    };
    /**
     * 创建新形状
     */
    ConLayer.prototype.onCreatShape = function () {
        var _this = this;
        var randow = Math.round(Math.random());
        var new_shape = new egret.Sprite();
        new_shape.graphics.beginFill(0xffffff);
        if (randow === 0) {
            new_shape.graphics.drawCircle(GameConfig.getWidth() / 2, -this.SIZE, this.SIZE);
            this.CREAT_RECT_SHAPE = 0;
        }
        else {
            new_shape.graphics.drawRect(GameConfig.getWidth() / 2 - this.SIZE, -this.SIZE * 2, this.SIZE * 2, this.SIZE * 2);
            this.CREAT_RECT_SHAPE = 1;
        }
        new_shape.graphics.endFill();
        this.con_layer.addChild(new_shape);
        var tw = egret.Tween.get(new_shape);
        tw.to({ y: 800 - this.SIZE }, 1 * 1000);
        tw.call(function (e) {
            if (_this.BOSS_SHAPE === _this.CREAT_RECT_SHAPE) {
                console.log('正确');
                new_shape.alpha = 0;
                // this.con_layer.removeChild(new_shape);
                _this.onAddGameScore();
            }
            else {
                console.log('conlayer 结束');
                clearInterval(_this.time1); // 取消创建
                _this.onGameOverText(); // 游戏结束动画
                _this.setGameScore(); // 设置分数
                // 触发现实结束界面
                // const event:GameEvent = new GameEvent(GameEvent.GAME_OVER);
                // this.dispatchEvent(event);
            }
        });
    };
    /**
     * 设置分数
     */
    ConLayer.prototype.setGameScore = function () {
        GameConfig.setGameScore(this.GAME_SCORE); // 设置分数到全局
        // 设置最高分
        var higt_score = localStorage.getItem("high_score");
        if (higt_score !== null) {
            if (higt_score < this.GAME_SCORE) {
                localStorage.setItem("high_score", this.GAME_SCORE);
            }
        }
        else {
            localStorage.setItem("high_score", this.GAME_SCORE);
        }
    };
    /**
     * 开始创建元素
     */
    ConLayer.prototype.onStartCreatShape = function () {
        var _this = this;
        // 定时创建新形状
        this.time1 = setInterval(function () {
            _this.onCreatShape();
        }, 1 * 1000);
        this.onCreatShape();
    };
    ConLayer.prototype.onBossTouchBegin = function (evt) {
        this.BOSS_SHAPE = 0; // 圆
        this.boss.alpha = 0;
    };
    ConLayer.prototype.onBossTouchEnd = function (evt) {
        this.BOSS_SHAPE = 1; // 方
        this.boss.alpha = 1;
    };
    ConLayer.prototype.init = function (isTime) {
        var con_layer = new egret.Sprite();
        con_layer.graphics.beginFill(GameConfig.getGameColor());
        con_layer.graphics.drawRect(0, 0, GameConfig.getWidth(), GameConfig.getHeight());
        con_layer.graphics.endFill();
        this.con_layer = con_layer;
        this.addChild(con_layer);
        // 中间的线
        var line = new egret.Shape();
        line.graphics.lineStyle(10, 0xffffff);
        line.graphics.moveTo(GameConfig.getWidth() / 2, 0);
        line.graphics.lineTo(GameConfig.getWidth() / 2, GameConfig.getHeight());
        line.graphics.endFill();
        con_layer.addChild(line);
        // 分数
        var game_score = new egret.TextField();
        game_score.textColor = 0xffffff;
        game_score.width = GameConfig.getWidth();
        game_score.text = this.GAME_SCORE;
        game_score.size = 60;
        game_score.alpha = 0.5;
        game_score.bold = true;
        game_score.y = 40;
        game_score.x = 40;
        this.game_score = game_score;
        con_layer.addChild(game_score);
        // 圆
        var boss_c = new egret.Sprite();
        boss_c.graphics.beginFill(0xffffff);
        boss_c.graphics.drawCircle(GameConfig.getWidth() / 2, 800, this.SIZE);
        boss_c.graphics.endFill();
        con_layer.addChild(boss_c);
        // 方
        var boss = new egret.Sprite();
        boss.graphics.beginFill(0xffffff);
        boss.graphics.drawRect(GameConfig.getWidth() / 2 - this.SIZE, 800 - this.SIZE, this.SIZE * 2, this.SIZE * 2);
        boss.graphics.endFill();
        boss.touchEnabled = true;
        this.boss = boss;
        con_layer.addChild(boss);
        // 监听boss的TOUCH
        boss.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBossTouchBegin, this);
        boss.addEventListener(egret.TouchEvent.TOUCH_END, this.onBossTouchEnd, this);
        if (isTime) {
            this.onStartCreatShape();
        }
    };
    return ConLayer;
}(egret.Sprite));
__reflect(ConLayer.prototype, "ConLayer");

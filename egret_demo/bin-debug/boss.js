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
var Boss = (function (_super) {
    __extends(Boss, _super);
    function Boss(boss_type) {
        var _this = _super.call(this) || this;
        _this.init(boss_type);
        return _this;
    }
    // private 
    Boss.prototype.init = function (boss_type) {
        if (boss_type === void 0) { boss_type = 0; }
        console.log(boss_type + 'boss');
        var boss = new egret.Shape();
        if (boss_type === 0) {
            // var boss:egret.Sprite = new egret.Sprite();
            // boss.graphics.beginFill( 0xffffff );
            // boss.graphics.drawRect(GameConfig.getWidth() / 2 - 80 , 800, 160, 160);
            // boss.graphics.endFill();
        }
        else {
            // var boss = new egret.Shape();
            // boss.graphics.beginFill( 0xffffff);
            // boss.graphics.drawCircle(375, 800, 80);
            // boss.graphics.endFill();
        }
        // boss.touchEnabled = true;
        // this.addChild( boss );
    };
    return Boss;
}(egret.Shape));
__reflect(Boss.prototype, "Boss");

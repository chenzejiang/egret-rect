var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 统一设置游戏所有配置参数，含版本号，参数地址等
 *
 */
var GameConfig = (function () {
    function GameConfig() {
    }
    GameConfig.getBasicUrl = function () { return this.basicUrl; };
    ;
    GameConfig.getGameColor = function () { return this.gameColor; };
    ;
    GameConfig.getAppCode = function () { return this.appCode; };
    ;
    GameConfig.getVersion = function () { return this.version; };
    ;
    GameConfig.getShareTitle = function () { return this.shareTitle; };
    ;
    GameConfig.getShareImg = function () { return this.shareImg; };
    ;
    GameConfig.getGameScore = function () { return this.gameScore; };
    ;
    GameConfig.setStageWidthHeight = function (stage) { this.stageWidth = stage.stageWidth; this.stageHeight = stage.stageHeight; };
    GameConfig.setGameScore = function (score) { this.gameScore = score; };
    GameConfig.getWidth = function () { return this.stageWidth; };
    ;
    GameConfig.getHeight = function () { return this.stageHeight; };
    ;
    GameConfig.getKey = function () { return this.key; };
    ;
    GameConfig.setMain = function (main) {
        this.stage = main;
    };
    GameConfig.getMain = function () {
        return this.stage;
    };
    // http通讯地址,请自行填入自己的服务器地址，若有跨域问题则点开开发工具详情，勾选不校验合法域名
    GameConfig.basicUrl = "";
    // 游戏自定义ID
    GameConfig.appCode = 1;
    // 游戏版本号
    GameConfig.version = "1.0.0";
    // 游戏基本分享标题
    GameConfig.shareTitle = "分享标题";
    // 游戏基本分享图片
    GameConfig.shareImg = "imgUrl";
    // 游戏基本宽
    GameConfig.stageWidth = 750;
    // 游戏基本高
    GameConfig.stageHeight = 1334;
    // 游戏KEY
    GameConfig.key = '';
    // 游戏颜色调
    GameConfig.gameColor = 0x374855;
    // 游戏stage
    GameConfig.stage = null;
    // 游戏得分
    GameConfig.gameScore = "0";
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");

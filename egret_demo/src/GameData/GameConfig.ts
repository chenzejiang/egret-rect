
/**
 * 统一设置游戏所有配置参数，含版本号，参数地址等
 *
 */
class GameConfig {

    // http通讯地址,请自行填入自己的服务器地址，若有跨域问题则点开开发工具详情，勾选不校验合法域名
    private static basicUrl: string = "";
    // 游戏自定义ID
    private static appCode: number = 1;
    // 游戏版本号
    private static version: string = "1.0.0";
    // 游戏基本分享标题
    private static shareTitle: string = "我方了吖，一起来玩玩呗";
    // 游戏基本分享图片  , 从微信后台上传审核 比例：5:4
    private static shareImg: string = "https://mmocgame.qpic.cn/wechatgame/0bucgU1yYX0prub4nPnJpE4vYD8TXH4o6vscbYibicFbRrOUBuZeMX8yVeBnX8xSicm/0";
    // 游戏基本分享图片ID , 从微信后台上传审核
    private static shareImgId: string = "oFIAckl3SMaBYfOaptmXlQ";
    // 游戏基本宽
    private static stageWidth: number = 750;
    // 游戏基本高
    private static stageHeight: number = 1334;
    // 游戏KEY
    private static key: string = '';
    // 游戏颜色调
    private static gameColor: number = 0x374855;
    // 游戏stage
    private static stage: egret.DisplayObjectContainer = null;
    // 游戏得分
    private static gameScore: string = "0";
    // 微信云开发数据库
    private static db:any = null;

    public static getBasicUrl() { return this.basicUrl };

    public static getGameColor() { return this.gameColor };

    public static getAppCode() { return this.appCode };

    public static getVersion() { return this.version };

    public static getShareTitle() { return this.shareTitle };

    public static getShareImg() { return this.shareImg };

    public static getShareImgId() { return this.shareImgId };

    public static getGameScore() { return this.gameScore };

    public static setDB() { this.db = wx.cloud.database() };

    public static getDB() { return this.db };

    public static setStageWidthHeight(stage: { stageHeight: number, stageWidth: number }) { this.stageWidth = stage.stageWidth; this.stageHeight = stage.stageHeight }

    public static setGameScore(score:string) { this.gameScore = score }

    public static getWidth() { return this.stageWidth; };

    public static getHeight() { return this.stageHeight; };

    public static getKey() { return this.key };

    public static setMain(main: egret.DisplayObjectContainer) {
        this.stage = main;
    }

    public static getMain() {
        return this.stage;
    }
}

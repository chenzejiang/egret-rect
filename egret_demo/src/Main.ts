class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private endScene:egret.Sprite;
    private app_screen: egret.Sprite;
    private bitmap: egret.Bitmap;
    private isdisplay: boolean = false;
    private rankingListMask: egret.Shape;
    private rankCloseBtn: egret.Bitmap;
    private startScene: any;

    private onAddToStage(event: egret.Event) {
        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = () => {

            }
        });

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        };

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        };

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource();
        this.createGameScene();

        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log("runGame",userInfo);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
            /* 添加一行代码：加载微信小游戏排行榜资源 */
            // platform.openDataContext.postMessage({command:'loadRes'});
        }
        catch (e) {
            console.error(e);
        }
    }

    /* 游戏主内容 */
    private go():void {
        this.removeChildren();
        let min = new ConLayer(true); // true 表示开启动画
        this.addChild(min);
        min.addEventListener(GameEvent.GAME_OVER, this.end, this);
    }

    /* 游戏主内容 */
    private startGame():void {
        // this.removeChildren();
        const startScene = new StartScreen();
        this.startScene = startScene;
        this.addChild(startScene);
        startScene.addEventListener(GameEvent.GAME_GO, this.go, this);
    }

    /* 游戏结束 */
    private end():void {
        this.removeChildren();
        let endScene = new EndScreen();
        endScene.once(GameEvent.GAME_BTN1, this.go, this); // 再玩一次
        endScene.addEventListener(GameEvent.GAME_BTN2, this.onShowFriendScore, this); // 微信好友排行榜
        endScene.addEventListener(GameEvent.GAME_BTN3, UserData.shareAppMessage, this); // 分享好友
        this.addChild(endScene);
        this.endScene = endScene;
    }

    /**
     * 创建游戏场景
     */
    private createGameScene() {
        /* 设置游戏参数内的默认舞台宽高 */
        GameConfig.setStageWidthHeight(this.stage);
        /* 初始化微信云开发 - 云函数 */
        wx.cloud.init();
        GameConfig.setDB();

        /* 第一层 */
        let app_screen = new egret.Sprite();
        app_screen.graphics.beginFill( GameConfig.getGameColor() );
        app_screen.graphics.drawRect(0, 0, GameConfig.getWidth(), GameConfig.getHeight());
        app_screen.graphics.endFill();
        this.app_screen = app_screen;
        this.addChild(app_screen);

        /* 创建游戏主界面UI */
        this.addChild(new ConLayer(false));

        /* 开始页面 */
        this.startGame();

        /* 获取openid */
        if(localStorage.getItem("openId") === null || localStorage.getItem("openId") === ""){
            UserData.getOpenId();
        }else{
            /* 有openid 后就可以获取最高成绩 */
            UserData.prefetchHighScore();
        }
        /* 获取用户信息按钮 - 透明隐藏 */
        if(localStorage.getItem('userInfo') === null || localStorage.getItem('userInfo') === ""){
            this.onCreatLoginBtn();
        }

        /* 返回按钮, 关闭排行榜 */
        this.rankCloseBtn = eKit.createBitmapByName("return_icon_png", {
            width: 80,
            height: 80,
            x: 80,
            y: 20,
            touchEnabled: true
        });
        this.rankCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowFriendScore, this);

        //加载资源
        const platform:any = window.platform;
        platform.openDataContext.postMessage({
            command:'loadRes'
        });

        /* 设置右上角分享 */
        WxKit.setDefaultShare();
    }

    /**
     * 获取用户信息按钮
     */
    private async onCreatLoginBtn() {
        console.log('onCreatLoginBtn');
        // 调用WxKit.login完成微信登陆授权操作，返回openId,token等数据;
        await WxKit.login();
        wx.hideLoading();
    }
    /**
     * 显示微信好友成绩排行榜
     */
    private onShowFriendScore() {
        // let openDataContext = wx.getOpenDataContext();
        let platform: any = window.platform;
        if (this.isdisplay) {
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);
            this.rankingListMask.parent && this.rankingListMask.parent.removeChild(this.rankingListMask);
            this.rankCloseBtn.parent && this.rankCloseBtn.parent.removeChild(this.rankCloseBtn);
            this.isdisplay = false;
            platform.openDataContext.postMessage({
                isDisplay: this.isdisplay,
                text: 'hello',
                year: (new Date()).getFullYear(),
                command: "close"
            });
        } else {
            //处理遮罩，避免开放数据域事件影响主域。
            this.rankingListMask = new egret.Shape();
            this.rankingListMask.graphics.beginFill(0x000000, 0.2);
            this.rankingListMask.graphics.drawRect(0, 0, this.stage.width, this.stage.height);
            this.rankingListMask.graphics.endFill();
            this.rankingListMask.alpha = 0.5;
            this.rankingListMask.touchEnabled = true;
            this.addChild(this.rankingListMask);
            this.addChild(this.rankCloseBtn);
            // this.addChild(this.btnClose);
            // 主要示例代码开始
            this.bitmap = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this.addChild(this.bitmap);
            // 主域向子域发送自定义消息
            platform.openDataContext.postMessage({
                isDisplay: this.isdisplay,
                text: 'hello',
                year: (new Date()).getFullYear(),
                command: "open"
            });
            //主要示例代码结束
            this.isdisplay = true;
        }
    }
}

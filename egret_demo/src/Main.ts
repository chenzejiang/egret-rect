class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private bitmap: egret.Bitmap;
    private isdisplay = false;
    private rankingListMask: egret.Shape;
    private rankCloseBtn: egret.Bitmap;
    private startScene;

    private onAddToStage(event: egret.Event) {
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
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

    private textfield: egret.TextField;

    /* 游戏主内容 */
    private go():void {
        console.log('main-go');
        this.removeChildren();
        let min = new ConLayer(true); // true 表示开启动画
        this.addChild(min);
        min.addEventListener(GameEvent.GAME_OVER, this.end, this);
    }

    /* 游戏主内容 */
    private startGame():void {
        this.removeChildren();
        var startScene = new StartScreen();
        this.startScene = startScene;
        this.addChild(startScene);
        startScene.addEventListener(GameEvent.GAME_GO, this.go, this);
    }
    /**
     * 再玩一次
     */
    private btn1():void {
        console.log('btn1');
        this.startGame();
    }

    /**
     * 微信好友排行榜
     */
    private btn2():void {
        console.log('微信好友排行榜');
        this.onShowFriendScore();
    }

    /**
     * 分享给朋友
     */
    private btn3():void {
        UserData.shareAppMessage();
    }

    /* 游戏结束 */
    private end():void {
        this.removeChildren();
        let endScene = new EndScreen();
        this.addChild(endScene);
        endScene.once(GameEvent.GAME_BTN1, this.btn1, this); // 再玩一次
        endScene.addEventListener(GameEvent.GAME_BTN2, this.btn2, this); // 排行榜
        endScene.addEventListener(GameEvent.GAME_BTN3, this.btn3, this); // 更多游戏
    }
    private openDataContext() {
        try{
            //创建开放数据域显示对象
            var platform:any = window.platform;
            this.bitmap = platform.openDataContext.createDisplayObject(null, GameConfig.getWidth(), GameConfig.getHeight());
            //主域向子域发送自定义消息
            platform.openDataContext.postMessage({
                isDisplay: this.isdisplay,
                text: 'hello',
                year: (new Date()).getFullYear(),
                command: "open"
            });
        }catch(e){
            console.log(e);
        }
    }
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        /* 设置游戏参数内的默认舞台宽高 */
        GameConfig.setStageWidthHeight(this.stage);
        /* 初始化微信云开发 - 云函数 */
        wx.cloud.init();
        GameConfig.setDB();

        /* 开始页面 */
        this.startGame();
        /* 创建开放数据域 */
        // this.openDataContext();

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

        /* 设置分享内容 */
        UserData.onShareAppMessage();
        /* 打开右上角分享 */
        UserData.onShowShareMenu();

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt: egret.TouchEvent) => {
            console.log('输出主域点击事件');
        }, this)
    }

    /**
     * 获取用户信息按钮
     */
    private async onCreatLoginBtn() {
        console.log('onCreatLoginBtn');
        // 调用WxKit.login完成微信登陆授权操作，返回openId,token等数据;
        await WxKit.login();
        // console.log(UserData.getOpenId());
        wx.hideLoading();
        // 设置默认分享,需要登录后方可调用分享功能
        WxKit.setDefaultShare();
        WxKit.setOnShowRule();
    }
    /**
     * 显示微信好友成绩排行榜
     * Click the button
     */
    private onShowFriendScore() {
        // let openDataContext = wx.getOpenDataContext();
        console.log('onShowFriendScore', this.isdisplay);
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
            //主要示例代码开始
            this.bitmap = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this.addChild(this.bitmap);
            //主域向子域发送自定义消息
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

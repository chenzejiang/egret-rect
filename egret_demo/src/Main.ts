class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private startScene;
    private min;
    private endScene;
    private btnClose;
    
    private onAddToStage(event: egret.Event) {
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
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
        console.log('btn1')
        this.startGame();
    }

    /**
     * 再玩一次
     */
    private btn2():void {
        console.log('btn2');
    }

    /**
     * 再玩一次
     */
    private btn3():void {
        console.log('btn3');
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
        // this.startGame();
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





        var btnClose = new egret.Sprite();
        btnClose.graphics.beginFill(0xffffff, 1);
        btnClose.graphics.drawRect(0, 0, 300, 300);
        btnClose.graphics.endFill();
        btnClose.touchEnabled = true;
        this.btnClose = btnClose;
        this.addChild( btnClose );
        btnClose.once(egret.TouchEvent.TOUCH_BEGIN, this.onButtonClick, this);


        //加载资源
        const platform:any = window.platform;
        platform.openDataContext.postMessage({
            command:'loadRes'
        });


        let sharedBtn = new eui.Button();
        sharedBtn.y = 605;
        sharedBtn.label = 'btnShared';
        this.addChild(sharedBtn);
        // sharedBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        //     window.platform.shareAppMessage().then((res) => {
        //         console.log('分享成功回调', res);
        //     }, (err) => {
        //         console.log('分享失败回调', err);
        //     });
        // }, this);

        /**
         * 当前按钮会退出小游戏线程
         */

        // let close = new eui.Button();
        // close.y = 135;
        // close.label = '退出';
        // this.addChild(close);

        // close.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        //     wx.exitMiniProgram({
        //         success: (res) => {
        //             console.log('退出成功', res);
        //         },
        //         fail: (err) => {
        //             console.log('退出失败', err);
        //         },
        //         complete: (res) => {

        //         }
        //     })
        // }, this);

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
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };
        change();
    }



















    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private bitmap: egret.Bitmap;

    private isdisplay = false;

    /**
     * 排行榜遮罩，为了避免点击开放数据域影响到主域，在主域中建立一个遮罩层级来屏蔽点击事件.</br>
     * 根据自己的需求来设置遮罩的 alpha 值 0~1.</br>
     * 
     */
    private rankingListMask: egret.Shape;

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        // let openDataContext = wx.getOpenDataContext();
        console.log('点击btnClose按钮');
        let platform: any = window.platform;
        if (this.isdisplay) {
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);
            this.rankingListMask.parent && this.rankingListMask.parent.removeChild(this.rankingListMask);
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
            this.rankingListMask.graphics.beginFill(0x000000, 1);
            this.rankingListMask.graphics.drawRect(0, 0, this.stage.width, this.stage.height);
            this.rankingListMask.graphics.endFill();
            this.rankingListMask.alpha = 0.5;
            this.rankingListMask.touchEnabled = true;
            this.addChild(this.rankingListMask);

            //简单实现，打开这关闭使用一个按钮。
            this.addChild(this.btnClose);
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

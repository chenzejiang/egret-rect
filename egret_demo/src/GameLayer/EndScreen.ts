class EndScreen extends egret.Sprite{
	public constructor() {
		super();
		this.init();
	}

	private end_screen: egret.Sprite;
    private high_score_text: egret.TextField;
    private surpass_player_text: egret.TextField;
    private play_again_btn_text: egret.TextField;

    /**
     * 获取最高成绩
     */
    private onGetHotScoreText(num:number = 0):string{
        return `历史最高：${UserData.personalHighScore}`;
    }

    /**
     * 获取超越了{number}的人数
     */
    private onGetSurpassPlayerText(num:number = 0):string {
        return `超越了${num}%的玩家`
    }

    private hideStartScreen(evt:egret.TouchEvent):void  {
        var tw = egret.Tween.get( this.end_screen );
        tw.to( {y: -GameConfig.getHeight(), alpha: 1}, 0.5 * 1000).call(function(){
            // this.removeChildren();
            console.log('完成');
        });
        tw.call(() => {
            var event:GameEvent = new GameEvent(GameEvent.GAME_GO);
            this.dispatchEvent(event);
        });
    }

    /* 再玩一次 */
    private onBtn1() {
        const event:GameEvent = new GameEvent(GameEvent.GAME_BTN1);
        this.dispatchEvent(event);
    }

    /* btn2 */
    private onBtn2() {
        const event:GameEvent = new GameEvent(GameEvent.GAME_BTN2);
        this.dispatchEvent(event);
    }

    /* btn3 */
    private onBtn3() {
        const event:GameEvent = new GameEvent(GameEvent.GAME_BTN3);
        this.dispatchEvent(event);
    }

    /**
     * 绘画结束UI
     */
    private endUi() {
        const end_screen = new egret.Sprite();
        end_screen.graphics.beginFill(GameConfig.getGameColor());
        end_screen.graphics.drawRect(0, 0, GameConfig.getWidth(), GameConfig.getHeight());
        end_screen.graphics.endFill();
        end_screen.touchEnabled = true;
        this.end_screen = end_screen;
        this.addChild( end_screen );
        // end_screen.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.hideStartScreen, this);

        // 最高成绩是：{query}
        const highScoreText:egret.TextField = new egret.TextField();
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
        const gameScore = new egret.Sprite();
        gameScore.graphics.beginFill(0xffffff);
        gameScore.graphics.drawCircle(GameConfig.getWidth() / 2, 0, 90);
        gameScore.graphics.endFill();
        gameScore.y = 400;
        end_screen.addChild(gameScore);

        const gameScoreText:egret.TextField = new egret.TextField();
        gameScoreText.textColor = GameConfig.getGameColor();
        gameScoreText.width = GameConfig.getWidth();
        gameScoreText.textAlign = "center";
        gameScoreText.text = GameConfig.getGameScore();
        gameScoreText.size = 64;
        gameScoreText.bold = true;
        gameScoreText.y = -20;
        gameScore.addChild(gameScoreText);

        // 超越了{number}%的玩家
        // const surpassPlayerText:egret.TextField = new egret.TextField();
        // surpassPlayerText.textColor = 0xffffff;
        // surpassPlayerText.width = GameConfig.getWidth();
        // surpassPlayerText.textAlign = "center";
        // surpassPlayerText.text = this.onGetSurpassPlayerText();
        // surpassPlayerText.size = 55;
        // surpassPlayerText.lineSpacing = 15;
        // surpassPlayerText.y = 550;
        // this.surpass_player_text = surpassPlayerText;
        // end_screen.addChild(surpassPlayerText);

        // 再玩一次按钮
        const endBtn1 = new egret.Sprite();
        endBtn1.graphics.beginFill(0xff0000, 0);
        endBtn1.graphics.lineStyle(4, 0xffffff);
        endBtn1.graphics.drawRoundRect(0,0,200,70,20,20);
        endBtn1.graphics.endFill();
        endBtn1.touchEnabled = true;
        endBtn1.y = 780;
        endBtn1.x = 100;
        end_screen.addChild(endBtn1);
        endBtn1.once(egret.TouchEvent.TOUCH_BEGIN, this.onBtn1, this);

        const endBtn1Text:egret.TextField = new egret.TextField();
        endBtn1Text.textColor = 0xffffff;
        endBtn1Text.text = '再玩一次'
        endBtn1Text.size = 30;
        endBtn1Text.width = 200;
        endBtn1Text.textAlign = "center";
        endBtn1Text.y = 20;
        endBtn1.addChild(endBtn1Text);

        // 排行榜按钮
        const endBtn2 = new egret.Sprite();
        endBtn2.graphics.beginFill(0xff0000, 0);
        endBtn2.graphics.lineStyle(4, 0xffffff);
        endBtn2.graphics.drawRoundRect(0,0,200,70,20,20);
        endBtn2.graphics.endFill();
        endBtn2.touchEnabled = true;
        endBtn2.y = 780;
        endBtn2.x = GameConfig.getWidth() - 300;
        end_screen.addChild(endBtn2);
        endBtn2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtn2, this);

        const endBtn2Text:egret.TextField = new egret.TextField();
        endBtn2Text.textColor = 0xffffff;
        endBtn2Text.text = '排行榜';
        endBtn2Text.size = 30;
        endBtn2Text.width = 200;
        endBtn2Text.textAlign = "center";
        endBtn2Text.y = 20;
        endBtn2.addChild(endBtn2Text);

        // 更多游戏
        const endBtn3 = new egret.Sprite();
        endBtn3.graphics.beginFill(0xff0000);
        endBtn3.graphics.drawRoundRect(0,0,200,70,20,20);
        endBtn3.graphics.endFill();
        endBtn3.touchEnabled = true;
        endBtn3.y = 650;
        endBtn3.x = GameConfig.getWidth() / 2 - 100;
        endBtn3.width = GameConfig.getWidth();
        end_screen.addChild(endBtn3);
        endBtn3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtn3, this);

        const endBtn3Text:egret.TextField = new egret.TextField();
        endBtn3Text.textColor = 0xffffff;
        endBtn3Text.text = "分享给朋友";
        endBtn3Text.size = 30;
        endBtn3Text.width = 200;
        endBtn3Text.textAlign = "center";
        endBtn3Text.y = 20;
        endBtn3.addChild(endBtn3Text);
    }

	private init(){
        /* 获取游戏分数 */
        const getGameScore = GameConfig.getGameScore();

        /* 更新游戏分数 */
        UserData.upDateScore(Number(getGameScore));
        this.endUi();
    }
	//  排行按钮回调
    private rankCallback(evt:egret.TouchEvent):void {

    }

	//  开始按钮回调
    private startBtnCallback(evt:egret.TouchEvent):void {

    }

    //  help按钮回调
    private helpBtnCallback(evt:egret.TouchEvent):void {

    }
}

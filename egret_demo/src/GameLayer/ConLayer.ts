class ConLayer extends egret.Sprite{
    public constructor(isTime?:boolean){
        super();
        this.init(isTime);
    }
    public time1 = null;
    private con_layer: egret.Sprite;
    private boss: egret.Sprite;
    private game_score: egret.TextField;
    private game_over_text = egret.TextField;

    private BOSS_SHAPE:number       = 1;  // boss的形状 1=方 0=圆 
    private CREAT_RECT_SHAPE:number = 0;  // 新创建的形状 1=方 0=圆
    private SIZE:number             = 80; // 形状的大小
    public GAME_SCORE:string       = "0";// 游戏分数

    /**
     * 游戏结束动画
     */
    private onGameOverText():void {
        let game_over_text:egret.TextField = new egret.TextField();
        game_over_text.textColor = 0xffffff;
        game_over_text.width = GameConfig.getWidth();
        game_over_text.textAlign = "center";
        game_over_text.text = "游 戏 结 束";
        game_over_text.size = 80;
        game_over_text.alpha = 0.6
        game_over_text.bold = true;
        game_over_text.y = -100;
        this.con_layer.addChild(game_over_text);
        
        let tw = egret.Tween.get(game_over_text);
        tw.to({y: 300}, 1.5 * 1000);
        tw.call(() => {
           this.onShowEndScreen();
        });
    }

    /**
     * 隐藏游戏界面，显示游戏结束
     */
    private onShowEndScreen():void {
        let tw = egret.Tween.get(this.con_layer);
        tw.to({y: -GameConfig.getHeight(), alpha: 0}, 0.5 * 1000);
        tw.call(() => {
            console.log('显示游戏结束界面');
            this.removeChildren();
            
            // 动画结束显示结束
            const event:GameEvent = new GameEvent(GameEvent.GAME_OVER);
            this.dispatchEvent(event);
        });
    }

    /**
     * 计算游戏分数
     */
    private onAddGameScore():void {
        let new_score = String(Number(this.GAME_SCORE) + 1);
        this.GAME_SCORE = new_score;
        this.game_score.text = new_score;
    }

    /**
     * 创建新形状
     */
    private onCreatShape():void {
        const randow = Math.round(Math.random());
        let new_shape = new egret.Sprite();
        new_shape.graphics.beginFill(0xffffff);
        // 这里有问题
        if(randow === 0){
            new_shape.graphics.drawCircle(GameConfig.getWidth() / 2, -this.SIZE, this.SIZE);
            new_shape["shapeType"] = 0;
        }else{
            new_shape.graphics.drawRect(GameConfig.getWidth() / 2 - this.SIZE , -this.SIZE * 2, this.SIZE * 2, this.SIZE * 2);
            new_shape["shapeType"] = 1;
        }

        new_shape.graphics.endFill();
        console.log(new_shape);
        this.con_layer.addChild(new_shape);
        let tw = egret.Tween.get(new_shape);
        tw.to({y: 800 - this.SIZE}, 1 * 1000);
        tw.call((e)=>{
            if(this.BOSS_SHAPE === new_shape["shapeType"]){
                // new_shape.alpha = 0;
                // this.con_layer.removeChild(new_shape);
                eKit.removeChild(new_shape);
                this.onAddGameScore();
                // let sound:egret.Sound = RES.getRes("point_mp3");
                // sound.play(0,1);
            }else{
                console.log('结束');
                clearInterval(this.time1); // 取消创建
                this.onGameOverText(); // 游戏结束动画
                this.setGameScore(); // 设置分数

                let sound:egret.Sound = RES.getRes("over_mp3");
                sound.play(0,1);

                // 触发现实结束界面
                // const event:GameEvent = new GameEvent(GameEvent.GAME_OVER);
                // this.dispatchEvent(event);
            }
        });
    }

    /**
     * 设置分数
     */
    private setGameScore() {
        GameConfig.setGameScore(this.GAME_SCORE); // 设置分数到全局
        
        // 设置最高分
        const higt_score = localStorage.getItem("high_score")
        if(higt_score !== null){
            if(higt_score < this.GAME_SCORE){
                localStorage.setItem("high_score", this.GAME_SCORE);
            }
        }else{
            localStorage.setItem("high_score", this.GAME_SCORE);
        }
    }

    /**
     * 开始创建元素
     */
    private onStartCreatShape() {
        // 定时创建新形状
        this.time1 = setInterval(() => {
            this.onCreatShape();
        }, 1 * 1000);
        // this.onCreatShape();
    }

    private onBossTouchBegin(evt:egret.TouchEvent):void {
        this.BOSS_SHAPE = 0; // 圆
        this.boss.alpha = 0;
    }

    private onBossTouchEnd(evt:egret.TouchEvent):void {
        this.BOSS_SHAPE = 1; // 方
        this.boss.alpha = 1;
    }

    private init(isTime:boolean):void {
        const con_layer = new egret.Sprite();
        con_layer.graphics.beginFill(GameConfig.getGameColor());
        con_layer.graphics.drawRect(0, 0, GameConfig.getWidth(), GameConfig.getHeight());
        con_layer.graphics.endFill();
        this.con_layer = con_layer;
        this.addChild(con_layer);
        
        // 中间的线
        const line = new egret.Shape();
        line.graphics.lineStyle(10, 0xffffff);
        line.graphics.moveTo(GameConfig.getWidth() / 2, 0);
        line.graphics.lineTo(GameConfig.getWidth() / 2, GameConfig.getHeight());
        line.graphics.endFill();
        con_layer.addChild(line);
        
        // 分数
        let game_score:egret.TextField = new egret.TextField();
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
        const boss_c = new egret.Sprite();
        boss_c.graphics.beginFill(0xffffff);
        boss_c.graphics.drawCircle(GameConfig.getWidth() / 2, 800, this.SIZE);
        boss_c.graphics.endFill();
        con_layer.addChild(boss_c);

        // 方
        const boss = new egret.Sprite();
        boss.graphics.beginFill(0xffffff);
        boss.graphics.drawRect(GameConfig.getWidth() / 2 - this.SIZE , 800 - this.SIZE, this.SIZE * 2, this.SIZE * 2);
        boss.graphics.endFill();
        boss.touchEnabled = true;
        this.boss = boss;
        con_layer.addChild(boss);
        
        /* 触摸开始 */
        boss.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBossTouchBegin, this);
        /* 触摸结束 */
        boss.addEventListener(egret.TouchEvent.TOUCH_END, this.onBossTouchEnd, this);
        /* 触摸移除释放 */
        boss.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBossTouchEnd, this);

        if(isTime){
            this.onStartCreatShape();
        }
        
    }
}
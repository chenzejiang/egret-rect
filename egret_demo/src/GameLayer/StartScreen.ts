class StartScreen extends egret.Sprite{
	public constructor() {
		super();
		this.init();
	}
	private start_screen:egret.Sprite;
	private hideStartScreen(evt:egret.TouchEvent):void  {
		var tw = egret.Tween.get( this.start_screen );
		tw.to( {y: -GameConfig.getHeight(), alpha: 1}, 0.5 * 1000).call(function(){
			// this.removeChildren();
			console.log('完成');
		});
		tw.call(() => {
			const event:GameEvent = new GameEvent(GameEvent.GAME_GO);
			this.dispatchEvent(event);
		});
	}

	private init(){
		let start_screen = new egret.Sprite();
		start_screen.graphics.beginFill(0x000000, 0.5);
		start_screen.graphics.drawRect(0, 0, GameConfig.getWidth(), GameConfig.getHeight());
		start_screen.graphics.endFill();
		start_screen.touchEnabled = true;
		this.start_screen = start_screen;
		this.addChild( start_screen );
		start_screen.once(egret.TouchEvent.TOUCH_BEGIN, this.hideStartScreen, this);

		let gameDetailText:egret.TextField = new egret.TextField();
		gameDetailText.textColor = 0xffffff;
		gameDetailText.width = GameConfig.getWidth();
		gameDetailText.textAlign = "center";
		gameDetailText.text = "点击方形即可变圆\n松开即变回方形";
		gameDetailText.size = 50;
		gameDetailText.lineSpacing = 15;
		gameDetailText.bold = true;
		gameDetailText.y = 500;
		start_screen.addChild(gameDetailText);

		let startGameText:egret.TextField = new egret.TextField();
		startGameText.textColor = 0xffffff;
		startGameText.width = GameConfig.getWidth();
		startGameText.textAlign = "center";
		startGameText.text = "点击开始";
		startGameText.size = 60;
		startGameText.bold = true;
		startGameText.y = 1000;
		start_screen.addChild(startGameText);
	}
}

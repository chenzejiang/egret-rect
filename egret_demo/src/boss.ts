class Boss extends egret.Shape{
    public constructor(boss_type:number){
        super();
        this.init(boss_type);
    }
    // private 
    private init(boss_type:number = 0){
        console.log(boss_type + 'boss');
        var boss = new egret.Shape();
        if(boss_type === 0){
            // var boss:egret.Sprite = new egret.Sprite();
            // boss.graphics.beginFill( 0xffffff );
            // boss.graphics.drawRect(GameConfig.getWidth() / 2 - 80 , 800, 160, 160);
            // boss.graphics.endFill();
        }else{
            // var boss = new egret.Shape();
            // boss.graphics.beginFill( 0xffffff);
            // boss.graphics.drawCircle(375, 800, 80);
            // boss.graphics.endFill();
        }
        // boss.touchEnabled = true;
        // this.addChild( boss );
    }
}
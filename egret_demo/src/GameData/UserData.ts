class UserData {
    public static personalHighScore: any; // 分数
    public static prefetchHighScoreFailed: boolean; // 标志

    private static openId: string;
    private static id: string;
    private static avatarUrl: string;
    private static nickName: string;
    private static city: string;
    private static country: string;
    private static gender: string;
    public static userInfo: {};

    public static getId(){
        return this.id;
    }

    public static getUserData(){
        return JSON.parse(JSON.stringify(this.userInfo));
    }

    /**
     * 设置微信开放数据域数据
     */
    public static wxSetUserCloudStorage(score:string = '0') {
        wx.setUserCloudStorage({
            KVDataList: [{ key: 'score', value: score }],
            success: res => {
                console.log('主域更新开放作用域数据成功',res);
                // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
                // let openDataContext = wx.getOpenDataContext();
                // openDataContext.postMessage({
                //     type: 'updateMaxScore',
                // });
            },
            fail: res => {
                return res;
            }
        });
    }

    public static setUserData(userData:{avatarUrl, nickName, gender, openId, city, country}){
        this.avatarUrl = userData.avatarUrl;
        this.openId = userData.openId;
        this.nickName = userData.nickName;
        this.gender = userData.gender;
        this.city = userData.city;
        this.country = UserData.country;
        this.userInfo = userData;
    }

    /**
     * 上传结果到微信云数据库
     */
    public static upDateScore($score:number) {
        wx.cloud.callFunction({
            name: 'uploadScore',
            data: {
                score: $score
            }
        }).then((res) => {
            console.log('上传成绩到云数据成功：', res);
        }).catch((err) => {
            console.error('云函数更新成绩失败：', err)
        });
    }
    /**
     * 通过云开发数据库 获取历史最高分
     */
    public static prefetchHighScore() {
        GameConfig.getDB().collection('score').doc(`${localStorage.getItem('openId')}-score`).get()
        .then((res) => {
            console.log(res);
            this.personalHighScore = res.data.max;
        })
        .catch((err) => {
            console.error('db get score catch error', err);
            this.prefetchHighScoreFailed = true
        });
    }

    /**
     * 登陆获取openid
     */
    public static getOpenId() {
        wx.cloud.callFunction({
            name: "login",
            success: res => {
                console.log('getOpenId',res);
                window["openid"] = res.result.openid;
                localStorage.setItem('openId', res.result.openid);
                UserData.prefetchHighScore();
            },
            fail: err => {
                console.log('get openid failed with error', err)
            }
        })
    }
    /**
     * 用户点击主域分享按钮
     */
    public static shareAppMessage() {
        wx.shareAppMessage
        ({
            title: `我方了 ---- 我取得了${ GameConfig.getGameScore() }分, 快来挑战我吧！`,
            imageUrl: GameConfig.getShareImg(),
            imageUrlId:  GameConfig.getShareImgId(),
            query: ``, // 传参
            success: function success(res) {
                console.log("分享成功", res);
            },
            fail: function fail(res) {
                console.log("分享失败", res);
            }
        });
    }
}


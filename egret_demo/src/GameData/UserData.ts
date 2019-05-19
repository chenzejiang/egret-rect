class UserData {
    public static personalHighScore: boolean; // 分数
    public static prefetchHighScoreFailed: boolean; // 标志

    private static openId:string;
    private static id:string;
    private static avatarUrl:string;
    private static nickName:string;
    private static city:string;
    private static country:string;
    private static gender:string;
    public static userInfo: {};

    public static getId(){
        return this.id;
    }

    public static getUserData(){
        return JSON.parse(JSON.stringify(this.userInfo));
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
     * 更新数据到数据库
     */
    public static upDateScore($score:number) {
        // 上传结果
        // 调用 uploadScore 云函数
        wx.cloud.callFunction({
            name: 'uploadScore',
            // data 字段的值为传入云函数的第一个参数 event
            data: {
                score: $score
            },
            success: res => {
                if (this.prefetchHighScoreFailed) {
                    this.prefetchHighScore()
                }
            },
            fail: err => {
                console.error('云函数更新成绩失败：', err)
            }
        });
    }
    /**
     * 获取历史最高分
     */
    public static prefetchHighScore() {
        GameConfig.getDB().collection('score').doc(`${localStorage.getItem('openId')}-score`).get()
        .then(res => {
            if (this.personalHighScore) {
                if (res.data.max > this.personalHighScore) {
                    this.personalHighScore = res.data.max;
                    console.log(this.personalHighScore);
                }
            } else {
                this.personalHighScore = res.data.max
            }
        })
      .catch(err => {
        console.error('db get score catch error', err)
        this.prefetchHighScoreFailed = true
      })
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
}


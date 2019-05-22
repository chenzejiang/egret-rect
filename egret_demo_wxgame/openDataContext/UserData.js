class UserData {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * 获取好友排行榜数据
     */
     getFriendStorage() {
        return new Promise((resolve, reject) => {
            wx.getFriendCloudStorage({
                keyList: ["score"],
                success: res => {
                    resolve(res);
                },
                fail: err => {
                    reject(err);
                },
                complete: res => {

                }
            })
        })
    }
    /**
     * 获取当前用户托管数据当中对应 key 的数据。该接口只可在开放数据域下使用
     */
    getUserCloudStorage() {
        return new Promise((resolve, reject) => {
            wx.getUserCloudStorage({
                keyList: ["score"],
                success: res => {
                    resolve(res);
                },
                fail: err => {
                    reject(err);
                },
                complete: res => {

                }
            })
        })
    }
    getFriendRanking() {
        return this.getFriendStorage();
        // let result = null;
        // await this.getFriendStorage()
        //     .then(res => { result = res })
        //     .catch(err => { console.warn(err) });
        // this.friendRanking = result || [];
        // return result;
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
export default UserData

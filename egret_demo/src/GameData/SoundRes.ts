// 音频资源配置JSON

class SoundRes {
    // 定义事件音乐路径，Mp3.playEvent调用name即可播放对应path的音乐
    public static eventSoundList = [
        { name: 'bgm_default', path: 'resource/assets/mp3/bgm_default.mp3' },
        { name: 'bgm_game', path: 'resource/assets/mp3/bgm_game2.mp3' },
        // 高频音效可填写cnt字段，多音轨队列播放，cnt表示队列容量
        { name: 'hit', path: 'resource/assets/mp3/hit.mp3' ,cnt:10},
    ];

    // // 定义背景音乐路径
    // public static bgm:string = 'resource/assets/BgM/game_music.mp3'
}
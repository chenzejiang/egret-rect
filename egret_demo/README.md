PS：
在本地运行一个http服务并在浏览器打开
egret startserver -a



1、开启自动编译(推荐)
egret run -a

2、开启自动刷新页面

npm install -g browser-sync
browser-sync start --server --files "bin-debug/**"

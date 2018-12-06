//app.js
App({
  onLaunch: function () {
    //背景音乐
    this.bgMusic(0);

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onLoad: function () {
    //背景音乐
    this.bgMusic(0);
    
  },
  onShow: function () {
    var that = this;
    //背景音乐
    this.bgMusic(0);
    wx.getSystemInfo({
      success: function (res) {
        if (res.system.split(' ')[0] == 'Android') {
          that.bgMusic(0);
        }
      },
    })
  },
  onHide: function () {
    this.bgMusic(1);
  },
  globalData: {
    userInfo: null,
    resStauts: 0,
    resHZStauts: 0,
    test: 10,
    grade: 0, //星星，快速通道成绩
    gradeHZ: 0 //护资考试成绩
  },
  bgMusic: function (status) {
    //背景音乐--另外后台播放音乐必须去app.json里面设置--"requiredBackgroundModes": ["audio"]
    var back = wx.getBackgroundAudioManager(); 
    if (status == 1) {
      //暂停
      back.pause();
      console.log('pause');
    } else {
      //播放
      back.title = 'string';//必须设置，backgroundAudioManager.title = 'string或者空格';否则iOS没有声音
      back.src = 'https://yhzj.oss-cn-shanghai.aliyuncs.com/xiaochengxu/bgMusic.mp3';
      back.play();
      console.log('play');
    }
  },
  chooseMusic: function (status) {
    //背景音乐--另外后台播放音乐必须去app.json里面设置--"requiredBackgroundModes": ["audio"]
    var back = wx.getBackgroundAudioManager();
    if (status == 1) {
      //答错
      back.title = 'string';//必须设置，backgroundAudioManager.title = 'string或者空格';否则iOS没有声音
      back.src = 'https://yhzj.oss-cn-shanghai.aliyuncs.com/xiaochengxu/errMusic.mp3';
      back.play();
    } else {
      //答对
      back.title = 'string';//必须设置，backgroundAudioManager.title = 'string或者空格';否则iOS没有声音
      back.src = 'https://yhzj.oss-cn-shanghai.aliyuncs.com/xiaochengxu/rightMusic.mp3';
      back.play();
    }
  }
})
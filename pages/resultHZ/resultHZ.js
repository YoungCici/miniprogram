// pages/resultHZ/resultHZ.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    nickName: '微信昵称',
    swScore: 0,
    sjScore: 0,
    contentWord: '5年后可能到达人生巅峰，做到护士长，工资高达30000元哟!',
    saveShow:false,

    windowWidth: 0, // 可使用窗口宽度
    windowHeight: 0, // 可使用窗口高度
    ratio: 0 // 根据尺寸动态计算 1px换算成多少rpx
  },
  //重新答题
  toRestart: function () {
    app.bgMusic(0);
    app.globalData.resHZStauts = 0;
    app.globalData.test = 10;
    app.globalData.gradeHZ = 0;
    wx.navigateTo({
      url: '../introduction/introduction',
    })
  },
  //保存为图片
  textToImg: function () {
   var _this = this;
   _this.setData({
     saveShow:true,
   })
    _this.canvasimg(); 
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.globalData.resHZStauts = 1;
    wx.setNavigationBarTitle({
      title: '2019护资考试', //页面标题为路由参数
    })

    wx.getUserInfo({
      success: function (res) {
        app.globalData.userInfo = res.userInfo
        that.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      },
    });



    if (app.globalData.gradeHZ == 0 || app.globalData.gradeHZ == 1 || app.globalData.gradeHZ == 2) {
      that.setData({
        swScore: '340',
        sjScore: '338',
        contentWord: '五年后，将荣升为当地知名三甲医院的内科护士长，年薪30万妥妥的，如果你认识她，快请他吃饭吧ヽ(✿ﾟ▽ﾟ)ノ'
      })

    } else if (app.globalData.gradeHZ == 3 || app.globalData.gradeHZ == 4) {
      that.setData({
        swScore: '355',
        sjScore: '341',
        contentWord: '三年后，我的护理事业绝不仅仅止于护理部主任，过护考后每月收入超过2万非常轻松，实至名归的潜力股，抓紧投资我吧╰(*°▽°*)╯'
      })


    } else if (app.globalData.gradeHZ == 5 || app.globalData.gradeHZ == 6) {
      that.setData({
        swScore: '366',
        sjScore: '358',
        contentWord: '不久的将来，将成为三甲医院抢着要的“香饽饽”外科护理部主任，月薪4万没问题，朋友坐席空隙，你还不来？︿(￣︶￣)︿'
      })


    } else if (app.globalData.gradeHZ == 7 || app.globalData.gradeHZ == 8) {
      that.setData({
        swScore: '371',
        sjScore: '368',
        contentWord: '三年后，一定将感谢现在的努力，发达城市的知名三甲医院院长非你莫属 月薪将超过5万，友谊升华？抓紧啦(￣_,￣ )'
      })

    } else {
      that.setData({
        swScore: '378',
        sjScore: '373',
        contentWord: '5年后你将可能成为市三甲医院院长，年薪100万起步，简直是人生赢家啊，赶紧来抱大腿吧φ(≧ω≦*)♪'
      })
    }
    
  },


  
  saveup: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        saveShow: false,
      })
    }, 100)
  },





  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取系统信息
    wx.getSystemInfo({
      success: res => {
        console.log(res);
        this.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
        });
        this.setData({
          // 屏幕宽度 375px = 750rpx，1px=2rpx
          // 1px = （750 / 屏幕宽度）rpx；
          // 1rpx = （屏幕宽度 / 750）px;
          ratio: 750 / this.data.windowWidth
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.bgMusic(0);
    var that = this;
    //背景音乐
    wx.getSystemInfo({
      success: function (res) {
        if (res.system.split(' ')[0] == 'Android') {
          app.bgMusic(0);
        }
      },
    }) 
  },


  canvasimg:function(){
    // canvas保存图片
    // 保存图片
    var _this = this;
    //2. canvas绘制文字和图片
    const ctx = wx.createCanvasContext('myCanvas', this);
    //产品图
    var imgPath = 'savebg.png';

    var xcxcode = "qrcode.png";

    var widht = '';
    var hieght = '';
    var rpx = 1;
    //获取设备信息
    wx.getSystemInfo({
      success: function (res) {
        rpx = res.windowWidth / 375;
        widht = res.screenWidth;
        hieght = res.screenHeight;
        _this.setData({
          canvasWidth: res.screenWidth,
          canvasHeight: res.screenHeight,
        })
      }
    })

    





    // 获取用户信息

    var uesrInfos = app.globalData.userInfo;
    // var imgwx = uesrInfos.avatarUrl;
    var namewx = uesrInfos.nickName;
    //var namewx = that.data.nickName
    console.log(uesrInfos)
    //绘制背景颜色
    ctx.setFillStyle('#ffffff')
    ctx.fillRect(0, 0, 375 * rpx, hieght * rpx)
    //绘制背景图
    ctx.drawImage(imgPath, 0, 0, 375 * rpx, 660 * rpx);
    
    
    // 添加微信头像信息

    //绘制介绍产品
    ctx.setFontSize(16);
    ctx.setFillStyle('#000');
    // 绘制昵称
    var text = namewx;
    // 绘制昵称
    let txtWidth = ctx.measureText(text).width;
    let canvasWidthPx = 700 / _this.data.ratio;
    console.log(txtWidth, canvasWidthPx)
    // 绘制居中文本：这个地方的 (x, y)的坐标是在文本的左下角位置
    ctx.fillText(text, (canvasWidthPx - txtWidth) / 2, 140 * rpx);
    // ctx.fillText(namewx, 180, 140);
    

    // // 专业实务
    // ctx.setFontSize(24);
    // ctx.setFillStyle('red');
    // ctx.fillText(that.data.swScore, 110, 275)





    if (app.globalData.gradeHZ == 0 || app.globalData.gradeHZ == 1 || app.globalData.gradeHZ == 2) {
      _this.setData({
        swScore: '340',
        sjScore: '338',
        contentWord: '五年后，将荣升为当地知名三甲医院的内科护士长，年薪30万妥妥的，如果你认识她，快请他吃饭吧ヽ(✿ﾟ▽ﾟ)ノ'
      })

      ctx.setFontSize(24);
      ctx.setFillStyle('red');
      ctx.fillText(340, 110 * rpx, 275 * rpx)

      // 时间能力
      ctx.setFontSize(24);
      ctx.setFillStyle('red');
      ctx.fillText(338, 230 * rpx, 275 * rpx)

      // 专家说你！
      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      ctx.fillText('五年后，将荣升为当地知', 110 * rpx, 350 * rpx)

      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      ctx.fillText('名三甲医院的内科护士长，年', 80 * rpx, 370 * rpx);

      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      ctx.fillText('薪30万妥妥的，如果你认识', 80 * rpx, 390 * rpx);

      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      ctx.fillText('她，快请他吃饭吧ヽ(✿ﾟ▽ﾟ)ノ', 80 * rpx, 410 * rpx);

      

    } else if (app.globalData.gradeHZ == 5 || app.globalData.gradeHZ == 6) {
      _this.setData({
        swScore: '366',
        sjScore: '358',
        contentWord: '不久的将来，将成为三甲医院抢着要的“香饽饽”外科护理部主任，月薪4万没问题，朋友坐席空隙，你还不来？︿(￣︶￣)︿'
      })

      ctx.setFontSize(24);
      ctx.setFillStyle('red');
      ctx.fillText(366, 110 * rpx, 275 * rpx)

      // 时间能力
      ctx.setFontSize(24);
      ctx.setFillStyle('red');
      ctx.fillText(358, 230 * rpx, 275 * rpx)

      // 专家说你！
      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      //11
      ctx.fillText('不久的将来，将成为三甲', 110 * rpx, 350 * rpx)

      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      //13
      ctx.fillText('医院抢着要的“香饽饽”外科', 80 * rpx, 370 * rpx);

      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      ctx.fillText('护理部主任，月薪4万没问题', 80 * rpx, 390 * rpx);

      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      ctx.fillText('，朋友坐席空隙，你还不来？', 80 * rpx, 410 * rpx);

      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      ctx.fillText('︿(￣︶￣)︿', 95 * rpx, 430 * rpx);


    } else if (app.globalData.gradeHZ == 7 || app.globalData.gradeHZ == 8) {
      _this.setData({
        swScore: '371',
        sjScore: '368',
        contentWord: '三年后，一定将感谢现在的努力，发达城市的知名三甲医院院长非你莫属 月薪将超过5万，友谊升华？抓紧啦(￣_,￣ )'
      })

      ctx.setFontSize(24);
      ctx.setFillStyle('red');
      ctx.fillText(371, 110 * rpx, 275 * rpx)

      // 时间能力
      ctx.setFontSize(24);
      ctx.setFillStyle('red');
      ctx.fillText(368, 230 * rpx, 275 * rpx)


      // 专家说你！
      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      //11
      ctx.fillText('三年后，一定将感谢现在', 110 * rpx, 350 * rpx)

      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      //13
      ctx.fillText('的努力，发达城市的知名三甲', 80 * rpx, 370 * rpx);

      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      ctx.fillText('医院院长非你莫属 月薪将超', 80 * rpx, 390 * rpx);

      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      ctx.fillText('过5万，友谊升华？抓紧啦', 80 * rpx, 410 * rpx);

      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      ctx.fillText('(￣_,￣ )', 95 * rpx, 430 * rpx);



    } else {
      _this.setData({
        swScore: '378',
        sjScore: '373',
        contentWord: '5年后你将可能成为市三甲医院院长，年薪100万起步，简直是人生赢家啊，赶紧来抱大腿吧φ(≧ω≦*)♪'
      })
      ctx.setFontSize(24);
      ctx.setFillStyle('red');
      ctx.fillText(378, 110 * rpx, 275 * rpx)

      // 时间能力
      ctx.setFontSize(24);
      ctx.setFillStyle('red');
      ctx.fillText(373, 230 * rpx, 275 * rpx)


      // 专家说你！
      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      //11
      ctx.fillText('5年后你将可能成为市三', 110 * rpx, 350 * rpx)

      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      //13
      ctx.fillText('甲医院院长，年薪100万', 80 * rpx, 370 * rpx);

      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      ctx.fillText('起步，简直是人生赢家啊，', 80 * rpx, 390 * rpx);

      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      ctx.fillText('赶紧来抱大腿吧φ(≧ω≦*)♪', 80 * rpx, 410 * rpx);

      ctx.setFontSize(16);
      ctx.setFillStyle('#000');
      ctx.fillText('(￣_,￣ )', 95 * rpx, 430 * rpx);
     
    }

    ctx.drawImage(xcxcode, 277 * rpx, 582 * rpx, 78, 78);

    
    // var link1 = imgwx;
    // _this.circeImg(ctx, link1, 152, 97, 30)
      ctx.draw();
      setTimeout(function(){
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          canvasId: 'myCanvas',
          success: function (res) {
            if (res.errMsg == 'canvasToTempFilePath:ok') {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
              })
              var gohansu = _this.saveup();
              wx.showToast({
                title: '存图成功',
              })
            }
          }
        })
      },1000)
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  // 分享成功显示
  shareOk(){
    var _this = this;
    setTimeout(function () {
     
    }, 1000)
  },
  // 分享成功点击关闭
  shareoff(){
    var _this = this;
    _this.setData({
      isShow: false,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var _this = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: '我刚预测了2019护考成绩，轻松过的秘诀在这里……',
      path: 'pages/index/index',
      success: function (opt) {
        _this.shareOk();
        //转发成功
        console.log("转发成功：" + JSON.stringify(opt));
      },
      fail: function (err) {
        //转发失败
        console.log("转发失败：" + JSON.stringify(err));
      }
    }
  }
})
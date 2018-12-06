// pages/result/result.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    one_2: 0, //答对
    two_2: 5, //总数-答对
    start0: 'https://yhzj.oss-cn-shanghai.aliyuncs.com/xiaochengxu/star0.png',
    start1: 'https://yhzj.oss-cn-shanghai.aliyuncs.com/xiaochengxu/star1.png',
    resText: '',
    isShow: false,
  },
  //星星
  in_xin: function (e) {
    if (app.globalData.grade % 2 === 0) {
      this.setData({
        one_2: app.globalData.grade / 2,
        two_2: 5 - app.globalData.grade / 2
      })
    } else {
      this.setData({
        one_2: (app.globalData.grade + 1) / 2,
        two_2: 5 - (app.globalData.grade + 1) / 2
      })
    }
    if (app.globalData.grade / 2 === 0 || app.globalData.grade / 2 === 1) {
      this.setData({
        resText: '报名和旅游可不一样，走马观花不适合鸭'
      })
    } else if (app.globalData.grade / 2 === 2) {
      this.setData({
        resText: 'emmm,要认真填写资料才能参加护士考试哟'
      })
    } else if (app.globalData.grade / 2 === 3) {
      this.setData({
        resText: '做事严谨细心，就好比你的人生态度，继续加油吧'
      })
    } else if (app.globalData.grade / 2 === 4) {
      this.setData({
        resText: '啧啧啧 你这种细心程度，报名就是分分钟的事情'
      })
    } else {
      this.setData({
        resText: '如此优秀的你，真让所有人敬佩呀，护考报名数你最棒'
      })
    }
  },
  //2019护资考试入口
  toHZKS: function () {
    app.globalData.resHZStauts = 0;
    app.globalData.test = 10;
    app.globalData.grade = 0;
    app.globalData.gradeHZ = 0;
    wx.navigateTo({
      url: '../introduction/introduction',
    })
  },
  //重新答题
  toRestart: function () {
    app.bgMusic(0);
    app.globalData.resStauts = 0;
    app.globalData.test = 10;
    app.globalData.grade = 0;
    app.globalData.gradeHZ = 0;
    wx.navigateTo({
      url: '../pass/pass',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.globalData.resStauts = 1;
    wx.setNavigationBarTitle({
      title: '护考报名模拟', //页面标题为路由参数
    })
    that.in_xin();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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


  shareOk() {
    var _this = this;
    _this.setData({
      isShow: true,
    })
  },
  // 分享成功点击关闭
  shareoff() {
    var _this = this;
    _this.setData({
      isShow: false,
    })
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
      title: '护士报名流程需要的材料太多了，缺这一点就不能报名了',
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
// pages/shouye/index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  toKSTD: function () {
    //判断用户是否授权
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.reLaunch({
            url: '../pass/pass',
          })
        } else {
          //用户按了拒绝按钮
          // wx.showModal({
          //   title: '温馨提示',
          //   content: '您点击了拒绝授权，将无法进入考试系统哦!!!',
          //   showCancel: false,
          //   confirmText: '确定',
          //   success: function (res) {
          //     if (res.confirm) {
          //       console.log('用户点击了“返回授权”')
          //     }
          //   }
          // })
        }
      }
    })
  },
  toHZKS: function () {
    //判断用户是否授权
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.reLaunch({
            url: '../introduction/introduction',
          })
        } else {
          //用户按了拒绝按钮
          // wx.showModal({
          //   title: '温馨提示',
          //   content: '您点击了拒绝授权，将无法进入考试系统哦!!!',
          //   showCancel: false,
          //   confirmText: '确定',
          //   success: function (res) {
          //     if (res.confirm) {
          //       console.log('用户点击了“返回授权”')
          //     }
          //   }
          // })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.bgMusic(0);
    app.globalData.resStauts = 0;
    app.globalData.resHZStauts = 0;
    app.globalData.test = 10;
    app.globalData.grade = 0;
    app.globalData.gradeHZ = 0;
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
    app.globalData.resStauts = 0;
    app.globalData.resHZStauts = 0;
    app.globalData.test = 10;
    app.globalData.grade = 0;
    app.globalData.gradeHZ = 0;
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
  onShareAppMessage: function () {

  }
})
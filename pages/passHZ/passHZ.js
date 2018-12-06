//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    arr_: '',
    answers: '',
    answerId: '',
    status: -1,
    color_: '#000',
    answerLength: 0,
    passImg: 1,
    isShow: false,
    content: '这您都知道，简直不要太优秀',
    analysis: '解析：正确答案A',
    answer: '解析内容',
    isShowerr: false,
    isShowsx: false,
    isShowerrqun: false,
    coatFatThinColor: 'https://yhzj.oss-cn-shanghai.aliyuncs.com/xiaochengxu/errTip.png',
    // btnShare:'https://yhzj.oss-cn-shanghai.aliyuncs.com/xiaochengxu/toHelp.png',
    nextBG: 'https://yhzj.oss-cn-shanghai.aliyuncs.com/xiaochengxu/nextBtn.png',
    imgLabel: 1,
    err_ten:'https://yhzj.oss-cn-shanghai.aliyuncs.com/xiaochengxu/nextBtn2.png',

    // 对错颜色区分
    postList: '',
    answers: '',
    index: 0,
    bc_default: '#000000',
    bc_right: '#0f8325',
    bc_wrong: '#e80000',
    bcA: '',
    bcB: '',
    bcC: '',
    bcD: '',
    bcE: '',
  },
  //事件处理函数
  passRight: function (e) {
    var that = this;

    var select = e.currentTarget.id;
    var postList = that.data.postList;
    var jieg = postList[that.data.index].answer;
    var ids = postList[that.data.index].answers;
    var a0 = ids[0].id;
    var a1 = ids[1].id;
    var a2 = ids[2].id;
    var a3 = ids[3].id;
    var a4 = ids[5 - 1].id;


    var answerslb = that.data.answers;
    for (var i = 0; i < answerslb.length; i++) {
      if (that.data.answers[i].id == that.data.answerId) {
        that.setData({
          analysis: '解析：正确答案' + that.data.answers[i].label + '',
        })
      }
    }
    if (select === that.data.answerId) {
      console.log('right');

      if (that.data.index < postList.length - 1) {
        if (select == a0) {
          this.setData({ bcA: that.data.bc_right });
        }
        else if (select == a1) {
          this.setData({ bcB: that.data.bc_right });
        }
        else if (select == a2) {
          this.setData({ bcC: that.data.bc_right });
        }
        else if (select == a3) {
          this.setData({ bcD: that.data.bc_right });
        }
        else if (select == a4) {
          this.setData({ bcE: that.data.bc_right });
        }
      }
      else {
        if (select == a0) {
          this.setData({ bcA: that.data.bc_right });
        }
        else if (select == a1) {
          this.setData({ bcB: that.data.bc_right });
        }
        else if (select == a2) {
          this.setData({ bcC: that.data.bc_right });
        }
        else if (select == a3) {
          this.setData({ bcD: that.data.bc_right });
        }
        else if (select == a4) {
          this.setData({ bcE: that.data.bc_right });
        }
      }


      app.globalData.gradeHZ++;
      //背景播放状态--0为播放，1为暂停
       that.showDialog();
      //对错播放状态--0为答对，1为答错
      setTimeout(function () {
        app.bgMusic(1);
        app.chooseMusic(0);
      }, function () {
        this.pop;
      }, 1000);
      // that.setData({
      //   key: i,
      //   color_: "#0f8325"
      // })
    } else {
      console.log('wrong');

      if (select == a0) {
        this.setData({ bcA: that.data.bc_wrong });
      }
      else if (select == a1) {
        this.setData({ bcB: that.data.bc_wrong });
      }
      else if (select == a2) {
        this.setData({ bcC: that.data.bc_wrong });
      }
      else if (select == a3) {
        this.setData({ bcD: that.data.bc_wrong });
      }
      else if (select == a4) {
        this.setData({ bcE: that.data.bc_wrong });
      }


     that.errshowDialog();
      //对错播放状态--0为答对，1为答错
      setTimeout(function () {
        app.bgMusic(1);
        app.chooseMusic(1);
      }, function () {
        this.pop;
      }, 1000)
    }
  },
  // 下一步函数
  next() {
    var that = this;

    var postList = that.data.postList;
    if (that.data.index < postList.length - 1) {
      this.setData({
        index: that.data.index + 1,
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
        bcD: that.data.bc_default,
        bcE: that.data.bc_default
      });
    }

    app.bgMusic(0);
    app.globalData.test--;
    var indexs = that.answerLength - app.globalData.test;
    if (indexs === 10) {
      wx.navigateTo({
        url: '../resultHZ/resultHZ',
      })
    } else if (indexs === 9) {
      that.setData({
        content: '答题完成,点击可查看成绩单',
        // 第10题打错提示
        nextBG: 'https://yhzj.oss-cn-shanghai.aliyuncs.com/xiaochengxu/look1.png',
        err_ten:'https://yhzj.oss-cn-shanghai.aliyuncs.com/xiaochengxu/look2.png'
      })
    }
    that.test(indexs);
  },
  test: function (index) {
    var that = this;
    app.bgMusic(0);
    wx.request({
      // url: 'https://cdn.yihuzhijia.cn/exam/3fde4f83c7ab4ddb82ce6162fa2c4c4d.json',
      url: 'https://v2.api.yihuzhijia.cn/applet/exam',
      header: {
        "Content-Type": "application/json"
      },
      success: function (e) {
        console.log(e);
        var arr = e.data.value;
        that.setData({
          postList: arr,
          title: arr[index].content,
          answers: arr[index].answers,
          answerId: arr[index].answer,
          arr_: e.data,
          answer: arr[index].analysis,
          passImg: arr[index].label
        });
        that.answerLength = arr.length;
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '2019年护资考试', //页面标题为路由参数
    })
    that.test(0);
    //分享
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  //回答正确展示弹框
  showDialog() {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        isShow: true,
      });
    }, 500)
  },

  // 回答正确分享好友弹框
  showDialogsx() {
    var _this = this;
    setTimeout(function(){
      _this.setData({
        isShowsx: true,
      });
    },1000)
  },
  // 回答错误显示tips
  errshowDialog() {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        isShowerr: true,
        coatFatThinColor: 'https://yhzj.oss-cn-shanghai.aliyuncs.com/xiaochengxu/errTip.png'
      });
    }, 500)
  },
  errshowDialogqun() {
    this.setData({
      isShowerrqun: true,
      coatFatThinColor: 'https://yhzj.oss-cn-shanghai.aliyuncs.com/xiaochengxu/includeTip.png'
    });
  },
  //回答正确下一步
  _confirmEvent() {
    console.log('你点击了确定');
    this.setData({
      isShow: false
    })
    this.next();
  },

  _confirmEventsx() {
    console.log('你点击了确定');
    this.setData({
      isShowsx: false
    })
    this.next();
  },
  //触发下一步成功
  _confirmEventShare() {
    this.setData({
      isShowerr: false
    })
    this.next();
  },
  _confirmEventSharequn() {
    this.setData({
      isShowerrqun: false
    })
    this.next();
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
    // app.globalData.test = 10;
    // app.globalData.gradeHZ = 0;
    if (app.globalData.resHZStauts == 1) {
      wx.reLaunch({
        url: '../index/index',
      })
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var _this = this;
    _this.setData({
      isShowerr: false
    });
    _this.showDialogsx();
    return {
      title: '一分钟学会护资考试报名流程',
      path: '/pages/index/index',
      imageUrl: 'https://yhzj.oss-cn-shanghai.aliyuncs.com/xiaochengxu/share.png',
      success: function (options) {
        // if (options.shareTickets) {
        //   console.log('已经分享到群')
        //   _this.setData({
        //     isShowerrqun: false,
        //     isShowerr: false,
        //   })
        //   wx.showToast({
        //     title: '已经分享到群',
        //   });
        // } else {
        //   console.log('请分享到群')
        //   _this.errshowDialogqun();
        // }
      },
      fail: function (options) {
        //_this.errshowDialogqun();
      }
    }
  }
})
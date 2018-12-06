var postData = require("data.js");
Page({
  data: {
    // text:"这是一个页面"
    postList: postData.postList,
    answers:'',
    index: 0,
    bc_default: '#FBFBFB',
    bc_right: '#98FB98',
    bc_wrong: '#FF99B4',
    bcA: '',
    bcB: '',
    bcC: '',
    bcD: '',
    bcE: '',
    ny: '显示答案',
    defen: 0
  },

  nextQuestion: function () {
    var that = this;
    if (that.data.index < postData.postList.length - 1) {
      this.setData({
        index: that.data.index + 1,
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
        bcD: that.data.bc_default,
        bcE: that.data.bc_default,
      });
    }else{
      console.log('你打完了')
    }
  },

  lastQuestion: function () {
    var that = this;
    if (that.data.index > 0) {
      this.setData({
        index: that.data.index - 1,
        ny: '显示答案'
      });
    }
  },


  btnOpClick: function (e) {
    var that = this;
    var select = e.currentTarget.id;
    var jieg = postData.postList[that.data.index].answer;
    var postList = that.data.postList;
    
    var ids = postList[that.data.index].answers;
    var a0 = ids[0].id;
    var a1 = ids[1].id;
    var a2 = ids[2].id;
    var a3 = ids[3].id;
    var a4 = ids[5-1].id;
    // var idss = ids.
    if (select == jieg) {
      if (that.data.index < postData.postList.length - 1) {
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
          this.setData({ bcD: that.data.bc_right });
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
          this.setData({ bcD: that.data.bc_right });
        }
      }
    }
    else {
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
      else if (select == a5) {
        this.setData({ bcE: that.data.bc_wrong });
      }
    }
  },

  xianshi: function () {
    var that = this;
    that.setData({
      ny: '答案是：' + that.data.postList[that.data.index].daan
    })
  }
})
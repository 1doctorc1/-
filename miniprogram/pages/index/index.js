const app = getApp()
Page({
  /*默认Logo展示一次*/
  data: {
    kaipingFlag: true
  },
  onLoad: function () {

  },
  /*结束Logo展示*/
  endLogo: function () {
    // console.log("hide");
    /**
     * 坚决不像运动世界校园一样重复播放
     * 而且没有混淆视听的伪关闭按键
     * 就算不是广告也不会重复
     * 用户体验至上！！
     */
    this.setData({
      kaipingFlag: false
    });
    /*进入主页面*/
    wx.switchTab({
      url: '../diy/diy',
    })
  }
})
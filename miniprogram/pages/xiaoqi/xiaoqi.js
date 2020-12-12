// pages/xiaosi/xiaosi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer: '你好哇，我是小琪，很高兴认识你',
    available: true,
  },
  /*获取<input>内容*/
  getInput: function (e) {
    console.log(e);
    this.setData({
      content: e.detail.value,
    })
  },
  send: function () {
    /*避免多次重复请求*/
    if (!this.data.available) {
      wx.showToast({
        title: '说话太快了哦',
        icon: 'none',
      })
      return;
    }
    /*在返回结果前禁用请求*/
    this.setData({
      available: false,
    })
    let that = this;
    let content = that.data.content;
    console.log(content);
    wx.request({
      url: 'https://api.ownthink.com/bot?appid=xiaosi&userid=user&spoken=' + content,
      method: 'GET',
      success: function (res) {
        let ans = res.data.data.info.text.replace(/小思/g, "小琪");
        if (ans == content)
          ans = "学好模电风光无限"
        console.log(ans);
        /*返回结果后重新启用*/
        that.setData({
          answer: ans,
          available: true,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
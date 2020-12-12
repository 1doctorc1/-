// pages/community/community.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: [],
    openid: ''
  },
  remove: function (e) {
    console.log(e.currentTarget.dataset.deleteid);
    wx.cloud.callFunction({
      name: 'removepic',
      data: {
        id: e.currentTarget.dataset.deleteid,
      },
      success: res => {
        console.log(res);
        wx.reLaunch({
          url: '../community/community',
        })
      },
      fail: res => {
        console.log(res);
      }
    })
  },
  notshow: function (e) {
    let index = e.currentTarget.dataset.index;
    let that = 'pic[' + index + '].notshow';
    this.setData({
      [that]: true,
    })
  },
  like: function (e) {
    console.log(e.currentTarget.dataset);
    let index = e.currentTarget.dataset.index;
    if (this.data.pic[index].liked == true)
      return;
    let that = 'pic[' + index + '].like';
    let newlike = this.data.pic[index].like + 1;
    if (newlike > 1);
    else newlike = 1;
    this.setData({
      ['pic[' + index + '].liked']: true,
      [that]: newlike,
    })
    /* wx.cloud.database().collection('user').add({
      data: {
        _id: e.currentTarget.dataset.id,
        like: newlike,
      },
      success: res => {
        console.log(res);
      },
      fail: res => {
        console.error(res);
      }
    }) */
    wx.cloud.callFunction({
      name: 'addlike',
      data: {
        id: e.currentTarget.dataset.id,
        like: newlike,
      },
      success: res => {
        console.log(res);
      },
      fail: res => {
        console.error(res)
      }
    })
  },
  star: function (e) {
    console.log(e.currentTarget.dataset);
    let index = e.currentTarget.dataset.index;
    let newStar = !this.data.pic[index].star;
    wx.cloud.callFunction({
      name: 'changestar',
      data: {
        id: e.currentTarget.dataset.id,
        star: newStar,
      },
      success: res => {
        console.log(res);
      },
      fail: res => {
        console.error(res);
      }
    })
    this.setData({
      ['pic[' + index + '].star']: newStar,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let that = this;
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        getApp().globalData.openid = res.result.openid;
        console.log(getApp().globalData.openid);
        that.setData({
          openid: getApp().globalData.openid,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   * 同时承担“作品社区”“我的作品”“收藏夹”三个功能，通过不同参数进行区分
   * 在wxml中使用逻辑判断进行条件渲染
   */
  onShow: function () {
    this.setData({
      fromStar: app.globalData.fromStar,
      fromMy: app.globalData.fromMy,
    })
    if (this.data.fromMy)
      wx.setNavigationBarTitle({
        title: '我的作品',
      })
    else if (this.data.fromStar)
      wx.setNavigationBarTitle({
        title: '收藏夹',
      })
    else wx.setNavigationBarTitle({
      title: '作品社区',
    })
    let that = this;
    wx.cloud.database().collection('user').where({

    }).get({
      success: function (res) {
        console.log('res.data:', res.data);
        that.setData({
          pic: res.data,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   * 离开页面时重置参数
   */
  onHide: function () {
    // console.log('onHide');
    app.globalData.fromStar = false;
    app.globalData.fromMy = false;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload');
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
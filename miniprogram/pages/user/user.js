const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindViewTap: function () {
    /* wx.navigateTo({
      url: '../logs/logs'
    }) */
  },
  /*如果已授权，则自动登录*/
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /*获取用户信息*/
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  about: function () {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  kefu: function () {
    wx.navigateTo({
      url: '../kefu/kefu',
    })
  },
  /*以“我的作品”形式打开“作品社区”*/
  mywork: function () {
    app.globalData.fromMy = true;
    wx.switchTab({
      url: '../community/community',
    })
    /* wx.showToast({
      title: '从右下角返回',
      icon: 'none',
    }) */
    /* wx.navigateTo({
      url: '../mywork/mywork',
    }) */
  },
  /*以“收藏夹”形式打开“作品社区”*/
  like: function () {
    app.globalData.fromStar = true;
    wx.switchTab({
      url: '../community/community',
    })
    /* wx.navigateTo({
      url: '../like/like',
    }) */
  },
  /*获取“我的消息”*/
  message: function () {
    if (!this.data.hasMessage)
      wx.showToast({
        title: '暂无消息',
        icon: 'none',
      })
    else wx.navigateTo({
      url: '../message/message',
    })
  },
})
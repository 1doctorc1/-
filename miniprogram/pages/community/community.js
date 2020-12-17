// pages/community/community.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: [],
    openid: '',
  },
  remove: function (e) {
    wx.showModal({
      title: '删除确认',
      content: '真的不是手抖吗？',
      confirmText: '确定删除',
      cancelText: '我手抖了',
      success(res) {
        if (res.confirm) {
          console.log('e.currentTarget.dataset.deleteid', e.currentTarget.dataset.deleteid);
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
              wx.showToast({
                title: '删除成功',
                icon: 'success',
              })
            },
            fail: res => {
              console.error(res);
            }
          })
        }
      }
    })
  },
  notshow: function (e) {
    let that = this;
    if (e !== +e) {
      wx.showModal({
        title: '屏蔽确认',
        content: '真的不是手抖吗？',
        confirmText: '确定屏蔽',
        cancelText: '我手抖了',
        success(res) {
          if (res.confirm) {
            that.realnotshow(e.currentTarget.dataset.index);
            wx.showToast({
              title: '屏蔽成功',
              icon: 'success',
            })
          }
        }
      })
    } else that.realnotshow(e);
  },
  realnotshow: function (index) {
    let that = 'pic[' + index + '].notshow';
    let newnotshow = !this.data.pic[index].notshow;
    console.log('notshow', index, newnotshow);
    this.setData({
      [that]: newnotshow,
    })
    wx.cloud.callFunction({
      name: 'notshow',
      data: {
        id: this.data.pic[index]._id,
        notshow: newnotshow,
      },
      success: res => {
        console.log(res);
      },
      fail: res => {
        console.error(res);
      }
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
    this.setData({
      openid: app.globalData.openid,
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
    // console.log(app.globalData);
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
      success: res => {
        console.log('res.data:', res.data);
        that.setData({
          pic: res.data,
        })
        // console.log(that.data.pic);
        let count = 0;
        // console.log(res.data.length);
        for (let i = 0; i < res.data.length; ++i) {
          // console.log(i, res.data[i].notshow === true, res.data[i]._openid === that.data.openid);
          if (res.data[i].notshow === true && res.data[i]._openid === that.data.openid)
            that.notshow(i);
          if (res.data[i].notshow !== true && (that.data.fromMy === false || res.data[i]._openid === that.data.openid) && (that.data.fromStar === false || res.data[i].star))
            ++count;
        }
        console.log('count:', count);
        if (count === 0) {
          if (that.data.fromMy)
            wx.showToast({
              title: '你还未发布作品哦',
              icon: 'none',
            })
          else if (that.data.fromStar)
            wx.showToast({
              title: '你还未收藏任何作品哟',
              icon: 'none'
            })
          else wx.showToast({
            title: '哎呀，作品社区空空如也',
            icon: 'none',
          })
        }
      },
      fail: function (res) {
        console.error(res);
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
  onReachBottom: function (res) {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res);
    return {}
  },
})
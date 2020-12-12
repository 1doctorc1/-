// pages/contact/contact.js
var app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';

  msgList = [{
      speaker: 'server',
      contentType: 'text',
      content: '欢迎使用DIY你的那个TA,这里是在线客服！'
    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: 'DIY'
    }
  ]
  that.setData({
    msgList,
    inputVal
  })
}


 // 计算msg总高度
 
 function calScrollHeight(that, keyHeight) {
 var query = wx.createSelectorQuery();
 query.select('.scrollMsg').boundingClientRect(function(rect) {
  }).exec();
 }

Page({
  data: {
    scrollHeight: '100vh',
    inputBottom: 0,
    avatarUrl:'0'
  },
  onLoad: function(options) {
    wx.getUserInfo({
      success:function(res){
        console.log(res);
        var avatarUrl='userInfo.avatarUrl'
        this.setData({
          avatarUrl:avatarUrl
        })
      }
    })
    initData(this);
    this.setData({
      cusHeadIcon: avatarUrl,
    });
  },
 
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });


  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }

})

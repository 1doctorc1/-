Page({

  /**
   * 这个页面只供测试使用
   */
  data: {
    url: '',
    str: '',
  },
  in: function (e) {
    console.log(e.detail.value.replace(/小2/g, '小1'));
    console.log(e.detail.value);
  },
  additem: function () {
    let it = `cloud://test-9g5t8z9dfa72d046.7465-test-9g5t8z9dfa72d046-1303255660/copyman3/`;
    for (let armor = -2; armor <= 2; ++armor)
      for (let female = -2; female <= 2; ++female) {
        let filename = armor.toString() + female.toString() + '.jpeg';
        wx.cloud.database().collection('copyman3').add({
          data: {
            armor,
            female,
            url: it + filename,
          },
          success: res => {
            console.log(res);
          }
        })
      }
    return;
    for (let sunshine = -2; sunshine <= 2; ++sunshine)
      for (let artistry = -2; artistry <= 2; ++artistry) {
        let filename = sunshine.toString() + artistry.toString() + '.jpeg';
        wx.cloud.database().collection('copyman2').add({
          data: {
            sunshine,
            artistry,
            url: it + filename,
          },
          success: res => {
            console.log(res);
          }
        })
      }
    return;
    for (let blush = -2; blush <= 2; ++blush)
      for (let open_mouth = -2; open_mouth <= 2; ++open_mouth)
        for (let smile = -2; smile <= 2; ++smile) {
          let filename = blush.toString() + open_mouth.toString() + smile.toString() + '.jpeg';
          wx.cloud.database().collection('copyman').add({
            data: {
              blush,
              open_mouth,
              smile,
              url: it + filename,
            },
            success: function (res) {
              console.log(res);
            }
          })
        }
  },
  upload: function () {
    return;
    for (let blush = -2; blush <= 2; ++blush)
      for (let open_mouth = -2; open_mouth <= 2; ++open_mouth)
        for (let smile = -2; smile <= 2; ++smile) {
          let stamp = blush * 25 + open_mouth * 5 + smile;
          let filename = blush.toString() + open_mouth.toString() + smile.toString() + '.jpeg';
          let url = '../../icons/老搬砖工了/' + filename;
          this.setData({
            url,
          })
          console.log(url);
          wx.cloud.uploadFile({
            cloudPath: filename,
            filePath: url,
            success: res => {
              console.log('loaded' + filename);
              wx.cloud.database().collection('copyman').add({
                data: {
                  blush,
                  open_mouth,
                  smile,
                  url: res.fileID,
                }
              });
            },
            fail: res => {
              console.error(res);
            }
          })
          var sleep = function (time) {
            var startTime = new Date().getTime() + parseInt(time, 10);
            while (new Date().getTime() < startTime);
          }
          sleep(10);
        }
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
const app = getApp();
Page({
  data: {
    addit: true,
    img: [
      'cloud://test-9g5t8z9dfa72d046.7465-test-9g5t8z9dfa72d046-1303255660/copyman/000.jpeg',
      `cloud://test-9g5t8z9dfa72d046.7465-test-9g5t8z9dfa72d046-1303255660/copyman2/00.jpeg`,
      `cloud://test-9g5t8z9dfa72d046.7465-test-9g5t8z9dfa72d046-1303255660/copyman3/00.jpeg`,
    ],
    imgUrl: '',
    picIndex: -1,
    hideSlider: true,
  },
  /*删除图片*/
  deleteit: function () {
    this.setData({
      imgUrl: '',
    })
  },
  /*添加、更换图片*/
  changePic: function () {
    this.setData({
      picIndex: (this.data.picIndex + 1) % 3,
    })
    this.setData({
      imgUrl: this.data.img[this.data.picIndex],
    })
    if (!this.data.hideSlider)
      this.showSlider();
  },
  /*【上传图片】功能在进行内容安全验证时，仍然存在信息安全风险，包括但不限于发现敏感内容、无法对新发布的敏感内容识别过滤等，小程序存在被滥用的风险，为了维护网络安全，该功能暂时下架*/
  upload: function () {
    let timeStamp = Date.parse(new Date());
    let that = this;
    console.log('uploading timeStamp:', timeStamp);
    wx.chooseImage({
      count: 1,
      success: chooseResult => {
        wx.showLoading({
          title: 'loading',
        })
        console.log('chooseResult.tempFilePaths[0]:', chooseResult.tempFilePaths[0]);
        wx.cloud.uploadFile({
          cloudPath: timeStamp + '',
          filePath: chooseResult.tempFilePaths[0],
          success: res => {
            wx.hideLoading({
              success: (res) => {},
            })
            console.log('loaded res:', res);
            that.setData({
              imgUrl: res.fileID
            })
            // wx.cloud.database().collection('user').add({
            //   data: {
            //     imgUrl: this.data.imgUrl,
            //   },
            //   success: function (res) {
            //     console.log('res:', res);
            //   }
            // })
          }
        })
      }
    })
  },
  /*保存slider的修改*/
  changeImage: function () {
    console.log('this.data.addit:', this.data.addit);
    if (this.data.addit == false) {
      this.deleteit();
      this.setData({
        addit: true,
      })
    } else {
      this.upload();
      this.setData({
        addit: false,
      })
    }
  },
  /*展示、隐藏slider*/
  showSlider: function () {
    if (this.data.hideSlider == true) {
      this.setData({
        hideSlider: false,
      })
    } else {
      this.setData({
        hideSlider: true,
      })
    }
  },
  /*进行一些计算*/
  to125: function (para) {
    if (para > 15) return 2;
    else if (para > 5) return 1;
    else if (para >= -5) return 0;
    else if (para >= -15) return -1;
    else return -2;
  },
  /*根据不同的图片类别进行不同的修改*/
  getccao: function (e) {
    switch (this.data.picIndex) {
      case 0:
        this.getccao1(e);
        break;
      case 1:
        this.getccao2(e);
        break;
      case 2:
        this.getccao3(e);
        break;
    }
  },
  /*类别1*/
  getccao1: function (e) {
    e.detail.value.blush = this.to125(e.detail.value.blush);
    e.detail.value.open_mouth = this.to125(e.detail.value.open_mouth);
    e.detail.value.smile = this.to125(e.detail.value.smile);
    console.log('e.detail.value:', e.detail.value);
    let that = this;
    wx.cloud.callFunction({
      name: 'querypic',
      data: {
        blush: e.detail.value.blush,
        open_mouth: e.detail.value.open_mouth,
        smile: e.detail.value.smile,
      },
      success: function (res) {
        console.log('res:', res);
        that.setData({
          imgUrl: res.result.data[0].url,
        })
        wx.showToast({
          title: '成功',
          icon: 'success'
        })
      }
    })
  },
  /*类别2*/
  getccao2: function (e) {
    e.detail.value.sunshine = this.to125(e.detail.value.sunshine);
    e.detail.value.artistry = this.to125(e.detail.value.artistry);
    console.log('e.detail.value', e.detail.value);
    let that = this;
    wx.cloud.callFunction({
      name: 'querypic2',
      data: {
        sunshine: e.detail.value.sunshine,
        artistry: e.detail.value.artistry,
      },
      success: res => {
        console.log('res:', res);
        that.setData({
          imgUrl: res.result.data[0].url,
        })
        wx.showToast({
          title: '成功',
        })
      }
    })
  },
  /*类别3*/
  getccao3: function (e) {
    e.detail.value.armor = this.to125(e.detail.value.armor);
    e.detail.value.female = this.to125(e.detail.value.female);
    console.log('e.detail.value', e.detail.value);
    let that = this;
    wx.cloud.callFunction({
      name: 'querypic3',
      data: {
        armor: e.detail.value.armor,
        female: e.detail.value.female,
      },
      success: res => {
        console.log('res:', res);
        that.setData({
          imgUrl: res.result.data[0].url,
        })
        wx.showToast({
          title: '成功',
        })
      }
    })
  },
  /*将图片保存到本地相册*/
  download: function () {
    let that = this;
    console.log('that.data.imgUrl:', that.data.imgUrl);
    wx.getImageInfo({
      src: that.data.imgUrl,
      success: function (ret) {
        console.log('ret:', ret);
        wx.saveImageToPhotosAlbum({
          filePath: ret.path,
          success: function (res) {
            console.log('res:', res);
            wx.showToast({
              title: '下载成功',
              icon: 'success'
            })
          },
          fail: function (res) {
            console.log('res:', res);
          }
        })
      }
    })
  },
  /*将图片分享到“作品社区”*/
  share: function () {
    if (!app.globalData.userInfo) {
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
      })
      return;
    }
    if (this.data.imgUrl.length < 1) {
      wx.showToast({
        title: '请先添加、编辑图片',
        icon: 'none',
      })
      return;
    }
    wx.cloud.database().collection('user').add({
      data: {
        imgUrl: this.data.imgUrl,
      },
      success: function (res) {
        console.log('res:', res);
        wx.showToast({
          title: '分享成功',
          icon: 'success',
        })
      },
      fail: function (res) {
        console.log('res:', res);
        wx.showToast({
          title: '分享失败',
          icon: 'loading',
        })
      },
    })
  },
})
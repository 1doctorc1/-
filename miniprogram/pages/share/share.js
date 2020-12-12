Page({
  data: {
    /*根据不同的类型执行不同的分享*/
    checkData: [{
        name: '二次元',
        status: false
      },
      {
        name: '三次元',
        status: false
      },
      {
        name: '宠物',
        status: false
      },
      {
        name: '风景',
        status: false
      }
    ]
  },
  checkClick: function (event) {
    console.log(event.detail.value);
  }
})
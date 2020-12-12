Component({
  properties: {
    imagepath: {
      type: String,
    },
    second: {
      type: Number,
    }
  },
  data: {
    timer: null
  },
  lifetimes: {
    created: function () {

    },
    attached: function () {
      let that = this;
      const timer = setInterval(function () {
        let nowSecond = that.data.second;
        if (nowSecond <= 1) {
          clearInterval(timer);
          that.hideKaiping();
        }
        console.log(that.data.second);
        that.setData({
          second: nowSecond - 1,
        });
      }, 1000);
      this.setData({
        timer,
      })
    }
  },
  methods: {
    /*触发index中的hide事件结束Logo展示*/
    hideKaiping: function () {
      this.triggerEvent("hide");
    },
    skipAnimation: function () {
      this.hideKaiping();
      let timer = this.data.timer;
      if (timer) {
        clearInterval(timer);
      }
    }
  }
})
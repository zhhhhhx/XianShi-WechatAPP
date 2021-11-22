// index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    RequestViewImg:['../../icon/view0.png','../../icon/view1.png'], //委托的视图的图标列表
    TradeViewImg:['../../icon/view0.png','../../icon/view2.png'], //交易的视图的图标列表
    viewType:true, //视图种类 true表示带图，false表示无图
    requestList:[] //委托列表
  },
  jump(){
   console.log(1)
    wx.navigateTo({
      url: '../search/search',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    util.request('http://localhost:1314/goodsPage')
        .then(res => {
            console.log(res)
            this.setData({
                goods: res.data.goods
            })
        })  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onPullDownRefresh');
    wx.showToast({
        title: '刷新完成',
        icon: 'success',
        duration: 2000
    })
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
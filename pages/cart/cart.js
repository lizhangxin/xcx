// pages/cart/cart.js
const app = getApp()
const apihost = app.globalData.apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectAll: false,
    goodsList:[],
    totalprice:0,
    selectone:false,
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
    this.getCartList()
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

  },
  /**
   * 购物车商品列表
   */
  getCartList: function(){
    let _this= this;
    let token =wx.getStorageSync('token')
    wx.request({
      url: apihost + '/wx/cartlist?token='+token,
      success: function(d){
        if(d.data.error==0){
          _this.setData({
            goodsList:d.data.data.list
          })

        }else{
          console.log("接口请求失败");
        }
      }
    })
  }
})
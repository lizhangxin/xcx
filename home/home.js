// home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[  
      {url:'/素材/素材/1.jpg'} ,  
      {url:'/素材/素材/2.jpg'} ,  
      {url:'/素材/素材/3.jpg'} ,  
      {url:'/素材/素材/4.jpg'}   
      ]  
  
  },
  goodsDetail:function(e)
  {
    //获取被点击的 商品id
    // console.log(e);
    let goods_id = e.currentTarget.id;
    //切换至 详情页
    wx.redirectTo({
      url: '/pages/detail/detail?goods_id='+goods_id
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tahat=this
    wx.request({
      url: 'http://blog.com/wx/goods',
      success:function(res){
        console.log(res.data)
        tahat.setData({
          goods:res.data
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
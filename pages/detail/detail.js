// pages/detail/detail.js
const app = getApp()
const apihost=app.globalData.apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLike: true,
    // banner
    imgUrls: [
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057921620_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057922659_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057923813_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057924965_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057925958_middle.jpg"
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    // 商品详情介绍
    detailImg: [
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_1.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_2.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_3.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_4.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_5.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_6.jpg",
    ],
  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this;
    var goods_id=options.goods_id
    wx.request({
      url:'http://blog.com/wx/detail',
      data:{
        goods_id:goods_id
      },
      success:function(res){
        that.setData({
          goods_id:res.data
        })
      }
    })
  },
  // 轮播图的切换时间
  swipperChange:function(a){
    // console.log(1233);
    let current=a.detail.current;
    this.setData({
        current:a.detail.current
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

  },
  makeCall:function(){
    wx.makePhoneCall({
      phoneNumber: '13552750769' //仅为示例，并非真实的电话号码
    })
  },
  /**收藏 */
  addFav:function(e){
    let _this = this;
    // console.log(e)
    let goods_id=e.currentTarget.dataset.goods_id
    let token=wx.getStorageSync('token')
    wx.request({
      url: apihost+'/wx/add_fav?id='+goods_id+'&token='+token,
      success:function(res){
        // console.log(res)
          wx.showToast({
            title: res.data.msg,
            icon: 'success',     
            duration:2000
          })
          _this.setData({
            iscollect:false,
          })
      }
    })
  },
  /** 取消收藏*/ 
  noFav:function(e){
    let _this = this;
    let goods_id=e.currentTarget.dataset.goods_id
    console.log(goods_id)
    let token=wx.getStorageSync('token')
    wx.request({
      url:apihost+'/wx/no_fav?id='+goods_id+'&token='+token,
      success:function(res){
        wx.showToast({
          title: res.data.msg,
          icon:'success',
          duration:200,
        })
        _this.setData({
          iscollect:true,
        })
      }
    })
  },

  // 加入购物车
  addcart:function(e){
        // console.log(e)
        let goods_id=e.currentTarget.id
        // console.log(goods_id);
        let access_token=wx.getStorageSync('token')
        // console.log(access_token)
      // const app=getApp()
      // const apihost=app.globalData.apiUrl;
    wx.request({
      url: apihost+'/wx/cart?goods_id='+goods_id,
      data:{
        goods_id:goods_id,
        token:access_token
      },
      success:function(res){
        wx.showToast({           
          title: '加入购物车成功！',           
          icon: 'success',           
          duration: 2000
        }) 
      }
    })
  },
    /**购物车跳转*/
    gouwuche:function(){
      wx.switchTab({
        url: '../cart/cart',
      })
    }
})
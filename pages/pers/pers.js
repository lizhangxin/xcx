Page({

  /**
   * 页面的初始数据
   */
  data: {
    'cartList':[{
      'shop_name': '秋风之姿旗舰店',
      'shopCheck': false, 
      'goodsList': [{
          'goods_id': '1',
          'name': '爱茉莉橄榄蜂蜜护发油70ml爱茉莉橄榄蜂蜜护发油70ml爱茉莉橄榄蜂蜜护发油70ml',
          'cover': '/icons/goods2.png',
          'price': 1,
          'count': 1,
          'check': false,
          // 数据设定
          'count': {
            'quantity': 1, //购买数量
            'min': 1, //最小购买
            'max': 20 //最大购买
          }
        },
        {
          'goods_id': '2',
          'name': '追风筝的人',
          'cover': '/icons/goods2.png',
          'price': 2,
          'count': 1,
          'check': false,
          'count': {
            'quantity': 1, //购买数量
            'min': 1, //最小购买
            'max': 20 //最大购买
          }
        }],
    }, {
        'shop_name': '艾丽莎旗舰店',
        'shopCheck': false,
        'goodsList': [
          {
            'name': '超火cec短袖女2019夏装新款',
            'goods_id': '3',
            'cover': '/素材/素材/1.jpg',
            'price': 1,
            'count': 1,
            'check': false,
            'count': {
              'quantity': 1, //购买数量
              'min': 1, //最小购买
              'max': 20 //最大购买
            }
          }
        ],
      }],
    isDelete: 0,
    iscart: false, //控制购物车有没有数据
    total: 0, //总金额
    allsel: false, //全选
    totalCount: 0, //商品数量
    idx: 0,  //选中商品的下标
    goodsId_arr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 店铺中的全选
  storeselected: function (e) {
    var shopcar = this.data.cartList //购物车数据
    let index = e.currentTarget.dataset.index //当前店铺下标
    // console.log(JSON.stringify(shopcar) +"当前店铺下标:"+JSON.stringify(e));
    var thisstoredata = shopcar[index].goodsList //当前店铺商品数据
    // 改变当前店铺状态
    if (shopcar[index].shopCheck) {
      shopcar[index].shopCheck = false;
      for (let i in thisstoredata) { //改变店铺下面的商品状态
        shopcar[index].goodsList[i].check = false;
      }
    } else {
      shopcar[index].shopCheck = true;
      for (let i in thisstoredata) {
        shopcar[index].goodsList[i].check = true;
      }
    }
    this.setData({
      cartList: shopcar, //店铺下得商品数量
      idx: index
    })
    this.allallprices();
    this.getTotalPrice();
  },
  // 商品的选中
  goodsselected: function (e) {
    let _this = this;
    var shopcar = this.data.cartList //购物车数据
    let index = e.currentTarget.dataset.index //当前商品在店铺中的下标
    let idx = e.currentTarget.dataset.selectIndex;
    let cai = shopcar[idx].goodsList; //当前商品的店铺data.goodsList
    let curt = cai[index]; //当前商品数组
    var goods_id = e.currentTarget.dataset.goodsid;  //选中的商品id
    this.data.goodsId_arr.push(goods_id);  //选中的商品id  push到数组中
    console.log("去重后的商品id数组：" + this.data.goodsId_arr);
    
    if (curt.check) {
      shopcar[idx].goodsList[index].check = false; //改变当前商品状态
      shopcar[idx].shopCheck = false; //店铺状态改变
    } else {
      shopcar[idx].goodsList[index].check = true;
      console.log(shopcar[idx].goodsList[index].check);
      // 当店铺选中商品数量与店铺总数量相等时 改变店铺状态
      var storegoodsleg = shopcar[idx].goodsList.length;//店铺中商品个数
      var goodsList = shopcar[idx].goodsList;
      var selectedleg = 0;
      for (var i in goodsList) {
        if (goodsList[i].check) {
          selectedleg++;
        }
      }
      if (storegoodsleg == selectedleg) {
        shopcar[idx].shopCheck = true;
      }

    }
    // console.log(_this.data.allsel)
    this.setData({
      cartList: shopcar, //更新
      allsel: _this.data.allsel,
      idx: index,
      // goodsId_arr: temp
    })
    this.allallprices();
    this.getTotalPrice();
  },
  // //全选条件 条件->商铺全选择全选 反之
  allallprices: function () {
    var shopcar = this.data.cartList; //购物车数据
    let storenum = shopcar.length;
    let allselected = this.data.allsel;
    let allselectednum = 0;
    for (let i = 0; i < shopcar.length; i++) {
      if (shopcar[i].shopCheck == true) {
        allselectednum++;
      }
    }
    if (storenum == allselectednum) {
      allselected = true;
    } else {
      allselected = false;
    }
    this.setData({
      allsel: allselected
    })
    this.getTotalPrice();
  },
  // 点击全选
  selectalltap: function () {
    var shopcar = this.data.cartList; //购物车数据
    // console.log("购物车数据:"+shopcar);
    let allsel = this.data.allsel;
    if (allsel) {
      allsel = false
    } else {
      allsel = true
    }
    for (var i = 0, len = shopcar.length; i < len; i++) {
      shopcar[i].shopCheck = allsel;
      var goodsList = shopcar[i].goodsList
      for (var a = 0; a < goodsList.length; a++) {
        goodsList[a].check = allsel
      }
    }
    this.setData({
      cartList: shopcar, //最后赋值到data中渲染到页面
      allsel: allsel
    })
    this.getTotalPrice();

  },
  // // 加函数
  add: function (e) {
    var index = e.currentTarget.dataset.index; //当前商品所在店铺中的下标
    let idx = e.currentTarget.dataset.selectIndex //当前店铺下标
    // console.log(index + 'he' + idx)
    var shopcar = this.data.cartList; //购物车数剧
   
    let cai = shopcar[idx].goodsList; //当前商品的店铺data.goodsinfo
    let curt = cai[index]; //当前商品
    var num = curt.count.quantity; //当前商品的数量
    var price = curt.price; //当前商品的单价
    console.log("当前商品的店铺:" + JSON.stringify(num));
    if (num < curt.count.max) {
      num++;
    } else {
      wx.showToast({
        title: '已超出现有库存',
        duration: 2000,
      });
      num = curt.count.max;
    }
    curt.count.quantity = num;
    curt.unitPrice = num * price;
    this.setData({
      cartList: shopcar,
      idx: index
    })
    this.getTotalPrice();
  },
  // // 减函数
  reduce: function (e) {
    var index = e.currentTarget.dataset.index; //当前商品所在店铺中的下标
    let idx = e.currentTarget.dataset.selectIndex //当前店铺下标
    var shopcar = this.data.cartList; //购物车数剧
    let cai = shopcar[idx].goodsList; //当前商品的店铺data.goodsList
    let curt = cai[index]; //当前商品
    var num = curt.count.quantity; //当前商品的数量
    var price = curt.price; //当前商品的单价
    if (num == curt.count.min) {
      num--;
      curt.count.quantity = 1;
      curt.unitPrice = 1 * price;

    } else {
      num--;
      curt.count.quantity = num;
      curt.unitPrice = num * price;

    }
    // 重新渲染数据
    this.setData({
      cartList: shopcar,
      idx: index
    })
    this.getTotalPrice();

  },
  // 计算总价和总数
  getTotalPrice: function() {
    let totalPrice = 0;
    let num = 0;
    // let shopcar = this.data.cartList[0].goodsList; //购物车数剧
    let shopcar = this.data.cartList; //购物车数剧
    // console.log(JSON.stringify(shopcar));
    for (let i = 0; i < shopcar.length; i++) {
      for (let j = 0; j < shopcar[i].goodsList.length; j++) {
        var good = shopcar[i].goodsList[j];
        if (good.check) {
          totalPrice += good.count.quantity * good.price;
          num += good.count.quantity;
          console.log("总价格:"+totalPrice);
        }
      }
    }
    this.setData({
      total: totalPrice.toFixed(2), //总价格
      totalCount: num //总数
    })
  },
  //点击编辑
  getEdit: function(e){
    var edit = this.data.isDelete;
    if (edit==0){
      this.setData({
        isDelete: 1
      })
    }else{
      this.setData({
        isDelete: 0
      })
    }
  },
  deleteList: function(e) {
    var shopcar = that.data.cartList; //购物车数据
    for (let i in shopcar) {
        for (let j in shopcar[i].goodslist) {
          if (shopcar[i].goodslist[j].check==true){
            newArray.push(shopcar[i].goodslist[j].id);
          }
        }
    }

  },
  Settlement: function(){
    
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

 

})
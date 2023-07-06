// pages/my_base/my_base.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        touxiang:"https://7375-sun-3g6gwmbw83fc31a4-1309504880.tcb.qcloud.la/ico/%E6%9C%AA%E7%99%BB%E5%BD%95%E5%A4%B4%E8%B1%A1.png",
        nicheng:"请先登录q(≧▽≦q)",
        gerenqianming:"个性签名",
        user:""

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let user =wx.getStorageSync('key')
        console.log("缓存",user)
        this.setData({
            user:user
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
    login(){
        wx.getUserProfile({
          desc: '授权以获取头像与用户名',
          success:res1=>{
              console.log("完整用户信息",res1)
              let user = res1.userInfo
              wx.setStorageSync('key',user)
              console.log("简化版用户信息",user)
              this.onLoad()
          }
        
        })
    },
})
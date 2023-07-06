// pages/fabuye/fabuye.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
    biaoti:"",
    tupian:"https://7375-sun-3g6gwmbw83fc31a4-1309504880.tcb.qcloud.la/image/fe31-ifrwayw1519774.jpg",
    beibiaobairen:"",
    biaobaiwenzhang:"",
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
    biaoti(e){
        this.setData({
            biaoti:e.detail.value,
        })
        console.log("标题打印的数据",this.data.biaoti)
    },
    beibiaobairen(e1){
        this.setData({
            beibiaobairen:e1.detail.value
        })
        console.log("被表白人",this.data.beibiaobairen)
    },
    biaobaiwenzhang(e2){
        this.setData({
            biaobaiwenzhang:e2.detail.value
        })
        console.log("文章",this.data.biaobaiwenzhang)
    },
    fabiao(){
        var value1=this.data.biaoti
        var value2=this.data.beibiaobairen
        if (value1.length >0) {
           if (value2.length>0) {
            wx.cloud.database().collection("wenan")
            .add({
                data:{
                    biaoti:this.data.biaoti,
                    beibiaobairen:this.data.beibiaobairen,
                    biaobaiwenzhang:this.data.biaobaiwenzhang,
                    tupian:this.data.tupian,
                    touxiang:this.data.user.avatarUrl,
                    nicheng:this.data.user.nickName,
                    pinglun:[]

            }
                
            })
            .then(res=>{
                console.log("添加的数据",res)
            })
            .catch(err=>{
                console.log("失败",err)
            })
            wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
           }
           else{
            wx.showToast({
                title: '被表白人不能为空',
                icon:"error",
                duration:2000
              })
           }
        }
        else{
            wx.showToast({
              title: '标题不能为空',
              icon:"error",
              duration:2000
            })
        }
        
        
       
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
    }
    
})
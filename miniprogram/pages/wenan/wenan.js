// pages/wenan/wenan

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:"",
        data_list:"",
        scrollTop:0,
        pinglun_list:[],
        user:"",
        wenzhang:"fjdslkjlkfjsjsflkjsf"

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

       console.log("传入的id",options.id)
       this.setData({
           id:options.id
       })
       wx.cloud.database().collection("wenan")
       .where({
           _id:this.data.id
       })
       .get()
       .then(res=>{
        console.log(res.data)
        
        this.setData({
            data_list:res.data,
            pinglun_list:res.data[0].pinglun
            
        })
        console.log("简化的数据",this.data.data_list)
        console.log("评论列表数据",this.data.pinglun_list)
        console.log("长度",this.data.pinglun_list.length)
        
       })
       .catch(err=>{
        console.log(err)
       })

    },
    liuyankuang(e){
        console.log("留言框的数据",this.data.wenzhang)
        this.setData({
            wenzhang:e.detail
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
        this.shuaxin()
    
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.setData({
            scrollTop:101
          })
          console.log("chudi",scrollTo)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    /** 页面滑动检测*/
    onPageScroll:function(ev){
        this.setData({
      scrollTop: ev.scrollTop
    })
    },
    fabu(){
        if(!this.data.user){
            wx.showToast({
              title: '请先登录',
            })
        }
        else{
        console.log("user的数据",this.data.user)
        let pinglunlist={}
        pinglunlist.nicheng=this.data.user.nickName
        pinglunlist.touxiang=this.data.user.avatarUrl
        pinglunlist.wenzhang=this.data.wenzhang
        this.data.pinglun_list.push(pinglunlist)
        console.log("用户添加后的评论列表",this.data.pinglun_list)
        wx.cloud.database().collection("wenan").doc(this.data.id)
       .update({
        data:{
            pinglun:this.data.pinglun_list
        }
       })
       .then(res=>{
            this.shuaxin()
           console.log("成功",res)
           wx.showToast({
             title: '留言成功',
           })
           this.onLoad()
       })
        }
        
       
    },
    shuaxin(){
        wx.cloud.database().collection("wenan")
       .where({
           _id:this.data.id
       })
       .get()
       .then(res=>{
        console.log(res.data)
        wx.stopPullDownRefresh()
        this.setData({
            data_list:res.data,
            pinglun_list:res.data[0].pinglun
            
        })
        console.log("简化的数据",this.data.data_list)
        console.log("评论列表数据",this.data.pinglun_list)
        console.log("长度",this.data.pinglun_list.length)
        
       })
       .catch(err=>{
        console.log(err)
       })

    }
})
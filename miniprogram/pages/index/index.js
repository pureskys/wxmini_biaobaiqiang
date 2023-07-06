Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: "",
        old_list: "",
        skip: 0,
        sousuo: ""
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.database().collection("wenan").skip(this.data.skip)
            .get()
            .then(res => {
                console.log("数据库请求的数据主体", res)
                wx.stopPullDownRefresh()
                this.setData({
                    list: res.data
                })
                console.log("list数据", this.data.list)
            })
            .catch(err => {
                console.log(err)

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
        this.onLoad()
        wx.showToast({
            title: '刷新中',
            icon: "loading",
            duration: 2000
        })
        wx.showToast({
            title: '刷新成功',
            icon: 'success',
            duration: 1000
        })

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
    xiayiye() {
        this.setData({
            skip: this.data.skip + 20
        })
        console.log("跳转的页面", this.data.skip)
        this.setData({
            old_list: this.data.list
        })
        console.log("old", this.data.old_list)
        this.onLoad()
    },
    shangyiye() {
        this.setData({
            skip: this.data.skip - 20
        })
        console.log("跳转的页面", this.data.skip)
        this.setData({
            old_list: this.data.list
        })
        console.log("old", this.data.old_list)
        this.onLoad()
    },
    shouye() {
        this.setData({
            skip: 0
        })
        this.onLoad()
    },
    biaobaiwenzhang(e) {
        console.log("传出的_id", e.currentTarget.dataset.id)
        let wenan_id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../wenan/wenan?id=' + wenan_id
        })

    },
    onChange(e) {
        this.setData({
            sousuo: e.detail,
        });
        console.log("搜索传入的", e)
    },
    onSearch() {
        wx.cloud.database().collection("wenan")
            .where({
                beibiaobairen: this.data.sousuo
            })
            .get()
            .then(res => {
                console.log("被表白人", res)
                this.setData({
                    list: res.data
                })
            })
            .then(err => {
                console.log("被表白人err", err)
                wx.showToast({
                    title: '没有找到该被表白人',
                })
            })
    }



})
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    return await cloud.database().collection("wean").doc(event.id)
    .update({
       
            pinglun:event.pinglun
        
    })
    .then(res=>{
        console.log("添加评论成功",res)
    })
    .catch(err=>{
        console.log("添加评论失败",err)
    })
    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}